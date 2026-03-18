# AI SaaS Platform

AI-powered SaaS for generating resumes, cover letters, HSE documents, websites, etc. Premium templates, auth, payments.

## Tech Stack
- **Monorepo:** Turborepo
- **Frontend:** Next.js 14, Tailwind CSS, TypeScript
- **Backend:** Express.js, OpenAI, JWT auth, Nodemailer, PDF/Docx generation
- **Tools:** Vercel deploy-ready

## Quick Start

1. **Install dependencies:**
   ```bash
   cd ai-saas-platform
   npm install
   ```

2. **Env setup:** Copy `.env.example` to `.env.local` and add keys:
   ```
   AI_API_KEY=your_openai_key
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   PORT=3001
   ```

3. **Dev mode:**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001/api/health

4. **Build & Start:**
   ```bash
   npm run build
   npm run start
   ```

## Project Structure
```
ai-saas-platform/
├── backend/          # Express API (auth, AI tools)
├── frontend/         # Next.js app
├── package.json      # Root (turbo workspaces)
└── turbo.json
```

## TODO Progress
See [TODO.md](TODO.md)

## Deployment
- Push to GitHub
- `vercel --prod`

