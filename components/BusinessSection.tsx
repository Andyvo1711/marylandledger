import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { SectionHeader } from "@/components/SectionHeader";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface BusinessSectionProps {
  articles: ArticleMeta[];
}

const MARKET_SNAPSHOT = [
  { label: "Port of Baltimore Cargo", value: "+6.2%", note: "Q2 vs. prior year" },
  { label: "State Unemployment", value: "3.1%", note: "Below national average" },
  { label: "Biotech Sector Jobs", value: "+4.8%", note: "Year over year" },
  { label: "Hospitality Occupancy", value: "78%", note: "Statewide, July" },
];

export function BusinessSection({ articles }: BusinessSectionProps) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);

  return (
    <section aria-label="Business" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <SectionHeader eyebrow="Economy" title="Business" viewAllHref="/category/business" />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_0.9fr]">
          <Link href={`/article/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
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

          <div className="flex flex-col gap-6">
            {secondary.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
                <div className="flex flex-col gap-1.5 border-b border-border pb-5 last:border-b-0 last:pb-0">
                  <CategoryLabel category={article.category} asLink={false} />
                  <h4 className="font-headline text-base leading-snug text-text-primary group-hover:text-accent">
                    {article.title}
                  </h4>
                  <span className="text-xs text-text-secondary">{formatShortDate(article.date)}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Maryland Economy Snapshot
            </h4>
            <dl className="flex flex-col gap-4">
              {MARKET_SNAPSHOT.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <dt className="text-sm text-text-secondary">{item.label}</dt>
                    <dd className="text-[11px] text-text-secondary/70">{item.note}</dd>
                  </div>
                  <dd className="shrink-0 font-headline text-lg text-text-primary">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
