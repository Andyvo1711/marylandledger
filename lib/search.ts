import { getAllArticles } from "@/lib/articles";
import type { ArticleMeta } from "@/types/article";

export function searchArticles(query: string | undefined | null): ArticleMeta[] {
  const trimmed = (query ?? "").trim().toLowerCase();
  if (!trimmed) return [];

  return getAllArticles().filter((article) => {
    const haystacks = [
      article.title,
      article.excerpt,
      article.category,
      article.author,
      ...(article.tags ?? []),
    ];

    return haystacks.some((field) => field && field.toLowerCase().includes(trimmed));
  });
}
