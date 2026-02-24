# CarTransport

**Live demo:** [car-transport-app-mosaab.vercel.app](https://car-transport-app-mosaab.vercel.app/)

A full-stack web application for **vehicle logistics and car transport** services in Germany and Europe. It provides a modern landing page with a pricing calculator, contact form, and legal pages (privacy, terms, imprint). The frontend is built with Next.js; the backend offers a REST API for route-based price estimates.

---

## Project structure

```
CarTransport/
├── Workspace/
│   ├── client/                    # Next.js 16 frontend (React 19)
│   │   └── src/
│   │       ├── app/
│   │       │   ├── app.js         # Central export: all page components
│   │       │   ├── home.js        # Home page
│   │       │   ├── [[...slug]]/
│   │       │   │   └── page.js    # Single route handler: /, /contact, /privacy, /terms, /imprint
│   │       │   ├── contact/       # contact.js, contact.css
│   │       │   ├── privacy/       # privacy.js
│   │       │   ├── terms/         # terms.js
│   │       │   ├── imprint/       # imprint.js
│   │       │   ├── api/           # contact + estimate API routes
│   │       │   ├── layout.js
│   │       │   ├── globals.css, legal.css, structuredData.js
│   │       │   └── ...
│   │       ├── components/
│   │       ├── layout/
│   │       ├── Section/
│   │       └── helpers/
│   └── server/                    # FastAPI backend (Python)
│       ├── main.py
│       └── requirements.txt
├── .gitignore
└── README.md
```

- **client**: Next.js App Router. One route file `[[...slug]]/page.js` serves `/`, `/contact`, `/privacy`, `/terms`, `/imprint`; all page components are exported from `app.js`. Per-page logic lives in `contact/contact.js`, `contact/contact.css`, `privacy/privacy.js`, etc. Global and legal CSS in `app/`.
- **server**: FastAPI app: geocodes pickup/dropoff, computes distance (OSRM), returns a simple price estimate.

---

## Prerequisites

- **Node.js** 18+ and **npm** (or yarn/pnpm) for the client
- **Python** 3.10+ for the server (virtual environment recommended)

---

## Setup and run

### Client (Next.js)

```bash
cd Workspace/client
npm install
npm run dev
```

The app is served at [http://localhost:3000](http://localhost:3000) by default.

### Server (FastAPI)

```bash
cd Workspace/server
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at [http://localhost:8000](http://localhost:8000). Docs: [http://localhost:8000/docs](http://localhost:8000/docs).

Ensure the client is configured to call the backend (e.g. `NEXT_PUBLIC_API_URL` or equivalent) so the pricing calculator and contact/estimate flows work.

---

## Main features

- **Landing page** (`/`): Hero, trust bar, services, process flow, pricing calculator, join-team CTA
- **Pricing calculator**: Pickup and dropoff inputs; calls backend `/api/estimate` for distance and price
- **Contact** (`/contact`): Form plus WhatsApp/phone links; form submits to `/api/contact`
- **Legal**: Privacy (`/privacy`), terms (`/terms`), imprint (`/imprint`) with metadata
- **SEO**: Metadata and structured data (`structuredData.js`) in layout

---

## Configuration

- **Client**: Use `.env.local` for `NEXT_PUBLIC_SITE_URL` and any API base URL your app uses. Copy `.env.example` for Resend (contact form). Optional: `NEXT_PUBLIC_API_BASE_URL` to point the calculator at the Python backend instead of the built-in Next.js API route.
- **Server**: CORS is set for `http://localhost:3000`; adjust in `main.py` for other origins.

---

## Project quality & cleanup

**High-level / professional**

- Single route entry (`[[...slug]]/page.js`) and central page exports (`app.js`) keep routing and page wiring in one place.
- Per-route logic in named files (`contact.js`, `contact.css`, `privacy.js`, etc.) with shared `legal.css` and `globals.css`.
- API routes in `app/api/` (contact with Resend, estimate with Nominatim/OSRM). Contact route validates input and escapes HTML; estimate returns structured errors.
- SEO: `metadata` and `generateMetadata`, `metadataBase`, JSON-LD in layout via `structuredData.js`.
- Env: `.env.example` documents required vars; `.env*` is gitignored at repo root.

**Config files**

- `next.config.mjs`, `postcss.config.mjs`, `eslint.config.mjs`: **Keep.** `.mjs` is the standard ESM extension for config when the package is not `"type": "module"`. No need to rename or remove.

**Optional cleanup**

- **Unused dependencies**: `clsx` and `tailwind-merge` are in `package.json` but not used in the codebase. To slim the client: remove them and run `npm install`.
- **Duplicate .gitignore**: The repo has a root `.gitignore` (covers client + server). `Workspace/client/.gitignore` still exists; either rely on the root one or keep the client copy for client-only clones. Both are valid.

**Done in this pass**

- Server `main.py`: API title and user-agent aligned with the project name (CarTransport / AutoMove).

---

## License and credits

- Content and branding (e.g. AutoMove Logistik) are project-specific.
- Website credit can be kept in the footer (e.g. developer name/link) as desired.

This README is kept in English for a professional, internationally readable repository.
