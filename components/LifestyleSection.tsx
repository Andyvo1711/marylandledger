import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleMeta } from "@/types/article";

interface LifestyleSectionProps {
  articles: ArticleMeta[];
}

export function LifestyleSection({ articles }: LifestyleSectionProps) {
  if (articles.length === 0) return null;
  const items = articles.slice(0, 5);

  return (
    <section aria-label="Lifestyle" className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
      <SectionHeader
        eyebrow="Living"
        title="Lifestyle"
        viewAllHref="/category/lifestyle"
        description="Food, family, culture, and community across Maryland."
      />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {items[0] ? (
          <div className="col-span-2 row-span-2">
            <ArticleCard article={items[0]} aspect="4/3" />
          </div>
        ) : null}
        {items.slice(1).map((article, index) => (
          <div key={article.slug} className={index === 0 ? "col-span-2 md:col-span-2" : ""}>
            <ArticleCard article={article} aspect="1/1" />
          </div>
        ))}
      </div>
    </section>
  );
}
