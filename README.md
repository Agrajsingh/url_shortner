# URL Shortener (Backend + Frontend)
A full‑stack URL shortener application with authentication, custom slugs, and redirect support. Backend is built with Node.js/Express + MongoDB. Frontend is a React app powered by Vite and Tailwind CSS.

---

## Features
- **Shorten URLs** with random nanoid slugs
- **Custom slugs** (scaffolded)
- **Auth**: register, login, logout, and get current user (JWT + cookies)
- **Redirects** from short codes to full URLs
- **MongoDB** persistence via Mongoose
- **CORS** configured for local dev ports: 5173/5174
- **Type: module** ES modules across backend and frontend

---

## Tech Stack
- **Backend**: Node.js, Express 5, Mongoose 8, JWT, bcryptjs, cookie-parser, CORS, dotenv
- **Frontend**: React 19, Vite 6, Tailwind CSS 4, TanStack Router, TanStack Query, Redux Toolkit
- **Database**: MongoDB

---

## Monorepo Structure
```
URL_SHORTNER-master/
├─ BACKEND/
│  ├─ app.js
│  ├─ package.json
│  └─ src/
│     ├─ config/monogo.config.js
│     ├─ controller/
│     ├─ dao/
│     ├─ middleware/
│     ├─ models/
│     ├─ routes/
│     └─ utils/
└─ FRONTEND/
   ├─ index.html
   ├─ package.json
   └─ src/
```

---

## Environment Variables
Backend `.env` (not committed; see .gitignore):
```
MONGO_URI=mongodb://localhost:27017/url-shortner
APP_URL=http://localhost:3000/
JWT_SECRET=replace-with-a-strong-secret
```
Notes:
- `APP_URL` is used to prefix the returned shortened URL (e.g., http://localhost:3000/abc123).
- If secrets were previously committed, rotate `JWT_SECRET` and any other compromised credentials.

Frontend env:
- No explicit `import.meta.env` usage detected. If you introduce API base URLs, prefer `VITE_API_URL` in a `.env` at `FRONTEND/.env` (kept out of git).

---

## Getting Started

### Prerequisites
- Node.js LTS (>=18)
- npm
- Local MongoDB running on default port (or update `MONGO_URI`)

### 1) Clone & Install
```bash
# from repo root
npm install --prefix BACKEND
npm install --prefix FRONTEND
```

### 2) Configure Env
- Create `BACKEND/.env` with values from the section above.
- Optionally create `FRONTEND/.env` if you introduce frontend env vars.

### 3) Run in Development
```bash
# Terminal 1: Backend
npm run dev --prefix BACKEND
# Server: http://localhost:3000

# Terminal 2: Frontend
npm run dev --prefix FRONTEND
# Vite dev server: http://localhost:5173 (or 5174)
```
CORS is allowed for:
- http://localhost:5173
- http://127.0.0.1:5173
- http://localhost:5174
- http://127.0.0.1:5174

---

## API Reference (Backend)
Base URL: `http://localhost:3000`

- POST `/api/create`
  - Body: `{ "url": "https://example.com", "slug"?: "optional-custom" }`
  - Response: `{ "shortUrl": "http://localhost:3000/<slug>" }`

- GET `/:id`
  - Redirects to the original full URL.

- Auth routes (`/api/auth`)
  - POST `/register` — Register a user
  - POST `/login` — Login user (sets auth cookie)
  - POST `/logout` — Logout user (clears cookie)
  - GET `/me` — Get current user (requires auth)

- User routes (`/api/user`)
  - See controller/route files for details

Error handling:
- Central error handler returns structured errors; unknown origins rejected by CORS.

---

## Scripts
Backend scripts (run with `--prefix BACKEND` from repo root):
- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend with node

Frontend scripts (run with `--prefix FRONTEND` from repo root):
- `npm run dev` — Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Lint frontend code

---

## Deployment Notes
- Ensure `APP_URL` reflects your public backend URL (e.g., `https://api.example.com/`).
- Whitelist your frontend origins in the backend CORS config (see `app.js`).
- Provide production `MONGO_URI` and rotate `JWT_SECRET`.
- Consider reverse proxying with Nginx and enabling HTTPS.

---

## Security
- Secrets are ignored by git via `.gitignore`.
- If any secrets were previously committed, rotate them and optionally purge from history (e.g., `git filter-repo` or BFG).

---

## Contribution
1. Fork the repo and create a feature branch
2. Commit with conventional messages (e.g., `feat: ...`, `fix: ...`)
3. Open a PR with a clear description

---

## License
Add your preferred license (MIT recommended) or a `LICENSE` file.
