"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section aria-label="Newsletter signup" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface px-8 py-12 md:flex-row md:items-center md:justify-between md:px-14">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-accent">
              <Mail size={18} aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest">Newsletter</span>
            </div>
            <h2 className="font-headline text-2xl text-text-primary md:text-3xl">
              Start Your Day with Maryland
            </h2>
            <p className="mt-3 text-sm text-text-secondary md:text-base">
              Get Maryland&apos;s top stories, local updates, travel ideas, and lifestyle features
              delivered to your inbox.
            </p>
          </div>

          <div className="w-full shrink-0 md:w-auto md:min-w-[360px]">
            {submitted ? (
              <p className="text-sm text-accent">
                Thanks for subscribing — look for Maryland Ledger in your inbox soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full flex-1 rounded-lg border border-border bg-surface-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg border border-accent bg-transparent px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-text-secondary">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
