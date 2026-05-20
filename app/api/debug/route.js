export async function GET() {
  return Response.json({
    hasNewsDataKey: !!process.env.NEWSDATA_API_KEY,
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    newsDataKeyLength: process.env.NEWSDATA_API_KEY?.length || 0,
    newsDataKeyStart: process.env.NEWSDATA_API_KEY?.substring(0, 10) || 'NOT SET',
  });
}
