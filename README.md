# Mohan A L — Developer Portfolio

Single-page developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, featuring light/dark themes, accessible modals with system architecture diagrams, centralized content/flags, and direct contact links.

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
- `showInstagram` (`true` / `false`): Toggles the Instagram link across Hero, Contact, and Footer.
- `heroPhoto` / `aboutPhoto`: Swap the two references in `featureFlags` in one line.
- Project `githubUrl`, `demoUrl`, and `screenshot` fields are optional; leaving them empty hides unused action buttons cleanly and displays the factual architecture diagram instead.

---

## Deploying to Vercel

See [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) for the step-by-step launch checklist, or follow the summary below:

1. Push this repository to GitHub.
2. Import the project in [vercel.com](https://vercel.com) (Next.js preset; uses `npm run build`).
3. Set `NEXT_PUBLIC_SITE_URL` in **Project Settings → Environment Variables**.
4. Deploy, copy your assigned `.vercel.app` URL into `NEXT_PUBLIC_SITE_URL`, and redeploy so canonical tags, Open Graph URLs, `sitemap.xml`, and JSON-LD match.
5. Later, when attaching a custom domain under **Settings → Domains**, update `NEXT_PUBLIC_SITE_URL` and redeploy.
