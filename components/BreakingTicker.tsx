import Link from "next/link";
import type { ArticleMeta } from "@/types/article";

interface BreakingTickerProps {
  articles: ArticleMeta[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (articles.length === 0) return null;

  const items = [...articles, ...articles];

  return (
    <div className="overflow-hidden border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1400px] items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-surface-secondary px-4 py-2.5 md:px-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Breaking
          </span>
        </div>
        <div className="no-scrollbar flex flex-1 items-center overflow-x-auto py-2.5">
          <div className="flex animate-[scroll_32s_linear_infinite] items-center gap-10 whitespace-nowrap pl-6 pr-6 motion-reduce:animate-none">
            {items.map((article, index) => (
              <Link
                key={`${article.slug}-${index}`}
                href={`/article/${article.slug}`}
                className="text-sm text-text-primary transition-colors hover:text-accent"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
