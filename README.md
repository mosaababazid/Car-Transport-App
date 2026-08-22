# CarTransport

**Live demo:** [car-transport-app-mosaab.vercel.app](https://car-transport-app-mosaab.vercel.app/)

A full-stack web application for **vehicle logistics and car transport** services in Germany and Europe. It provides a modern landing page with a pricing calculator, contact form, and legal pages (privacy, terms, imprint). The entire application runs on Next.js, including its API routes.

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
├── .gitignore
└── README.md
```

- **client**: Next.js App Router. One route file `[[...slug]]/page.js` serves `/`, `/contact`, `/privacy`, `/terms`, `/imprint`; all page components are exported from `app.js`. Per-page logic lives in `contact/contact.js`, `contact/contact.css`, `privacy/privacy.js`, etc. Global and legal CSS in `app/`.
- **API routes**: Next.js server routes for contact submissions and route-based price estimates.

---

## Prerequisites

- **Node.js** 18+ and **npm** (or yarn/pnpm)

---

## Setup and run

### Client (Next.js)

```bash
cd Workspace/client
npm install
npm run dev
```

The app is served at [http://localhost:3000](http://localhost:3000) by default.

---

## Main features

- **Landing page** (`/`): Hero, trust bar, services, process flow, pricing calculator, join-team CTA
- **Pricing calculator**: Pickup and dropoff inputs; calls the Next.js `/api/estimate` route for distance and price
- **Contact** (`/contact`): Form plus WhatsApp/phone links; form submits to `/api/contact`
- **Legal**: Privacy (`/privacy`), terms (`/terms`), imprint (`/imprint`) with metadata
- **SEO**: Metadata and structured data (`structuredData.js`) in layout

---

## Configuration

- **Client**: Use `.env.local` for `NEXT_PUBLIC_SITE_URL` and the Resend/contact form variables. Copy `.env.example` as a starting point.

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

- Estimate and contact APIs run directly as Next.js App Router route handlers.

---

## License and credits

- Content and branding (e.g. luxordrive Logistik) are project-specific.
- Website credit can be kept in the footer (e.g. developer name/link) as desired.

This README is kept in English for a professional, internationally readable repository.
