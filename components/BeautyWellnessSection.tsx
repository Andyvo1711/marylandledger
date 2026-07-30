import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { SectionHeader } from "@/components/SectionHeader";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface BeautyWellnessSectionProps {
  articles: ArticleMeta[];
}

export function BeautyWellnessSection({ articles }: BeautyWellnessSectionProps) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;
  const smaller = rest.slice(0, 4);

  return (
    <section aria-label="Beauty and Wellness" className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
      <SectionHeader
        eyebrow="Local Business"
        title="Beauty & Wellness"
        viewAllHref="/category/beauty-wellness"
        description="Salons, spas, fitness studios, and the wellness businesses Maryland readers trust."
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Link href={`/article/${featured.slug}`} className="group block">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <SafeImage
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
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

        <div className="grid grid-cols-2 gap-5">
          {smaller.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <SafeImage
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2.5 flex flex-col gap-1">
                <CategoryLabel category={article.category} asLink={false} />
                <h4 className="font-headline text-sm leading-snug text-text-primary group-hover:text-accent md:text-base">
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
