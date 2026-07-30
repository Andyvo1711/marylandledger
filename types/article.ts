export const CATEGORY_SLUGS = [
  "news",
  "politics",
  "business",
  "lifestyle",
  "travel",
  "beauty-wellness",
  "sports",
  "opinion",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  author: string;
  image: string;
  featured: boolean;
  breaking: boolean;
  tags: string[];
}

export interface ArticleMeta extends ArticleFrontmatter {
  filePath: string;
  readingTime: number;
}

export interface Article extends ArticleMeta {
  rawContent: string;
  contentHtml: string;
}
