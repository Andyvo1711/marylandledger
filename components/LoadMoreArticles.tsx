"use client";

import { useState } from "react";
import { HorizontalArticleCard } from "@/components/HorizontalArticleCard";
import type { ArticleMeta } from "@/types/article";

interface LoadMoreArticlesProps {
  articles: ArticleMeta[];
  pageSize?: number;
}

export function LoadMoreArticles({ articles, pageSize = 6 }: LoadMoreArticlesProps) {
  const [visible, setVisible] = useState(pageSize);

  if (articles.length === 0) return null;

  const shown = articles.slice(0, visible);
  const hasMore = visible < articles.length;

  return (
    <div>
      <div className="flex flex-col">
        {shown.map((article) => (
          <HorizontalArticleCard key={article.slug} article={article} showExcerpt />
        ))}
      </div>
      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((current) => current + pageSize)}
            className="rounded-lg border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
}
