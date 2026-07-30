import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { SectionHeader } from "@/components/SectionHeader";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface TravelFeatureProps {
  articles: ArticleMeta[];
}

export function TravelFeature({ articles }: TravelFeatureProps) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;
  const smaller = rest.slice(0, 3);

  return (
    <section aria-label="Travel" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <SectionHeader
          eyebrow="Getaways"
          title="Travel"
          viewAllHref="/category/travel"
          description="Weekend guides and destination features from the Bay to the mountains."
        />

        <Link href={`/article/${featured.slug}`} className="group block">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
            <SafeImage
              src={featured.image}
              alt={featured.title}
              fill
              priority={false}
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-10">
              <CategoryLabel category={featured.category} asLink={false} />
              <h3 className="max-w-2xl font-headline text-2xl leading-tight text-white md:text-4xl">
                {featured.title}
              </h3>
              {featured.excerpt ? (
                <p className="hidden max-w-xl text-sm text-white/80 md:block">{featured.excerpt}</p>
              ) : null}
            </div>
          </div>
        </Link>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {smaller.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <SafeImage
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex flex-col gap-1">
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
    </section>
  );
}
