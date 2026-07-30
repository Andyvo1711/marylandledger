"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleMeta } from "@/types/article";

interface LatestNewsRowProps {
  articles: ArticleMeta[];
}

export function LatestNewsRow({ articles }: LatestNewsRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (articles.length === 0) return null;

  return (
    <section aria-label="Latest news" className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
      <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-4">
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent">
            Latest
          </span>
          <h2 className="font-headline text-2xl text-text-primary md:text-3xl">Latest News</h2>
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-360)}
            aria-label="Scroll left"
            className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(360)}
            aria-label="Scroll right"
            className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {articles.map((article) => (
          <div key={article.slug} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[23%]">
            <ArticleCard article={article} aspect="4/3" />
          </div>
        ))}
      </div>
    </section>
  );
}
