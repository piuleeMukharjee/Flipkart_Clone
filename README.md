# Flipkart Clone — Full-Stack E-Commerce Demo

Next.js 14 (App Router) storefront + Express REST API + PostgreSQL + Prisma. Uses a **single demo user** (`id = 1`) with no authentication — suitable for interviews and local demos.

## Repository layout

- `backend/` — Express API, Prisma schema, seed script
- `frontend/` — Next.js 14 + Tailwind CSS

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ **running and reachable** (see error `Can't reach database server at localhost:5432` if the service is stopped)

### PostgreSQL via Docker (optional)

From the repo root, if you use Docker Desktop:

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with user `postgres`, password `postgres`, database `flipkart_clone` — matching the default `backend/.env`.

## 1. Database & API (backend)

```bash
cd backend
cp .env.example .env
# Edit .env — set DATABASE_URL for your PostgreSQL instance
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

The API listens on **http://localhost:4000** by default.

- Health: `GET http://localhost:4000/api/health`
- Prisma Studio (optional): `npx prisma studio`

### Environment variables (backend)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | API port (default `4000`) |
| `DEFAULT_USER_ID` | User id used for cart & orders (default `1`) |
| `CORS_ORIGIN` | Allowed frontend origin(s), comma-separated, or `*` |

The seed script creates the first user as the demo account; on a **fresh** database that user’s id is **1**, matching `DEFAULT_USER_ID`.

## 2. Frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL (home page server-renders via fetch to the API, which reads PostgreSQL)
npm install
npm run dev
```

Open **http://localhost:3000**.

## 3. Deployment notes

**Vercel (frontend)**  
- Set `NEXT_PUBLIC_API_URL` to your public API base (e.g. `https://your-api.onrender.com/api`).  
- Project root: `frontend/`.

**Render (backend)**  
- Build: `cd backend && npm install && npx prisma generate`  
- Start: `npx prisma db push && node server.js` (or run migrations in production )  
- Set `DATABASE_URL`, `PORT`, `CORS_ORIGIN` (your Vercel URL), and `DEFAULT_USER_ID=1`.

## API summary

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List products (`?search=&category=id`) |
| GET | `/api/products/:id` | Product + images |
| GET | `/api/categories` | Categories |
| GET | `/api/cart` | Cart for default user |
| POST | `/api/cart/add` | `{ productId, quantity }` |
| PUT | `/api/cart/update` | `{ cartItemId, quantity }` |
| DELETE | `/api/cart/remove/:itemId` | Remove line |
| POST | `/api/orders` | `{ addressId }` — place order, clears cart |
| GET | `/api/orders` | Order history |
| GET | `/api/orders/:id` | Order detail |
| GET | `/api/address` | Addresses |
| POST | `/api/address` | Create address |

## SQL seed (optional)

- **Recommended:** `npm run db:seed` runs **`backend/prisma/seed.js`** (24 products, 5 categories, demo user, address, empty cart).
- **`backend/prisma/seed.sql`** resets tables and inserts categories + user `id=1`; run **`db:seed`** afterward for full product data, or extend the SQL file with your own `INSERT`s.
- To snapshot data as SQL: `pg_dump --data-only your_db > backup.sql`.


## License

Piulee Mukharjeev/ Developer.
