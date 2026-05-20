import axios from 'axios';

const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/latest';

/**
 * Fetch articles from NewsData.io API
 * @param {string} topic - Search topic (e.g., "AI in healthcare")
 * @param {number} limit - Number of articles to fetch (default: 20)
 * @param {Array<string>} domains - Optional array of trusted domains to filter by
 * @returns {Promise<{articles: Array, error?: string, sourceFilter?: Object}>} Articles, error message, and source filter metadata
 */
export async function fetchArticles(topic, limit = 20, domains = null) {
  const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

  console.log('[newsData] fetchArticles called', {
    topic,
    limit,
    hasApiKey: !!NEWSDATA_API_KEY,
    keyLength: NEWSDATA_API_KEY?.length,
  });

  if (!NEWSDATA_API_KEY) {
    return {
      articles: [],
      error: 'NEWSDATA_API_KEY is not set. Please configure environment variables.',
      sourceFilter: {
        applied: false,
        domains: null,
      },
    };
  }

  if (!topic || topic.trim().length === 0) {
    return {
      articles: [],
      error: 'Topic is required',
      sourceFilter: {
        applied: false,
        domains: null,
      },
    };
  }

  if (domains && domains.length > 5) {
    return {
      articles: [],
      error: 'Maximum 5 domains allowed per query (NewsData.io Free/Basic plan limit)',
      sourceFilter: {
        applied: false,
        domains: null,
      },
    };
  }

  try {
    const params = {
      apikey: NEWSDATA_API_KEY,
      q: topic.trim(),
      language: 'en',
      // Note: /latest endpoint uses different parameters than /news
      // Removed 'size' as it's not supported on /latest endpoint
    };

    if (domains && domains.length > 0) {
      params.domain = domains.join(',');
    }

    const response = await axios.get(NEWSDATA_BASE_URL, {
      params,
      timeout: 30000, // 30 second timeout
    });

    if (!response.data || !response.data.results) {
      return {
        articles: [],
        error: 'No articles found for this topic',
        sourceFilter: {
          applied: !!domains && domains.length > 0,
          domains: domains && domains.length > 0 ? domains : null,
        },
      };
    }

    // Filter and format articles
    const articles = response.data.results
      .filter(article => article.title && article.link) // Ensure required fields
      .map(article => ({
        title: article.title || 'Untitled',
        description: article.description || article.content || '',
        source: article.source_id || article.source_name || 'Unknown',
        pubDate: article.pubDate || new Date().toISOString(),
        url: article.link || '',
        image: article.image_url || null,
      }))
      .slice(0, limit);

    return {
      articles,
      error: null,
      sourceFilter: {
        applied: !!domains && domains.length > 0,
        domains: domains && domains.length > 0 ? domains : null,
      },
    };
  } catch (error) {
    let errorMessage = 'Failed to fetch articles';

    if (error.response?.status === 429) {
      errorMessage = 'Rate limit reached. NewsData.io free tier allows 100 requests/day. Please try again later.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid NEWSDATA_API_KEY. Please check your environment variables.';
    } else if (error.response?.status === 400) {
      errorMessage = `Bad request to NewsData.io API: ${error.response?.data?.message || 'Invalid parameters'}`;
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout. NewsData.io API took too long to respond.';
    } else if (error.message === 'Network Error') {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    console.error('NewsData.io API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      hasApiKey: !!NEWSDATA_API_KEY,
      topic,
      limit,
      url: NEWSDATA_BASE_URL,
      domains,
      domainString: domains ? domains.join(',') : 'none',
    });
    return {
      articles: [],
      error: errorMessage,
      sourceFilter: {
        applied: !!domains && domains.length > 0,
        domains: domains && domains.length > 0 ? domains : null,
      },
    };
  }
}

/**
 * Validate article has required fields for sentiment analysis
 * @param {Object} article - Article object
 * @returns {boolean} True if article is valid
 */
export function isValidArticle(article) {
  return article && (article.title || article.description);
}
