"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

interface SearchFormProps {
  defaultValue?: string;
}

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-border pb-3">
      <Search size={20} className="text-accent" aria-hidden="true" />
      <label htmlFor="search-page-input" className="sr-only">
        Search Maryland Ledger
      </label>
      <input
        id="search-page-input"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search stories, topics, or tags…"
        className="w-full bg-transparent font-headline text-xl text-text-primary placeholder:text-text-secondary focus:outline-none md:text-2xl"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Search
      </button>
    </form>
  );
}
