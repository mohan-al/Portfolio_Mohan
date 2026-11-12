# Vercel Deployment Checklist

Follow these steps to deploy and verify the portfolio on Vercel:

- [ ] **1. Replace Resume PDF (Privacy Gate)**
  - Swap `public/resume.pdf` (and `Assets/Mohan_Resume.pdf`) with your redacted resume before pushing or deploying.

- [ ] **2. Push to GitHub**
  - Create a repository on GitHub and push the `main` branch.
  - Confirm `.env.local` is not tracked (`git status` should remain clean).

- [ ] **3. Import in Vercel**
  - Open [vercel.com](https://vercel.com) → **Add New Project** → select your GitHub repository.
  - Keep the **Next.js** framework preset (`npm run build` runs `next build --webpack`).

- [ ] **4. Set the Environment Variable**
  - `NEXT_PUBLIC_SITE_URL`: Temporary placeholder `https://mohan-al.vercel.app` (updated in step 5 once Vercel assigns your URL).

- [ ] **5. Redeploy After First `.vercel.app` URL Is Assigned**
  - Copy the live production domain Vercel assigned (e.g. `https://your-project.vercel.app`).
  - Update `NEXT_PUBLIC_SITE_URL` in **Project Settings → Environment Variables** to that exact `https://...` URL.
  - Trigger **Redeploy** so `canonical`, `sitemap.xml`, `robots.txt`, Open Graph tags, and JSON-LD reflect the live URL.

- [ ] **6. Post-Deploy Verification**
  - [ ] Open `/resume.pdf` and verify your redacted PDF downloads cleanly.
  - [ ] Open `/sitemap.xml` and `/robots.txt` and confirm both resolve with your live `NEXT_PUBLIC_SITE_URL`.
  - [ ] Test the Contact section actions (`Email Me` mailto link, `Copy email` toast, social links, and `Download Resume`).
  - [ ] Check the Open Graph preview using your live URL (e.g., LinkedIn Post Inspector or opengraph.xyz) to verify `/images/mohan-hero.jpg` and metadata render properly.
