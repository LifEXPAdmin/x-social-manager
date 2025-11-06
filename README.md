# X Social Media Manager

A private dashboard for managing your X (Twitter) social media account, including reading and writing tweets on a regular basis.

## 🚀 Quick Start - Deployment Guide

Follow these steps to get your website up and running:

### Step 1: Install Dependencies Locally (Optional - for testing)

First, install the project dependencies:

```bash
npm install
```

To test locally before deploying:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `x-social-manager` (or any name you prefer)
4. Make it **Private** (recommended since this is an admin tool)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 3: Push Code to GitHub

In your terminal, navigate to this project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Bare-bones website setup"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/x-social-manager.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign in (use your GitHub account for easy integration)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository (`x-social-manager`)
4. Vercel will auto-detect it's a Next.js project
5. Click **"Deploy"** (you can leave all settings as default)
6. Wait for deployment to complete (usually 1-2 minutes)

### Step 5: Configure Custom Domain in Vercel

1. In your Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. In the domain input field, enter: **`admin.wyatt-works.com`** (or any subdomain you prefer)
3. Click **"Add"**
4. Vercel will show you DNS configuration details - **keep this page open**, you'll need it for the next step
5. Note the DNS records Vercel provides (usually a CNAME record pointing to `cname.vercel-dns.com`)

### Step 6: Configure DNS in Squarespace

1. Log in to your Squarespace account
2. Go to **Settings** → **Domains** → **wyatt-works.com**
3. Click **"DNS Settings"** or **"Advanced DNS Settings"**
4. Add a new DNS record:
   - **Type**: `CNAME`
   - **Host**: `admin` (or whatever subdomain you chose)
   - **Points to**: The value Vercel provided (usually something like `cname.vercel-dns.com`)
   - **TTL**: 3600 (or default)
5. Click **"Save"** or **"Add Record"**

### Step 7: Wait for DNS Propagation

- DNS changes can take anywhere from a few minutes to 48 hours
- Usually takes 5-30 minutes
- You can check if it's working by visiting `admin.wyatt-works.com` in your browser
- Vercel dashboard will show when the domain is verified (green checkmark)

### Step 8: Verify Everything Works

1. Visit `https://admin.wyatt-works.com` (or your chosen subdomain)
2. You should see your X Social Media Manager website
3. The site should be accessible only via this subdomain (not the main wyatt-works.com)

## 🔒 Security Note

Since this is an admin tool, consider:

- **Making the GitHub repo private** (as recommended in Step 2)
- Adding authentication/password protection later (we'll implement this when you're ready)
- Using environment variables for any API keys (never commit secrets to GitHub)

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx      # Main layout component
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
├── next.config.js      # Next.js configuration
└── vercel.json         # Vercel deployment config
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Next Steps

Once deployed, you can:
1. Add X (Twitter) API integration
2. Build tweet reading/writing features
3. Add scheduling functionality
4. Implement authentication for additional security

## 🆘 Troubleshooting

**Domain not working?**
- Check DNS propagation: https://www.whatsmydns.net
- Verify DNS records in Squarespace match Vercel's requirements
- Make sure you're using HTTPS (Vercel provides SSL automatically)

**Build errors?**
- Make sure all dependencies are installed: `npm install`
- Check Vercel build logs for specific errors

**Need help?**
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs

---

**Congratulations!** 🎉 Your website should now be live at `admin.wyatt-works.com` (or your chosen subdomain).
