"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { SITE_NAME } from "@/lib/utils";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchModal } from "@/components/SearchModal";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="font-headline text-2xl tracking-tight text-text-primary md:text-3xl">
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="rounded-full p-2 text-text-secondary transition-colors hover:text-accent"
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-text-secondary transition-colors hover:text-accent md:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="no-scrollbar mx-auto hidden max-w-[1400px] items-center gap-7 overflow-x-auto border-t border-border px-6 py-2.5 text-sm font-medium text-text-secondary md:flex md:px-10"
      >
        <Link
          href="/"
          className={`shrink-0 border-b-2 pb-2 pt-1 transition-colors ${
            pathname === "/"
              ? "border-accent text-accent"
              : "border-transparent hover:text-text-primary"
          }`}
        >
          Home
        </Link>
        {CATEGORIES.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={category.slug}
              href={href}
              className={`shrink-0 border-b-2 pb-2 pt-1 transition-colors ${
                active ? "border-accent text-accent" : "border-transparent hover:text-text-primary"
              }`}
            >
              {category.label}
            </Link>
          );
        })}
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
