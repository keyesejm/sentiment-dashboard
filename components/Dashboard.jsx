'use client';

import { useState } from 'react';
import SearchForm from './SearchForm';
import SentimentChart from './SentimentChart';
import ArticleList from './ArticleList';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { generateCSVString } from '@/lib/formatter';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [summary, setSummary] = useState(null);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  const handleSearch = async (searchTopic) => {
    setLoading(true);
    setError(null);
    setArticles([]);
    setSummary(null);
    setThemes([]);
    setTopic(searchTopic);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: searchTopic }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to analyze articles');
        return;
      }

      setArticles(data.articles || []);
      setSummary(data.summary);
      setThemes(data.themes || []);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing articles');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (articles.length === 0) return;

    setExporting(true);
    try {
      const csvContent = generateCSVString(articles, topic);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      const filename = `sentiment-analysis-${topic.replace(/\s+/g, '-')}-${new Date().getTime()}.csv`;
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to export CSV');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {/* Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Results */}
      {!loading && articles.length > 0 && (
        <>
          <div className="mb-2 text-sm text-gray-600">
            Analyzed {articles.length} articles for "<span className="font-semibold">{topic}</span>"
          </div>

          {/* Sentiment Chart */}
          {summary && <SentimentChart summary={summary} />}

          {/* Themes */}
          {themes.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Common Themes</h2>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article List */}
          <ArticleList
            articles={articles}
            onExport={handleExport}
            isExporting={exporting}
          />
        </>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Enter a topic above and click "Analyze" to get started
          </p>
        </div>
      )}
    </div>
  );
}
