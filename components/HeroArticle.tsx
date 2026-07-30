import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { formatArticleDate } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

interface HeroArticleProps {
  article: ArticleMeta;
}

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <section aria-label="Featured story" className="border-b border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row">
        <div className="relative aspect-[16/9] w-full md:aspect-auto md:w-[60%]">
          <SafeImage
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-center gap-5 px-6 py-10 md:w-[40%] md:px-12 md:py-0">
          <CategoryLabel category={article.category} />
          <h1 className="font-headline text-3xl leading-[1.1] text-text-primary md:text-4xl lg:text-[2.75rem]">
            <Link href={`/article/${article.slug}`} className="hover:text-accent">
              {article.title}
            </Link>
          </h1>
          {article.excerpt ? (
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {article.excerpt}
            </p>
          ) : null}
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <span>{article.author}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{formatArticleDate(article.date)}</span>
          </div>
          <Link
            href={`/article/${article.slug}`}
            className="mt-2 inline-flex w-fit items-center gap-2 border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Read Article
          </Link>
        </div>
      </div>
    </section>
  );
}
