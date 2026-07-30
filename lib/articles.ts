import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { isValidCategory } from "@/lib/categories";
import { isValidDateString } from "@/lib/dates";
import { calculateReadingTime, safeImage } from "@/lib/utils";
import type { Article, ArticleFrontmatter, ArticleMeta, CategorySlug } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isNonEmptyString);
}

interface ArticleCacheEntry {
  meta: ArticleMeta;
  rawContent: string;
}

let cachedEntries: ArticleCacheEntry[] | null = null;

function parseArticleFile(filePath: string): ArticleCacheEntry | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const filenameSlug = path.basename(filePath, ".md");

    if (
      !isNonEmptyString(data.title) ||
      !isNonEmptyString(data.slug) ||
      !isNonEmptyString(data.category) ||
      !isNonEmptyString(data.date)
    ) {
      console.warn(`Skipping article with missing required fields: ${filePath}`);
      return null;
    }

    if (data.slug !== filenameSlug) {
      console.warn(`Skipping article with slug/filename mismatch: ${filePath}`);
      return null;
    }

    if (!isValidCategory(data.category)) {
      console.warn(`Skipping article with invalid category: ${filePath}`);
      return null;
    }

    if (!isValidDateString(data.date)) {
      console.warn(`Skipping article with invalid date: ${filePath}`);
      return null;
    }

    if (!content || content.trim().length === 0) {
      console.warn(`Skipping article with empty body: ${filePath}`);
      return null;
    }

    const frontmatter: ArticleFrontmatter = {
      title: data.title,
      slug: data.slug,
      excerpt: isNonEmptyString(data.excerpt) ? data.excerpt : "",
      category: data.category as CategorySlug,
      date: data.date,
      author: isNonEmptyString(data.author) ? data.author : "Maryland Ledger Staff",
      image: safeImage(data.image),
      featured: data.featured === true,
      breaking: data.breaking === true,
      tags: normalizeTags(data.tags),
    };

    const meta: ArticleMeta = {
      ...frontmatter,
      filePath,
      readingTime: calculateReadingTime(content),
    };

    return { meta, rawContent: content };
  } catch (error) {
    console.warn(`Skipping unreadable article file: ${filePath}`, error);
    return null;
  }
}

function loadAllEntries(): ArticleCacheEntry[] {
  if (cachedEntries) return cachedEntries;

  if (!fs.existsSync(ARTICLES_DIR)) {
    cachedEntries = [];
    return cachedEntries;
  }

  const files = fs
    .readdirSync(ARTICLES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(ARTICLES_DIR, entry.name));

  const seenSlugs = new Set<string>();
  const entries: ArticleCacheEntry[] = [];

  for (const filePath of files) {
    const parsed = parseArticleFile(filePath);
    if (!parsed) continue;

    if (seenSlugs.has(parsed.meta.slug)) {
      console.warn(`Skipping article with duplicate slug: ${filePath}`);
      continue;
    }

    seenSlugs.add(parsed.meta.slug);
    entries.push(parsed);
  }

  entries.sort((a, b) => (a.meta.date < b.meta.date ? 1 : a.meta.date > b.meta.date ? -1 : 0));

  cachedEntries = entries;
  return entries;
}

export function getAllArticles(): ArticleMeta[] {
  return loadAllEntries().map((entry) => entry.meta);
}

export function getArticleBySlug(slug: string): Article | null {
  const entry = loadAllEntries().find((item) => item.meta.slug === slug);
  if (!entry) return null;

  const processed = remark().use(html).processSync(entry.rawContent);

  return {
    ...entry.meta,
    rawContent: entry.rawContent,
    contentHtml: processed.toString(),
  };
}

export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  if (!isValidCategory(category)) return [];
  return getAllArticles().filter((article) => article.category === category);
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((article) => article.featured);
}

export function getBreakingArticles(): ArticleMeta[] {
  return getAllArticles().filter((article) => article.breaking);
}

export function getLatestArticles(limit?: number): ArticleMeta[] {
  const all = getAllArticles();
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export function sortArticlesByDate(articles: ArticleMeta[]): ArticleMeta[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getRelatedArticles(article: ArticleMeta, limit = 4): ArticleMeta[] {
  const all = getAllArticles().filter((item) => item.slug !== article.slug);
  const sameCategory = all.filter((item) => item.category === article.category);
  const others = all.filter((item) => item.category !== article.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAdjacentArticles(slug: string): {
  previous: ArticleMeta | null;
  next: ArticleMeta | null;
} {
  const all = getAllArticles();
  const index = all.findIndex((item) => item.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
