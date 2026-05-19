import axios from 'axios';

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1/news';

/**
 * Fetch articles from NewsData.io API
 * @param {string} topic - Search topic (e.g., "AI in healthcare")
 * @param {number} limit - Number of articles to fetch (default: 20)
 * @returns {Promise<{articles: Array, error?: string}>} Articles or error message
 */
export async function fetchArticles(topic, limit = 20) {
  if (!NEWSDATA_API_KEY) {
    return {
      articles: [],
      error: 'NEWSDATA_API_KEY is not set. Please configure environment variables.',
    };
  }

  if (!topic || topic.trim().length === 0) {
    return {
      articles: [],
      error: 'Topic is required',
    };
  }

  try {
    const response = await axios.get(NEWSDATA_BASE_URL, {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: topic.trim(),
        language: 'en',
        size: Math.min(limit, 50), // API max is 50
      },
      timeout: 30000, // 30 second timeout
    });

    if (!response.data || !response.data.results) {
      return {
        articles: [],
        error: 'No articles found for this topic',
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
    };
  } catch (error) {
    let errorMessage = 'Failed to fetch articles';

    if (error.response?.status === 429) {
      errorMessage = 'Rate limit reached. NewsData.io free tier allows 100 requests/day. Please try again later.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid NEWSDATA_API_KEY. Please check your environment variables.';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout. NewsData.io API took too long to respond.';
    } else if (error.message === 'Network Error') {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    console.error('NewsData.io API Error:', error.message);
    return {
      articles: [],
      error: errorMessage,
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
