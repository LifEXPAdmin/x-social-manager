# UINUX: X Social Media Manager

A private, personal-use web application for managing your X (Twitter) account with AI-powered reply assistance, tweet scheduling, and comprehensive rate limit tracking.

## 🌟 Features

- **Tweet Management**: Post tweets immediately or schedule them for later
- **Feed Reader (Basic tier+)**: Upgrade your X API plan to unlock live timeline & mentions inside the dashboard
- **AI Reply Assistant**: Generate contextual, tone-matched replies using GPT-4 Turbo
- **Rate Limit Tracking**: Monitor X API usage with visual indicators
- **Human-in-the-Loop**: All AI-generated content requires approval before posting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- X (Twitter) API credentials (Free tier)
- OpenAI API key (for AI reply assistant)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following:
   ```env
   # X (Twitter) API Credentials
   X_API_KEY=your_x_api_key_here
   X_API_SECRET=your_x_api_secret_here
   X_ACCESS_TOKEN=your_x_access_token_here
   X_ACCESS_TOKEN_SECRET=your_x_access_token_secret_here
   X_BEARER_TOKEN=your_x_bearer_token_here

   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key_here

   # Database path (optional, defaults to ./data/uinux.db)
   DATABASE_PATH=./data/uinux.db
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit `http://localhost:3000`

## 📋 How to Get API Credentials

### X (Twitter) API

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new project/app
3. Get your API keys and tokens:
   - API Key and Secret
   - Access Token and Secret
   - Bearer Token

### OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an API key
3. Add it to your `.env.local` file

## 🏗️ Project Structure

```
.
├── app/
│   ├── api/              # API routes
│   │   ├── tweets/       # Tweet endpoints
│   │   ├── ai/           # AI assistant endpoints
│   │   └── user/         # User info endpoints
│   ├── components/       # React components
│   │   ├── Dashboard.tsx
│   │   ├── Overview.tsx
│   │   ├── Compose.tsx
│   │   ├── Mentions.tsx
│   │   ├── Settings.tsx
│   │   ├── AIReplyAssistant.tsx
│   │   └── RateLimitDisplay.tsx
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── lib/
│   ├── db.ts             # Database utilities
│   ├── x-api.ts          # X API integration
│   └── ai-assistant.ts   # OpenAI integration
└── data/                 # SQLite database (created automatically)
```

## 📊 API Endpoints

### Tweets
- `POST /api/tweets/post` - Post a tweet immediately
- `POST /api/tweets/schedule` - Schedule a tweet
- `GET /api/tweets/schedule` - Get scheduled tweets
- `GET /api/tweets/my-tweets` - Get your recent tweets
- `GET /api/tweets/mentions` - Get mentions
- `POST /api/tweets/reply` - Reply to a tweet

### AI Assistant
- `POST /api/ai/generate-reply` - Generate AI reply suggestions

### User & Limits
- `GET /api/user/me` - Get authenticated user info
- `GET /api/rate-limits` - Get rate limit status

## 🔒 Security Notes

- **Never commit `.env.local`** to git (it's already in `.gitignore`)
- All API keys should be kept secret
- The database stores only local data (drafts, scheduled tweets)
- AI-generated content always requires manual approval

## 🚀 Deployment

This project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Note**: For Vercel deployment, you'll need to:
- Use Vercel's environment variables (not `.env.local`)
- Consider using Vercel's serverless functions for database operations
- SQLite may need to be replaced with a cloud database for production

## 📝 Rate Limits (Free Tier)

- **Posts**: 100 tweets/month
- **Writes**: 500 writes/month
- **Reads**: Varies by endpoint

The app tracks and displays your usage automatically.

## 🎨 Customization

### AI Tone & Style

Edit `lib/ai-assistant.ts` to customize the AI's system prompt and behavior.

### UI Styling

Modify `app/globals.css` to change the appearance of the dashboard.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (better-sqlite3)
- **APIs**: 
  - X (Twitter) API v2
  - OpenAI GPT-4 Turbo
- **Deployment**: Vercel

## 📄 License

Private use only. Not for redistribution.

## 🆘 Troubleshooting

**"X API credentials are missing"**
- Make sure all required environment variables are set in `.env.local`

**"Database error"**
- The database is created automatically on first run
- Ensure the `data/` directory has write permissions

**"Rate limit exceeded"**
- Check your X API usage in the Overview tab
- Free tier has monthly limits that reset

**"AI reply generation failed"**
- Verify your OpenAI API key is correct
- Check that you have credits in your OpenAI account

---

**Built with ❤️ for managing your X account efficiently and responsibly.**