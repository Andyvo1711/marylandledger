import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, viewAllHref, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-4">
      <div>
        {eyebrow ? (
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-headline text-2xl text-text-primary md:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-text-secondary md:text-base">{description}</p>
        ) : null}
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
        >
          View All
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
