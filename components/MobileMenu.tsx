"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-surface px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="font-headline text-xl text-text-primary">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
          <Link
            href="/"
            onClick={onClose}
            className={`border-b border-border py-3 text-base font-medium transition-colors ${
              pathname === "/" ? "text-accent" : "text-text-primary hover:text-accent"
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
                onClick={onClose}
                className={`border-b border-border py-3 text-base font-medium transition-colors ${
                  active ? "text-accent" : "text-text-primary hover:text-accent"
                }`}
              >
                {category.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
