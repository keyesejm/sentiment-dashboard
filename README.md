# Sentiment Analysis Web Dashboard

A full-stack web application that analyzes sentiment of news articles using Claude API and displays results in a beautiful dashboard.

## Features

- **Real-time sentiment analysis** of news articles
- **News fetching** from NewsData.io free API
- **Visual dashboard** showing sentiment breakdown with charts
- **CSV export** for further analysis
- **Responsive design** for mobile, tablet, and desktop
- **Vercel deployment** with automatic CI/CD

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes (serverless)
- **APIs**: 
  - Claude API (sentiment analysis)
  - NewsData.io (article fetching)
- **Visualization**: Recharts
- **Data Export**: PapaParse
- **Hosting**: Vercel (free tier)

## Setup

### Prerequisites

- Node.js 18+ and npm
- API keys:
  - [NewsData.io](https://newsdata.io) - Free tier (100 requests/day)
  - [Anthropic Claude API](https://console.anthropic.com) - Free trial (~$5 credits)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sentiment-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your API keys:
   ```
   NEWSDATA_API_KEY=your_key_here
   ANTHROPIC_API_KEY=your_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sentiment-dashboard/
├── app/
│   ├── page.js              # Home page with search form
│   ├── layout.js            # Root layout
│   ├── globals.css          # Tailwind styles
│   └── api/
│       ├── analyze/         # POST endpoint for sentiment analysis
│       └── export/          # GET endpoint for CSV download
├── lib/
│   ├── newsData.js          # NewsData.io API client
│   ├── claude.js            # Claude API client with batch processing
│   ├── formatter.js         # Data formatting utilities
│   └── types.ts             # TypeScript type definitions
├── components/
│   ├── SearchForm.jsx       # Search input form
│   ├── Dashboard.jsx        # Main results display
│   ├── SentimentChart.jsx   # Sentiment visualization
│   ├── ArticleList.jsx      # Article cards
│   └── LoadingSpinner.jsx   # Loading indicator
├── .env.local.example       # Environment template
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── README.md                # This file
```

## Usage

1. **Search for a topic** in the dashboard
2. **View results** showing:
   - Sentiment breakdown (positive/neutral/negative)
   - Visual chart of sentiment distribution
   - List of analyzed articles with sentiment badges
   - Confidence scores for each sentiment
3. **Export results** to CSV by clicking the Export button

## API Reference

### POST `/api/analyze`

Fetches articles and analyzes their sentiment.

**Request:**
```json
{
  "topic": "AI in healthcare"
}
```

**Response:**
```json
{
  "topic": "AI in healthcare",
  "articles": [
    {
      "title": "...",
      "source": "...",
      "pubDate": "...",
      "url": "...",
      "sentiment": {
        "sentiment": "positive",
        "confidence": 0.94,
        "summary": "..."
      }
    }
  ],
  "summary": {
    "positive": 14,
    "neutral": 6,
    "negative": 4,
    "positivePercent": 58,
    "neutralPercent": 25,
    "negativePercent": 17
  },
  "themes": ["AI accuracy", "Patient outcomes", "Ethics"]
}
```

### GET `/api/export?topic=xyz`

Downloads analyzed results as a CSV file.

**Response:** CSV file with columns:
- Topic
- Title
- Source
- Sentiment
- Confidence
- Publication Date
- URL

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard:
     - `NEWSDATA_API_KEY`
     - `ANTHROPIC_API_KEY`

3. **Deploy**
   - Push to `main` branch for production deployment
   - Push to other branches for preview deployments

## Performance Notes

- **Batch processing**: Articles are analyzed in groups of 4-5 to reduce API calls
- **Token optimization**: Claude Haiku is used for cost efficiency
- **Caching**: Results are cached client-side for instant re-analysis
- **Rate limits**: NewsData.io free tier (100 requests/day), Claude API ($5 free)

## Error Handling

The application gracefully handles:
- Missing API keys (displays helpful setup instructions)
- API rate limits (shows user-friendly message)
- Empty search results (displays "No articles found")
- API timeouts (30-second timeout with error message)
- Parse errors (continues with valid articles, skips failed ones)

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Run linter
npm run lint
```

## Free Tier Limits

- **NewsData.io**: 100 API requests per day
- **Anthropic Claude**: ~$5 free trial credits
- **Vercel**: Unlimited deployments, serverless functions

## License

MIT License - feel free to use this project for your portfolio.

## Support

For API issues:
- [NewsData.io Documentation](https://newsdata.io/docs)
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Happy analyzing!** 🚀
