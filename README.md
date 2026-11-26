# portfolio

Personal engineering portfolio of **Vibhu Dixit** — Associate AI Engineer (Level 2) at Meridian Solutions Pvt. Ltd., showcasing Generative AI workflows, Cybersecurity / VAPT automation, full-stack systems, live client portals, and 57 verified certifications.

## Tech Stack
- **Frontend**: React 19, Vite 8, Tailwind CSS 4, Motion, Three.js, QRCode
- **Backend / Serverless**: Express (local dev) & Vercel Serverless Functions (`api/contact.js`, `api/health.js`) with Nodemailer

## Local Development
```bash
npm install
cp .env.example .env
npm run dev
```

## Vercel Environment Variables
Configure these in **Vercel → Project Settings → Environment Variables** for live contact form delivery:
- `NOTIFICATION_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
