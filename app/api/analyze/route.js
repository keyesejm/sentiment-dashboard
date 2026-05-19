import { fetchArticles } from '@/lib/newsData';
import { analyzeSentiment, extractThemes } from '@/lib/claude';
import { calculateSentimentStats, generateSummary } from '@/lib/formatter';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { topic } = body;

    // Validate input
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return Response.json(
        {
          error: 'Topic is required and must be a non-empty string',
        },
        { status: 400 }
      );
    }

    // Check for API keys
    if (!process.env.NEWSDATA_API_KEY || !process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          error: 'API keys not configured. Please set NEWSDATA_API_KEY and ANTHROPIC_API_KEY in environment variables.',
        },
        { status: 401 }
      );
    }

    // Fetch articles
    const { articles, error: fetchError } = await fetchArticles(topic.trim(), 20);

    if (fetchError) {
      return Response.json(
        {
          error: fetchError,
        },
        { status: 400 }
      );
    }

    if (articles.length === 0) {
      return Response.json(
        {
          error: `No articles found for topic: "${topic}"`,
        },
        { status: 400 }
      );
    }

    // Analyze sentiment
    const analyzedArticles = await analyzeSentiment(articles);

    // Extract themes
    const themes = await extractThemes(analyzedArticles);

    // Calculate statistics
    const stats = calculateSentimentStats(analyzedArticles);

    // Generate response
    const response = {
      topic,
      timestamp: new Date().toISOString(),
      articles: analyzedArticles,
      summary: {
        positive: stats.positive,
        neutral: stats.neutral,
        negative: stats.negative,
        total: stats.total,
        positivePercent: stats.positivePercent,
        neutralPercent: stats.neutralPercent,
        negativePercent: stats.negativePercent,
      },
      themes,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error in /api/analyze:', error);

    // Handle different error types
    let errorMessage = 'An unexpected error occurred';
    let status = 500;

    if (error.message.includes('JSON')) {
      errorMessage = 'Invalid request format. Please ensure request body is valid JSON.';
      status = 400;
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Request timeout. Please try again.';
      status = 504;
    }

    return Response.json(
      {
        error: errorMessage,
      },
      { status }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return Response.json({}, {
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
