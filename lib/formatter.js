/**
 * Calculate sentiment percentages
 * @param {Array} articles - Array of articles with sentiment
 * @returns {Object} Sentiment counts and percentages
 */
export function calculateSentimentStats(articles) {
  if (!articles || articles.length === 0) {
    return {
      positive: 0,
      neutral: 0,
      negative: 0,
      total: 0,
      positivePercent: 0,
      neutralPercent: 0,
      negativePercent: 0,
    };
  }

  const counts = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  articles.forEach(article => {
    const sentiment = article.sentiment?.sentiment || 'neutral';
    if (sentiment in counts) {
      counts[sentiment]++;
    }
  });

  const total = articles.length;

  return {
    positive: counts.positive,
    neutral: counts.neutral,
    negative: counts.negative,
    total,
    positivePercent: Math.round((counts.positive / total) * 100),
    neutralPercent: Math.round((counts.neutral / total) * 100),
    negativePercent: Math.round((counts.negative / total) * 100),
  };
}

/**
 * Format articles for CSV export
 * @param {Array} articles - Array of articles with sentiment
 * @param {string} topic - Search topic
 * @returns {Array} Array of objects ready for CSV
 */
export function formatForCSV(articles, topic) {
  if (!articles || articles.length === 0) {
    return [];
  }

  return articles.map(article => ({
    Topic: topic,
    Title: article.title || '',
    Source: article.source || '',
    Sentiment: article.sentiment?.sentiment || 'neutral',
    Confidence: (article.sentiment?.confidence || 0).toFixed(2),
    'Publication Date': article.pubDate || '',
    URL: article.url || '',
  }));
}

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return 'Unknown';

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch {
    return dateString;
  }
}

/**
 * Generate summary statistics
 * @param {Array} articles - Array of articles with sentiment
 * @returns {Object} Summary object
 */
export function generateSummary(articles, topic) {
  const stats = calculateSentimentStats(articles);

  return {
    topic,
    articlesAnalyzed: articles.length,
    sentimentBreakdown: {
      positive: stats.positive,
      neutral: stats.neutral,
      negative: stats.negative,
    },
    percentages: {
      positive: stats.positivePercent,
      neutral: stats.neutralPercent,
      negative: stats.negativePercent,
    },
    averageConfidence: articles.length > 0
      ? (articles.reduce((sum, a) => sum + (a.sentiment?.confidence || 0), 0) / articles.length).toFixed(2)
      : 0,
  };
}

/**
 * Generate CSV string from articles
 * @param {Array} articles - Array of articles with sentiment
 * @param {string} topic - Search topic
 * @returns {string} CSV formatted string
 */
export function generateCSVString(articles, topic) {
  const csvData = formatForCSV(articles, topic);

  if (csvData.length === 0) {
    return 'No data to export';
  }

  // Get headers
  const headers = Object.keys(csvData[0]);
  const headerRow = headers.map(h => `"${h}"`).join(',');

  // Get data rows
  const dataRows = csvData.map(row =>
    headers.map(header => {
      let value = row[header] || '';
      // Sanitize formula injection by prefixing dangerous characters
      if (typeof value === 'string' && /^[=+\-@]/.test(value)) {
        value = "'" + value;
      }
      // Escape quotes and wrap in quotes
      const escaped = String(value).replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(',')
  );

  return [headerRow, ...dataRows].join('\n');
}
