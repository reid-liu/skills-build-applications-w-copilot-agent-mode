# OctoFit Tracker

## Stack

- Frontend: React 19, Vite, Bootstrap, and React Router on port `5173`.
- Backend: Node.js LTS, Express, and TypeScript on port `8000`.
- Database: MongoDB with Mongoose, using `octofit_db` on port `27017`.

## Development

Run all commands from the repository root. Use Node.js LTS supported by Vite
(Node.js 22.12 or newer).

```bash
npm install --prefix octofit-tracker/backend
npm install --prefix octofit-tracker/frontend
```

Ensure MongoDB is running before starting the backend:

```bash
ps aux | grep mongod
```

The default connection is `mongodb://localhost:27017/octofit_db`.
Set `MONGODB_URI` in the environment to override it.

Run each tier in its own terminal:

```bash
npm run dev --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/frontend
```

Open <http://localhost:5173>. Vite proxies `/api` requests to the backend.
In Codespaces, open the forwarded port `5173`; the backend logs its
Codespaces-aware URL using `CODESPACE_NAME`. Keep MongoDB port `27017` private.
The frontend fails if port `5173` is busy instead of selecting another port.

## Validation

```bash
npm run build --prefix octofit-tracker/backend
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
curl --fail http://localhost:8000/api/health
curl --fail http://localhost:5173/api/health
```

After building, `npm start --prefix octofit-tracker/backend` runs the compiled
API. `npm run preview --prefix octofit-tracker/frontend` previews the frontend
build on port `5173`; stop the frontend dev server first. For production hosting,
configure the web server to forward `/api` to the backend.

This initialization provides the project foundation and a database health
endpoint. Domain models, authentication, and application screens are not yet
implemented. The existing seed script remains a placeholder.