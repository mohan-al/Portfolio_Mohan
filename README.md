# Mohan A L — Developer Portfolio

Single-page developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, featuring light/dark themes, accessible modals with system architecture diagrams, centralized content/flags, and a Resend-backed contact form.

> **TODO before going live:** Replace `public/resume.pdf` with your redacted PDF before deploying to production.

---

## Local Development

> **Recommended directory location:** Move this repository out of OneDrive (for example, to `C:\dev\portfolio`) for day-to-day development. OneDrive file syncing can lock or corrupt `node_modules` and `.next`, and non-ASCII folder segments in OneDrive paths can interfere with local bundler workers.

1. **Install dependencies**

   ```bash
   npm ci
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   - `NEXT_PUBLIC_SITE_URL`: Your deployed URL (e.g., `https://mohan-al.vercel.app`) for canonical tags, Open Graph, sitemap, and JSON-LD.
   - `RESEND_API_KEY`: Optional locally; when omitted, `/api/contact` returns `503` gracefully and the UI shows a direct `mailto:` fallback button.
   - `CONTACT_TO_EMAIL`: Recipient inbox read only on the server (`process.env.CONTACT_TO_EMAIL`).
   - `CONTACT_FROM_EMAIL`: Sender address in Resend (defaults to `Portfolio Contact <onboarding@resend.dev>`). Note: Resend's `onboarding@resend.dev` sandbox sender only delivers to the Resend account owner's email address, so `CONTACT_TO_EMAIL` must match that address until you verify a custom domain.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

4. **Verify quality gates**

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

   Both `npm run dev` and `npm run build` pass `--webpack` consistently for local Windows and Vercel builds.

---

## Content & Feature Flags (`data/content.ts`)

All copy, links, projects, skills, DSA stats, and visibility toggles live in `data/content.ts`:

- `showEmployerBadge` (`true` / `false`): Controls visibility of the `"Joining Wind River as Associate Engineer, July 2027"` badge.
- `showInstagram` (`true` / `false`): Toggles the Instagram link across Hero and Contact.
- `heroPhoto` / `aboutPhoto`: Swap the two references in `featureFlags` in one line.
- Project `githubUrl`, `demoUrl`, and `screenshot` fields are optional; leaving them empty hides unused action buttons cleanly and displays the factual architecture diagram instead.

---

## Contact Route Hardening (`app/api/contact/route.ts`)

- Enforces a **16 KB max request body size** (`413 Payload Too Large`), server-side field validation (including a **3,000-character max message length**), and a silent honeypot field (`website`).
- Uses an **in-memory IP rate limiter** (5 requests per 10 minutes, fail-safe on errors). Because serverless functions run across ephemeral, isolated instances, treat this limiter as **best-effort only** rather than a global store.
- Reads `CONTACT_TO_EMAIL` exclusively on the server and never includes it in API responses or client bundles.

---

## Deploying to Vercel

See [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) for the step-by-step launch checklist, or follow the summary below:

1. Push this repository to GitHub.
2. Import the project in [vercel.com](https://vercel.com) (Next.js preset; uses `npm run build`).
3. Set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in **Project Settings → Environment Variables**.
4. Deploy, copy your assigned `.vercel.app` URL into `NEXT_PUBLIC_SITE_URL`, and redeploy so canonical tags, Open Graph URLs, `sitemap.xml`, and JSON-LD match.
5. Later, when attaching a custom domain under **Settings → Domains**, update `NEXT_PUBLIC_SITE_URL`, verify the domain in Resend, update `CONTACT_FROM_EMAIL`, and redeploy.
