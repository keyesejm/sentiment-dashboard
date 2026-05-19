import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const BATCH_SIZE = 4; // Articles per API call

const client = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

/**
 * Analyze sentiment for a batch of articles
 * @param {Array} articles - Array of articles with title and description
 * @returns {Promise<Array>} Array of sentiment results
 */
async function analyzeBatch(articles) {
  if (!articles || articles.length === 0) {
    return [];
  }

  // Format articles for Claude prompt
  const articleTexts = articles
    .map(
      (article, idx) =>
        `Article ${idx + 1}:\nTitle: ${article.title}\nDescription: ${article.description || 'N/A'}`
    )
    .join('\n\n');

  const prompt = `You are a sentiment analysis expert. Analyze the sentiment of each article below and return a JSON array with one object per article containing sentiment, confidence, and summary.

${articleTexts}

Return ONLY a valid JSON array with no markdown or extra text. Each object must have exactly this structure:
{
  "sentiment": "positive" | "neutral" | "negative",
  "confidence": <number between 0 and 1>,
  "summary": "<brief 1-2 sentence explanation>"
}

The array should have exactly ${articles.length} objects in the same order as the articles above.`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const responseText = message.content[0]?.text || '';

    // Parse JSON response
    let sentiments = [];
    try {
      sentiments = JSON.parse(responseText);
      if (!Array.isArray(sentiments)) {
        sentiments = [sentiments];
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      // Return default neutral sentiments if parsing fails
      sentiments = articles.map(() => ({
        sentiment: 'neutral',
        confidence: 0.5,
        summary: 'Unable to analyze sentiment',
      }));
    }

    // Validate and normalize results
    return sentiments.map(result => ({
      sentiment: validateSentiment(result.sentiment),
      confidence: Math.min(Math.max(result.confidence || 0.5, 0), 1),
      summary: result.summary || 'Sentiment analysis completed',
    }));
  } catch (error) {
    console.error('Claude API Error:', error.message);

    // Return default sentiments on error
    return articles.map(() => ({
      sentiment: 'neutral',
      confidence: 0.5,
      summary: 'Error during sentiment analysis',
    }));
  }
}

/**
 * Validate sentiment value
 * @param {string} sentiment - Sentiment value
 * @returns {string} Valid sentiment value
 */
function validateSentiment(sentiment) {
  const valid = ['positive', 'neutral', 'negative'];
  const normalized = (sentiment || '').toLowerCase().trim();
  return valid.includes(normalized) ? normalized : 'neutral';
}

/**
 * Analyze sentiment for multiple articles with batch processing
 * @param {Array} articles - Array of articles
 * @returns {Promise<Array>} Array of articles with sentiment results
 */
export async function analyzeSentiment(articles) {
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return articles.map(article => ({
      ...article,
      sentiment: {
        sentiment: 'neutral',
        confidence: 0,
        summary: 'API key not configured',
      },
    }));
  }

  if (!articles || articles.length === 0) {
    return [];
  }

  try {
    const results = [];

    // Process articles in batches
    for (let i = 0; i < articles.length; i += BATCH_SIZE) {
      const batch = articles.slice(i, i + BATCH_SIZE);
      const sentiments = await analyzeBatch(batch);

      // Combine articles with sentiment results
      batch.forEach((article, idx) => {
        results.push({
          ...article,
          sentiment: sentiments[idx] || {
            sentiment: 'neutral',
            confidence: 0.5,
            summary: 'Analysis skipped',
          },
        });
      });
    }

    return results;
  } catch (error) {
    console.error('Error analyzing sentiment:', error.message);
    return articles.map(article => ({
      ...article,
      sentiment: {
        sentiment: 'neutral',
        confidence: 0,
        summary: 'Error during analysis',
      },
    }));
  }
}

/**
 * Extract themes/keywords from articles
 * @param {Array} articles - Array of articles
 * @returns {Promise<Array>} Array of theme strings
 */
export async function extractThemes(articles) {
  if (!articles || articles.length === 0) {
    return [];
  }

  const titles = articles.map(a => a.title).join('; ');

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `Extract 4-6 main themes or keywords from these article titles. Return ONLY a JSON array of strings, no markdown.

Article titles: ${titles}

Return exactly this format:
["theme1", "theme2", "theme3"]`,
        },
      ],
    });

    const responseText = message.content[0]?.text || '[]';

    try {
      const themes = JSON.parse(responseText);
      return Array.isArray(themes) ? themes.slice(0, 6) : [];
    } catch {
      return [];
    }
  } catch (error) {
    console.error('Error extracting themes:', error.message);
    return [];
  }
}
