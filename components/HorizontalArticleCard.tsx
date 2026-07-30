import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface HorizontalArticleCardProps {
  article: ArticleMeta;
  showImage?: boolean;
  showExcerpt?: boolean;
  divider?: boolean;
}

export function HorizontalArticleCard({
  article,
  showImage = true,
  showExcerpt = false,
  divider = true,
}: HorizontalArticleCardProps) {
  return (
    <article
      className={`flex items-start gap-4 py-5 ${divider ? "border-b border-border" : ""} first:pt-0 last:border-b-0`}
    >
      {showImage ? (
        <Link
          href={`/article/${article.slug}`}
          className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg md:w-36"
        >
          <SafeImage
            src={article.image}
            alt={article.title}
            fill
            sizes="150px"
            className="object-cover"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col gap-2">
        <CategoryLabel category={article.category} />
        <h3 className="font-headline text-lg leading-snug text-text-primary md:text-xl">
          <Link href={`/article/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && article.excerpt ? (
          <p className="hidden text-sm text-text-secondary md:block">{article.excerpt}</p>
        ) : null}
        <span className="text-xs text-text-secondary">{formatShortDate(article.date)}</span>
      </div>
    </article>
  );
}
