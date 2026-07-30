import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { HorizontalArticleCard } from "@/components/HorizontalArticleCard";
import type { ArticleMeta } from "@/types/article";

interface MarylandNewsSectionProps {
  articles: ArticleMeta[];
}

export function MarylandNewsSection({ articles }: MarylandNewsSectionProps) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  const secondary = rest.slice(0, 4);

  return (
    <section aria-label="Maryland News" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <SectionHeader eyebrow="Statewide" title="Maryland News" viewAllHref="/category/news" />
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <ArticleCard article={lead} aspect="16/9" />
          <div className="flex flex-col">
            {secondary.map((article) => (
              <HorizontalArticleCard key={article.slug} article={article} showImage={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
