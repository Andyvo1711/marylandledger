import Link from "next/link";
import { getCategory } from "@/lib/categories";

interface CategoryLabelProps {
  category: string;
  className?: string;
  /** Set to false when this label is nested inside another <Link>, to avoid invalid nested anchors. */
  asLink?: boolean;
}

export function CategoryLabel({ category, className = "", asLink = true }: CategoryLabelProps) {
  const config = getCategory(category);
  const label = config?.label ?? category;
  const classes = `text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-accent-hover ${className}`;

  if (!asLink) {
    return <span className={classes}>{label}</span>;
  }

  return (
    <Link href={`/category/${category}`} className={classes}>
      {label}
    </Link>
  );
}
