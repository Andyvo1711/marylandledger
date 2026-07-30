import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { formatShortDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface ArticleCardProps {
  article: ArticleMeta;
  aspect?: "4/3" | "1/1" | "16/9";
  className?: string;
}

const ASPECT_CLASS: Record<string, string> = {
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
};

export function ArticleCard({ article, aspect = "4/3", className = "" }: ArticleCardProps) {
  return (
    <article
      className={`group rounded-xl border border-border bg-surface transition-colors hover:border-accent/60 ${className}`}
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div className={`relative w-full overflow-hidden rounded-t-xl ${ASPECT_CLASS[aspect]}`}>
          <SafeImage
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 85vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <CategoryLabel category={article.category} asLink={false} />
          <h3 className="font-headline text-lg leading-snug text-text-primary group-hover:text-accent">
            {article.title}
          </h3>
          <span className="text-xs text-text-secondary">{formatShortDate(article.date)}</span>
        </div>
      </Link>
    </article>
  );
}
