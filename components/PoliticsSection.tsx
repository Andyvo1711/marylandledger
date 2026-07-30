import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { SectionHeader } from "@/components/SectionHeader";
import { HorizontalArticleCard } from "@/components/HorizontalArticleCard";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface PoliticsSectionProps {
  articles: ArticleMeta[];
}

export function PoliticsSection({ articles }: PoliticsSectionProps) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 4);

  return (
    <section aria-label="Politics" className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
      <SectionHeader eyebrow="Statehouse" title="Politics" viewAllHref="/category/politics" />
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Link href={`/article/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <CategoryLabel category={featured.category} asLink={false} />
              <h3 className="font-headline text-2xl leading-snug text-text-primary group-hover:text-accent">
                {featured.title}
              </h3>
              {featured.excerpt ? (
                <p className="text-sm text-text-secondary">{featured.excerpt}</p>
              ) : null}
              <span className="text-xs text-text-secondary">{formatShortDate(featured.date)}</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col">
          {secondary.map((article) => (
            <HorizontalArticleCard key={article.slug} article={article} showImage={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
