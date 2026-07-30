"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    onClose();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 top-0 border-b border-border bg-surface px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <Search size={22} className="shrink-0 text-accent" aria-hidden="true" />
          <form onSubmit={handleSubmit} className="flex-1">
            <label htmlFor="site-search" className="sr-only">
              Search Maryland Ledger
            </label>
            <input
              id="site-search"
              type="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Maryland Ledger…"
              className="w-full border-b border-border bg-transparent pb-2 font-headline text-2xl text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none md:text-3xl"
            />
          </form>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
