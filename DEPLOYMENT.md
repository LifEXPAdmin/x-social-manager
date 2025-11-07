# Deployment Guide

## 🚨 Important: SQLite on Vercel

**SQLite does not work on Vercel's serverless functions** because:
- Serverless functions are stateless and ephemeral
- File system writes are not persistent
- Each function invocation may run on a different container

### Options for Vercel Deployment

1. **Use a Cloud Database** (Recommended for production):
   - **Vercel Postgres** (built-in)
   - **PlanetScale** (serverless MySQL)
   - **Supabase** (PostgreSQL)
   - **Turso** (serverless SQLite, works with Vercel)

2. **Use Vercel KV** (Redis) for simple data storage

3. **Keep it local-only** (current setup):
   - Run the app on your local machine
   - Access via `localhost:3000` or use a tunnel (ngrok, etc.)

## 🔧 Quick Fix for Vercel

To make this work on Vercel, you'll need to:

1. **Replace SQLite with a cloud database**
2. **Update `lib/db.ts`** to use the new database client
3. **Update environment variables** in Vercel dashboard

### Example: Using Turso (SQLite-compatible)

```bash
npm install @libsql/client
```

Then update `lib/db.ts` to use Turso instead of better-sqlite3.

## 📝 Current Setup (Local Development)

The current setup works perfectly for:
- Local development
- Personal use on your MacBook
- Testing before deploying to production

## 🔐 Environment Variables in Vercel

When deploying to Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local`:
   - `X_API_KEY`
   - `X_API_SECRET`
   - `X_ACCESS_TOKEN`
   - `X_ACCESS_TOKEN_SECRET`
   - `X_BEARER_TOKEN`
   - `OPENAI_API_KEY`
   - `DATABASE_PATH` (if using file-based database, which won't work)

## 🚀 For Now

Since you're using this as a personal tool, you can:
- Run it locally with `npm run dev`
- Access it on your local network
- Or use a service like ngrok to expose it securely

## 💡 Future Migration Path

When ready to deploy:
1. Choose a cloud database (Turso recommended for easiest migration)
2. Update database connection code
3. Deploy to Vercel
4. Add environment variables
5. Test thoroughly

---

**Current Status**: ✅ Works perfectly for local development and personal use!
