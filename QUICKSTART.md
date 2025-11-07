# Quick Start Guide

## ✅ What's Been Built

Your **UINUX: X Social Media Manager** is now fully set up with:

1. ✅ **X API Integration** - Post tweets, read feeds, get mentions
2. ✅ **AI Reply Assistant** - GPT-4 powered reply generation
3. ✅ **Tweet Scheduling** - Schedule posts for later (stored in SQLite)
4. ✅ **Rate Limit Tracking** - Visual monitoring of API usage
5. ✅ **Dashboard UI** - Clean, modern interface with 4 main sections:
   - Overview (recent tweets + rate limits)
   - Compose (post or schedule tweets)
   - Mentions (view and reply to mentions)
   - Settings (account info)

## 🚀 Next Steps to Get Running

### 1. Install Dependencies

```bash
cd "/Users/awmccuen/Desktop/Wyatt Works/X"
npm install
```

### 2. Get Your API Credentials

#### X (Twitter) API:
1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new project/app
3. Copy these credentials:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret
   - Bearer Token

#### OpenAI API:
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key

### 3. Create Environment File

Create a file named `.env.local` in the project root:

```env
X_API_KEY=your_key_here
X_API_SECRET=your_secret_here
X_ACCESS_TOKEN=your_token_here
X_ACCESS_TOKEN_SECRET=your_token_secret_here
X_BEARER_TOKEN=your_bearer_token_here
OPENAI_API_KEY=your_openai_key_here
DATABASE_PATH=./data/uinux.db
```

### 4. Run the App

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🎯 How to Use

### Post a Tweet
1. Click "Compose" tab
2. Type your tweet (280 char limit)
3. Click "Post Tweet"

### Schedule a Tweet
1. Click "Compose" tab
2. Type your tweet
3. Check "Schedule for later"
4. Select date and time
5. Click "Schedule Tweet"

### Generate AI Reply
1. Click "Mentions" tab
2. Find a tweet you want to reply to
3. Click "Generate AI Reply"
4. Review the AI suggestions
5. Edit if needed
6. Click "Post Reply"

### View Rate Limits
- Check the "Overview" tab to see your API usage
- Green = Good, Yellow = Warning, Red = Critical

## ⚠️ Important Notes

1. **SQLite Database**: The app uses SQLite for local storage. The database file is created automatically in the `data/` folder.

2. **Vercel Deployment**: SQLite won't work on Vercel's serverless functions. See `DEPLOYMENT.md` for migration options if you want to deploy.

3. **Rate Limits**: Free tier X API has limits:
   - 100 posts/month
   - 500 writes/month
   - The app tracks these automatically

4. **AI Replies**: All AI-generated replies require your approval before posting (human-in-the-loop design).

## 🐛 Troubleshooting

**"X API credentials are missing"**
- Make sure `.env.local` exists and has all required variables
- Restart the dev server after adding environment variables

**"Database error"**
- The database folder is created automatically
- If errors persist, delete the `data/` folder and restart

**"Module not found: better-sqlite3"**
- Run `npm install` to install all dependencies
- Make sure you're using Node.js 18+

**Port already in use**
- Change the port: `PORT=3001 npm run dev`

## 📚 Documentation

- See `README.md` for full documentation
- See `DEPLOYMENT.md` for deployment considerations

---

**You're all set!** 🎉 Start managing your X account with AI assistance!
