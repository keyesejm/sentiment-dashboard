'use client';

import { formatDate } from '@/lib/formatter';

const sentimentConfig = {
  positive: {
    color: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    label: 'Positive',
    icon: '↑',
  },
  neutral: {
    color: '#6b7280',
    bgColor: '#f3f4f6',
    borderColor: '#d1d5db',
    label: 'Neutral',
    icon: '→',
  },
  negative: {
    color: '#ef4444',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    label: 'Negative',
    icon: '↓',
  },
};

export default function ArticleList({ articles, onExport, isExporting }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Articles</h2>
        <button
          onClick={onExport}
          disabled={isExporting}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors font-medium text-sm"
        >
          {isExporting ? 'Exporting...' : '↓ Export CSV'}
        </button>
      </div>

      <div className="divide-y">
        {articles.map((article, idx) => {
          const sentiment = article.sentiment?.sentiment || 'neutral';
          const config = sentimentConfig[sentiment];
          const confidence = Math.round((article.sentiment?.confidence || 0) * 100);

          return (
            <div
              key={idx}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Sentiment Badge */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: config.bgColor, color: config.color }}
                >
                  {config.icon}
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">
                    {article.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-600">
                    <span className="font-medium">{article.source}</span>
                    <span>•</span>
                    <span>{formatDate(article.pubDate)}</span>
                  </div>

                  {article.description && (
                    <p className="text-gray-700 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: config.bgColor,
                        color: config.color,
                        border: `1px solid ${config.borderColor}`,
                      }}
                    >
                      {config.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      Confidence: <span className="font-semibold">{confidence}%</span>
                    </div>
                  </div>

                  {article.sentiment?.summary && (
                    <p className="text-sm text-gray-600 italic mb-3">
                      "{article.sentiment.summary}"
                    </p>
                  )}

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Read article →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
