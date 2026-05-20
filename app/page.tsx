import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sentiment Analysis Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Analyze news articles for sentiment using Claude AI
              </p>
            </div>
            <a
              href="/learn"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              📚 Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
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
            <p className="mt-2">
              <a
                href="https://github.com/keyesejm/sentiment-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
