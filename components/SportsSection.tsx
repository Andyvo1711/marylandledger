import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { SectionHeader } from "@/components/SectionHeader";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface SportsSectionProps {
  articles: ArticleMeta[];
}

export function SportsSection({ articles }: SportsSectionProps) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);

  return (
    <section aria-label="Sports" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <SectionHeader eyebrow="Game Day" title="Sports" viewAllHref="/category/sports" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Link href={`/article/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                <CategoryLabel category={featured.category} asLink={false} />
                <h3 className="font-headline text-2xl leading-tight text-white md:text-3xl">
                  {featured.title}
                </h3>
              </div>
            </div>
          </Link>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group flex gap-4">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg md:w-28">
                  <SafeImage
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <CategoryLabel category={article.category} asLink={false} />
                  <h4 className="font-headline text-base leading-snug text-text-primary group-hover:text-accent">
                    {article.title}
                  </h4>
                  <span className="text-xs text-text-secondary">{formatShortDate(article.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
