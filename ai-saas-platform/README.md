# AI SaaS Platform

Full-stack AI document generation platform with resumes, cover letters, HSE docs, websites, templates, payments (Pakistan), email/WhatsApp.

## Features
- AI Generation (OpenAI GPT-4o-mini)
- Document Downloads (PDF/DOCX/TXT)
- Template Library
- User/Admin Dashboards
- Payments: Easypaisa, JazzCash, Meezan IBAN
- Email Notifications
- WhatsApp Support

## Setup Local
```bash
cp .env.example .env  # Add your keys
cd ai-saas-platform
npm install
npx turbo dev  # Frontend:3000 Backend:3002
```

## Deploy Vercel
```bash
vercel --prod
```

## Env Vars (Vercel dashboard)
AI_API_KEY, EMAIL_ADDRESS, WHATSAPP_NUMBER, etc.

## API Endpoints
- POST /api/auth/signup
- POST /api/ai/resume
- GET /api/templates
- POST /api/download/pdf
