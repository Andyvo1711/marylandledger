import { CATEGORY_SLUGS, type CategorySlug } from "@/types/article";

export interface CategoryConfig {
  slug: CategorySlug;
  label: string;
  description: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "news",
    label: "News",
    description:
      "Breaking developments and everyday reporting from Baltimore, Annapolis, and every corner of Maryland.",
  },
  {
    slug: "politics",
    label: "Politics",
    description:
      "Statehouse coverage, election reporting, and analysis of the policy decisions shaping Maryland.",
  },
  {
    slug: "business",
    label: "Business",
    description:
      "Maryland's economy, from the Port of Baltimore to Main Street small businesses and the state's biotech corridor.",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    description:
      "Food, family, culture, and the everyday moments that define life across Maryland's communities.",
  },
  {
    slug: "travel",
    label: "Travel",
    description:
      "Weekend guides and destination features from the Chesapeake Bay to the Allegheny mountains.",
  },
  {
    slug: "beauty-wellness",
    label: "Beauty & Wellness",
    description:
      "Local salons, spas, fitness studios, and the wellness businesses Maryland readers trust.",
  },
  {
    slug: "sports",
    label: "Sports",
    description:
      "Ravens, Orioles, Terrapins, and the local teams and athletes representing Maryland.",
  },
  {
    slug: "opinion",
    label: "Opinion",
    description:
      "Editorials, commentary, and guest columns on the issues that matter to Maryland readers.",
  },
];

export const CATEGORY_MAP: Record<CategorySlug, CategoryConfig> = CATEGORIES.reduce(
  (acc, category) => {
    acc[category.slug] = category;
    return acc;
  },
  {} as Record<CategorySlug, CategoryConfig>
);

export function getCategory(slug: string): CategoryConfig | undefined {
  return CATEGORY_MAP[slug as CategorySlug];
}

export function isValidCategory(value: unknown): value is CategorySlug {
  return typeof value === "string" && (CATEGORY_SLUGS as readonly string[]).includes(value);
}
