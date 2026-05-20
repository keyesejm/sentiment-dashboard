'use client';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
              <p className="text-gray-600 mt-1">
                Learn how sentiment analysis works and how this tool analyzes news
              </p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Table of Contents */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-blue-700">
            <li>
              <a href="#what-is" className="hover:underline">
                1. What is Sentiment Analysis?
              </a>
            </li>
            <li>
              <a href="#how-works" className="hover:underline">
                2. How This Tool Works
              </a>
            </li>
            <li>
              <a href="#architecture" className="hover:underline">
                3. Technical Architecture
              </a>
            </li>
            <li>
              <a href="#sentiment-types" className="hover:underline">
                4. Types of Sentiment
              </a>
            </li>
            <li>
              <a href="#limitations" className="hover:underline">
                5. Limitations & Considerations
              </a>
            </li>
            <li>
              <a href="#use-cases" className="hover:underline">
                6. Use Cases
              </a>
            </li>
          </ul>
        </div>

        {/* Section 1 */}
        <section id="what-is" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. What is Sentiment Analysis?
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <p className="text-gray-700">
              Sentiment analysis is a natural language processing (NLP) technique that determines
              the emotional tone or opinion expressed in text. It classifies content as positive,
              negative, or neutral.
            </p>
            <div className="bg-gray-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-gray-900 mb-2">Real-world example:</p>
              <p className="text-gray-700">
                "Apple launches revolutionary new iPhone with AI features" → <span className="text-green-600 font-semibold">Positive</span>
              </p>
              <p className="text-gray-700 mt-2">
                "Stock market experiences decline amid economic concerns" → <span className="text-red-600 font-semibold">Negative</span>
              </p>
              <p className="text-gray-700 mt-2">
                "Company announces quarterly earnings results" → <span className="text-yellow-600 font-semibold">Neutral</span>
              </p>
            </div>
            <p className="text-gray-700">
              Sentiment analysis is useful for understanding public opinion, tracking brand
              perception, monitoring news trends, and analyzing social media reactions.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="how-works" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How This Tool Works</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-6">
              The sentiment analysis tool follows a multi-step pipeline to analyze news articles:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Step 1: Fetch Articles</h3>
                <p className="text-gray-700 mb-2">
                  When you enter a topic (e.g., "AI"), the tool fetches up to 20 recent news
                  articles from NewsData.io, a global news API.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Data collected:</strong> title, description, source, publication date,
                  and image URL
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Step 2: Batch Processing</h3>
                <p className="text-gray-700 mb-2">
                  Articles are processed in batches of 4 to optimize API calls and cost. This
                  speeds up analysis while keeping expenses low.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Step 3: AI Sentiment Analysis</h3>
                <p className="text-gray-700 mb-2">
                  Each batch is sent to Claude AI (Anthropic's language model) which reads the
                  article titles and descriptions, then classifies the sentiment as:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                  <li>
                    <strong>Positive:</strong> Optimistic, favorable, or good news
                  </li>
                  <li>
                    <strong>Neutral:</strong> Factual, informational, without emotional tone
                  </li>
                  <li>
                    <strong>Negative:</strong> Critical, concerning, or unfavorable tone
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  Claude also provides a confidence score (0-1) and a brief explanation for each
                  classification.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Step 4: Theme Extraction</h3>
                <p className="text-gray-700 mb-2">
                  After sentiment analysis, Claude identifies 4-6 main themes or keywords from
                  all article titles. These represent the key topics discussed across the news.
                </p>
                <p className="text-sm text-gray-600">
                  Example themes for "AI": AI adoption, machine learning applications, ethics,
                  investment trends
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Step 5: Aggregate & Visualize</h3>
                <p className="text-gray-700 mb-2">
                  The tool calculates sentiment statistics (percentages of positive, neutral,
                  negative) and presents results in an interactive dashboard with:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                  <li>Sentiment distribution chart</li>
                  <li>Detailed article listings with individual sentiment scores</li>
                  <li>Extracted themes or keywords</li>
                  <li>Real-time analysis timestamp</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="architecture" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Technical Architecture</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-6">
              This tool is built with modern web technologies and AI APIs:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Frontend</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Next.js:</strong> React framework</li>
                  <li>• <strong>Tailwind CSS:</strong> Styling</li>
                  <li>• <strong>Recharts:</strong> Data visualization</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Backend</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Next.js API Routes:</strong> Server endpoints</li>
                  <li>• <strong>Node.js:</strong> Runtime</li>
                  <li>• <strong>Vercel:</strong> Hosting & deployment</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">External APIs</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>NewsData.io:</strong> Article fetching</li>
                  <li>• <strong>Anthropic Claude:</strong> Sentiment analysis</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Data Flow</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>1. User enters topic</li>
                  <li>2. Backend fetches articles</li>
                  <li>3. Claude analyzes sentiment</li>
                  <li>4. Results returned to frontend</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> All processing happens server-side. Your API keys for
                NewsData.io and Claude never leave the server, ensuring security.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="sentiment-types" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Types of Sentiment</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded border border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">😊</div>
                <h4 className="font-bold text-green-900 mb-2">Positive</h4>
                <p className="text-sm text-green-800 mb-3">
                  Optimistic, favorable, encouraging, or celebrating tone
                </p>
                <div className="bg-white p-2 rounded text-xs text-gray-700">
                  "Company announces record-breaking growth"
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded border border-gray-300">
                <div className="text-4xl font-bold text-gray-600 mb-2">😐</div>
                <h4 className="font-bold text-gray-900 mb-2">Neutral</h4>
                <p className="text-sm text-gray-800 mb-3">
                  Factual, informational, objective tone without clear sentiment
                </p>
                <div className="bg-white p-2 rounded text-xs text-gray-700">
                  "Market closes with mixed signals today"
                </div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded border border-red-200">
                <div className="text-4xl font-bold text-red-600 mb-2">😔</div>
                <h4 className="font-bold text-red-900 mb-2">Negative</h4>
                <p className="text-sm text-red-800 mb-3">
                  Critical, concerning, discouraging, or problematic tone
                </p>
                <div className="bg-white p-2 rounded text-xs text-gray-700">
                  "Industry faces significant challenges ahead"
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="limitations" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitations & Considerations</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Sarcasm & Irony</h4>
              <p className="text-gray-700">
                AI models can struggle with sarcasm. A sarcastic negative statement might be
                misclassified as positive.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Context Dependency</h4>
              <p className="text-gray-700">
                Sentiment can be context-specific. The same phrase might have different meanings
                in different industries or regions.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">News Article Bias</h4>
              <p className="text-gray-700">
                News articles are typically written in neutral language by design. This tool may
                show many neutral results from news sources.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Limited Article Data</h4>
              <p className="text-gray-700">
                Analysis is based on article titles and descriptions only, not full article
                content. Longer articles might have nuanced sentiment.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">API Rate Limits</h4>
              <p className="text-gray-700">
                NewsData.io free tier allows 100 requests per day. High usage may hit rate limits.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="use-cases" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Use Cases</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-700 mb-6">
              This tool can be applied in various scenarios:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">📊 Business Intelligence</h4>
                <p className="text-sm text-blue-800">
                  Monitor how your industry and competitors are perceived in news coverage
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">🎯 Market Research</h4>
                <p className="text-sm text-green-800">
                  Understand public opinion about products, trends, and technologies
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2">📰 Content Analysis</h4>
                <p className="text-sm text-purple-800">
                  Track sentiment trends over time for specific topics or keywords
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-2">🔍 PR Monitoring</h4>
                <p className="text-sm text-orange-800">
                  Identify negative coverage and opportunities for public relations responses
                </p>
              </div>

              <div className="p-4 bg-red-50 rounded border border-red-200">
                <h4 className="font-bold text-red-900 mb-2">💡 Innovation Tracking</h4>
                <p className="text-sm text-red-800">
                  Understand how new technologies and innovations are being received
                </p>
              </div>

              <div className="p-4 bg-indigo-50 rounded border border-indigo-200">
                <h4 className="font-bold text-indigo-900 mb-2">📈 Trend Analysis</h4>
                <p className="text-sm text-indigo-800">
                  Identify emerging themes and sentiment shifts in your industry
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Analyze?</h2>
          <p className="mb-6 text-blue-100">
            Go to the dashboard and start exploring sentiment in news articles around any topic.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
          >
            Start Analysis
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>
              Powered by{' '}
              <a
                href="https://newsdata.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                NewsData.io
              </a>
              {' '}and{' '}
              <a
                href="https://anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Anthropic Claude
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
