# 🚀 Quick Deployment Guide: Jan-Gana 2027 Portal

This complete project is ready for instant cloud deployment.

---

## ⚡ Option 1: Deploy to Vercel (Recommended • 2 Minutes)

Vercel is the native cloud platform for Next.js and provides zero-configuration hosting with global edge caching and free HTTPS.

### Steps:
1. Extract the downloaded `jan-gana-2027-production-package.zip`.
2. Push the folder to your **GitHub / GitLab** account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Jan-Gana 2027 Digital Census Portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/jan-gana-2027.git
   git push -u origin main
   ```
3. Go to **[https://vercel.com/new](https://vercel.com/new)** and import your `jan-gana-2027` repository.
4. *(Optional)* Add Environment Variables in the Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Google AI Studio API key (if you want live Gemini AI answers; otherwise, the built-in legal intelligence engine handles everything automatically).
   - `DATABASE_URL`: PostgreSQL connection string (Supabase / Neon DB) if connecting a live production database.
5. Click **Deploy**. Your site will be live on a `https://jan-gana-2027.vercel.app` URL with free SSL!

---

## 🌐 Option 2: Deploy using Vercel CLI (1-Click from Terminal)

```bash
# In the extracted folder:
npm install -g vercel
vercel
```
Follow the interactive prompts (defaults are pre-configured in `vercel.json`).

---

## ☁️ Option 3: Deploy to Netlify / Render

1. Connect your GitHub repository to **Netlify** or **Render**.
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
   - **Node Version**: `18.x` or `20.x` or `24.x`

---

## 🖥️ Option 4: Run Locally on Any Computer

```bash
# 1. Extract zip and navigate to folder
cd jan-gana-2027

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser:
http://localhost:3000
```
