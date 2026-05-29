# KuchiTee Deployment Guide

Complete guide to deploying KuchiTee with free services.

---

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vercel        │     │   Render        │     │   Turso         │
│   (Frontend)    │────►│   (Backend)    │────►│   (Database)   │
│   Free CDN      │     │   $5/mo         │     │   Free Tier    │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Stripe        │
                        │   Payments      │
                        │   Free to Setup │
                        └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Printful      │
                        │   Fulfillment   │
                        │   POD Service   │
                        └─────────────────┘
```

---

## Step 1: Database Setup (Turso)

1. **Sign up** at [turso.tech](https://turso.tech) (free account includes 9GB storage)
2. **Create database** named `kuchitee`
3. **Get credentials** from turso.tech dashboard:
   - Turso Database URL
   - Auth Token

4. **Update server `.env`**:
```
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

---

## Step 2: Stripe Setup (Payments)

1. **Sign up** at [stripe.com](https://stripe.com) (free account, only pay per transaction)

2. **Get API keys** from Stripe Dashboard → Developers → API keys:
   - `STRIPE_SECRET_KEY` (sk_test_...)
   - `STRIPE_PUBLISHABLE_KEY` (pk_test_...)

3. **Create webhook endpoint** in Stripe Dashboard → Developers → Webhooks:
   - Endpoint URL: `https://your-render-app.ondigitalocean.app/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `checkout.session.expired`

4. **Get webhook secret** and add to `.env`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 3: Printful Setup (Fulfillment)

1. **Sign up** at [printful.com](https://printful.com) (free account, they handle printing/shipping)

2. **Connect store** and add products

3. **Get API key** from Printful Dashboard → Settings → API:
```
PRINTFUL_API_KEY=your-printful-api-key
```

4. **Set up webhooks** in Printful Dashboard → Settings → Webhooks:
   - URL: `https://your-render-app.ondigitalocean.app/api/webhooks/printful`

---

## Step 4: Deploy Backend (Render)

1. **Sign up** at [render.com](https://render.com) with $5 free credit

2. **Create new Blueprint**:
   - Connect GitHub repo
   - Select the `server/` folder
   - Add environment variables from `.env.example`

3. **Configure**:
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `node dist/index.js`

4. **Set environment variables**:
```
NODE_ENV=production
PORT=3001
TURSO_DATABASE_URL=your-turso-url
TURSO_AUTH_TOKEN=your-turso-token
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PRINTFUL_API_KEY=your-printful-key
CLIENT_URL=https://your-site.vercel.app
```

---

## Step 5: Deploy Frontend (Vercel)

1. **Sign up** at [vercel.com](https://vercel.com) with GitHub

2. **Import project**:
   - Select `marked-1/kuchitee`
   - Framework: Vite
   - Root directory: `client`

3. **Add environment variable**:
```
VITE_API_URL=https://your-render-app.onrender.com
```

4. **Deploy** - Vercel auto-deploys on push to main

---

## Step 6: Update Frontend API URL

1. In Vercel dashboard, add variable:
   - Key: `VITE_API_URL`
   - Value: Your Render backend URL (e.g., `https://kuchitee-server.onrender.com`)

2. **Redeploy** frontend to apply changes

---

## Free Tier Limits

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel | 100GB bandwidth/month | Auto deploys, free SSL |
| Render | Sleeps after 15 min idle | $5/month credit on signup |
| Turso | 9GB storage | Edge distributed database |
| Stripe | Free to integrate | 2.9% + 30¢ per transaction |
| Printful | Free account | They handle printing/shipping |

---

## Testing Locally

1. **Start backend**:
```bash
cd server
cp .env.example .env
# Fill in .env with your test API keys
pnpm install
pnpm dev
```

2. **Start frontend**:
```bash
cd client
pnpm dev
```

3. **Test flow**:
- Add items to cart
- Fill checkout form
- Complete Stripe test payment
- Verify order appears in database

---

## Production Checklist

- [ ] Stripe API keys changed to live keys (`sk_live_...`)
- [ ] Vercel `VITE_API_URL` set to production backend URL
- [ ] Stripe webhook configured for production URL
- [ ] Printful webhook configured for production URL
- [ ] Test a full payment flow with a small amount
- [ ] Verify order syncs to Printful correctly

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/products` | GET | List all products |
| `/api/products/:id` | GET | Get product by ID |
| `/api/products/sync` | POST | Sync products from Printful |
| `/api/orders/checkout` | POST | Create Stripe checkout session |
| `/api/orders/:id` | GET | Get order by ID |
| `/api/orders/session/:sessionId` | GET | Get order by Stripe session |
| `/api/webhooks/stripe` | POST | Stripe webhook handler |
| `/api/webhooks/printful` | POST | Printful webhook handler |