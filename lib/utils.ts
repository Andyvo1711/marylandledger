export const SITE_NAME = "Maryland Ledger";
export const SITE_TAGLINE = "Maryland's Stories. Every Day.";
export const PLACEHOLDER_IMAGE = "/placeholder-image.svg";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function safeImage(value: string | undefined | null): string {
  if (!value || typeof value !== "string" || value.trim().length === 0) {
    return PLACEHOLDER_IMAGE;
  }
  return value;
}

export function calculateReadingTime(content: string | undefined | null): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
