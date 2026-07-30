import type { Metadata } from "next";
import { searchArticles } from "@/lib/search";
import { SearchForm } from "@/components/SearchForm";
import { SearchResultRow } from "@/components/SearchResultRow";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Maryland Ledger for stories across news, politics, business, lifestyle, travel, beauty & wellness, sports, and opinion.",
  alternates: { canonical: "/search" },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchArticles(query) : [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Search</span>
      <h1 className="mt-2 font-headline text-3xl text-text-primary md:text-4xl">
        Search Maryland Ledger
      </h1>

      <div className="mt-8">
        <SearchForm defaultValue={query} />
      </div>

      <div className="mt-10">
        {!query ? (
          <p className="text-text-secondary">
            Enter a keyword to search Maryland Ledger stories, topics, and tags.
          </p>
        ) : results.length === 0 ? (
          <p className="text-text-secondary">
            No stories matched &ldquo;{query}&rdquo;. Try a different keyword or browse a category.
          </p>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-secondary">
              {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
            </p>
            <div className="flex flex-col">
              {results.map((article) => (
                <SearchResultRow key={article.slug} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
