import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface OpinionSectionProps {
  articles: ArticleMeta[];
}

export function OpinionSection({ articles }: OpinionSectionProps) {
  if (articles.length === 0) return null;
  const items = articles.slice(0, 4);

  return (
    <section aria-label="Opinion" className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
      <SectionHeader
        eyebrow="Editorial"
        title="Opinion"
        viewAllHref="/category/opinion"
        description="Editorials, commentary, and guest columns from Maryland voices."
      />
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {items.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group flex flex-col gap-3 border-t border-border pt-6"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Opinion
            </span>
            <h3 className="font-headline text-xl leading-snug text-text-primary group-hover:text-accent md:text-2xl">
              {article.title}
            </h3>
            {article.excerpt ? (
              <p className="text-sm text-text-secondary">{article.excerpt}</p>
            ) : null}
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span>{article.author}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{formatShortDate(article.date)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
