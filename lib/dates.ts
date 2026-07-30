const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateString(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

export function formatArticleDate(value: string | undefined | null): string {
  if (!isValidDateString(value)) return "Date unavailable";

  const parsed = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function formatShortDate(value: string | undefined | null): string {
  if (!isValidDateString(value)) return "Date unavailable";

  const parsed = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function toIsoDateTime(value: string | undefined | null): string | undefined {
  if (!isValidDateString(value)) return undefined;
  return `${value}T00:00:00.000Z`;
}
