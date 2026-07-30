import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { SITE_NAME } from "@/lib/utils";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Editorial Standards", href: "/editorial-standards" },
  { label: "Corrections", href: "/corrections" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-headline text-2xl text-text-primary">{SITE_NAME}</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Maryland&apos;s Stories. Every Day. Independent local coverage of news, politics,
              business, and life across the state of Maryland.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Maryland Ledger on Facebook"
                className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <Facebook size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Maryland Ledger on Instagram"
                className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Maryland Ledger on Twitter"
                className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <Twitter size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Search
            </h3>
            <p className="text-sm text-text-secondary">
              Looking for a specific story?{" "}
              <Link href="/search" className="text-accent hover:text-accent-hover">
                Search Maryland Ledger
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-secondary md:flex-row md:items-center">
          <span>&copy; {year} {SITE_NAME}. All rights reserved.</span>
          <span>Maryland&apos;s Stories. Every Day.</span>
        </div>
      </div>
    </footer>
  );
}
