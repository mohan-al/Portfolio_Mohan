const DEFAULT_VERCEL_FALLBACK = "https://mohan-al.vercel.app";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }
  const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prodUrl) {
    return `https://${prodUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }
  const previewUrl = process.env.VERCEL_URL?.trim();
  if (previewUrl) {
    return `https://${previewUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }
  return DEFAULT_VERCEL_FALLBACK;
}
