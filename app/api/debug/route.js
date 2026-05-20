import axios from 'axios';

export async function GET() {
  const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

  // Test the API key
  let newsDataTest = null;
  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: 'test',
        language: 'en',
        size: 1,
      },
      timeout: 5000,
    });
    newsDataTest = {
      status: response.status,
      dataStatus: response.data?.status,
      hasResults: !!response.data?.results,
    };
  } catch (error) {
    newsDataTest = {
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
    };
  }

  return Response.json({
    hasNewsDataKey: !!NEWSDATA_API_KEY,
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    newsDataKeyLength: NEWSDATA_API_KEY?.length || 0,
    newsDataKeyStart: NEWSDATA_API_KEY?.substring(0, 20) || 'NOT SET',
    newsDataTest,
  });
}
