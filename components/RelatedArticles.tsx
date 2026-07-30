import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleMeta } from "@/types/article";

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="Related articles" className="border-t border-border pt-10">
      <h2 className="mb-6 font-headline text-2xl text-text-primary">Related Stories</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} aspect="4/3" />
        ))}
      </div>
    </section>
  );
}
