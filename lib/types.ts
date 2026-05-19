// Article from NewsData.io
export interface Article {
  title: string;
  description?: string;
  source: string;
  pubDate?: string;
  url: string;
  image?: string;
}

// Sentiment analysis result
export interface SentimentResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  summary: string;
}

// Article with sentiment analysis
export interface AnalyzedArticle extends Article {
  sentiment: SentimentResult;
}

// Analysis summary statistics
export interface AnalysisSummary {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

// Complete analysis response
export interface AnalysisResponse {
  topic: string;
  articles: AnalyzedArticle[];
  summary: {
    positive: number;
    neutral: number;
    negative: number;
    positivePercent: number;
    neutralPercent: number;
    negativePercent: number;
  };
  themes: string[];
}

// API error response
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
