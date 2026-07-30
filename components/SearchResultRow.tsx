import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface SearchResultRowProps {
  article: ArticleMeta;
}

export function SearchResultRow({ article }: SearchResultRowProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex items-start gap-4 border-b border-border py-5 first:pt-0"
    >
      <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg md:w-40">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <CategoryLabel category={article.category} asLink={false} />
        <h3 className="font-headline text-lg leading-snug text-text-primary group-hover:text-accent md:text-xl">
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className="hidden text-sm text-text-secondary md:block">{article.excerpt}</p>
        ) : null}
        <span className="text-xs text-text-secondary">{formatShortDate(article.date)}</span>
      </div>
    </Link>
  );
}
