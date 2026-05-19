import { fetchArticles } from '@/lib/newsData';
import { analyzeSentiment } from '@/lib/claude';
import { generateCSVString } from '@/lib/formatter';

export async function GET(request) {
  try {
    // Get topic from query parameters
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');
    const analysisData = searchParams.get('data'); // Optional: pre-analyzed data as JSON

    // Validate input
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return Response.json(
        {
          error: 'Topic query parameter is required',
        },
        { status: 400 }
      );
    }

    // Check for API keys
    if (!process.env.NEWSDATA_API_KEY || !process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          error: 'API keys not configured',
        },
        { status: 401 }
      );
    }

    let articles = [];

    // Use pre-analyzed data if provided, otherwise fetch and analyze
    if (analysisData) {
      try {
        const data = JSON.parse(decodeURIComponent(analysisData));
        articles = data.articles || [];
      } catch (error) {
        console.warn('Failed to parse analysis data, will fetch fresh data');
      }
    }

    // If no data provided, fetch and analyze fresh
    if (articles.length === 0) {
      const { articles: fetchedArticles, error: fetchError } = await fetchArticles(topic.trim(), 20);

      if (fetchError || fetchedArticles.length === 0) {
        return Response.json(
          {
            error: 'No articles found to export',
          },
          { status: 400 }
        );
      }

      articles = await analyzeSentiment(fetchedArticles);
    }

    // Generate CSV
    const csvContent = generateCSVString(articles, topic);

    // Return CSV file
    const filename = `sentiment-analysis-${topic.replace(/\s+/g, '-')}-${new Date().getTime()}.csv`;

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv;charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error in /api/export:', error);

    return Response.json(
      {
        error: 'Failed to generate CSV export',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return Response.json({}, {
    headers: {
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
