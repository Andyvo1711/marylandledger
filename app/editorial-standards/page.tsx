import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: `Editorial standards and practices at ${SITE_NAME}.`,
  alternates: { canonical: "/editorial-standards" },
};

export default function EditorialStandardsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        Editorial Standards
      </span>
      <h1 className="mt-2 font-headline text-4xl text-text-primary">
        How We Report the News
      </h1>
      <div className="prose-article mt-8">
        <p>
          {SITE_NAME} is committed to accurate, fair, and clearly labeled journalism. These
          standards guide our newsroom practices.
        </p>
        <h2>News vs. Opinion</h2>
        <p>
          News reporting and opinion content are clearly separated. Opinion pieces, including
          editorials and guest columns, are labeled as such and reflect the views of the author
          or editorial board, not necessarily the newsroom as a whole.
        </p>
        <h2>Sourcing</h2>
        <p>
          We aim to attribute information to named sources whenever possible and to provide
          appropriate context for statements and claims included in our reporting.
        </p>
        <h2>Corrections</h2>
        <p>
          When errors are identified, we correct them promptly and transparently. See our
          Corrections page for recent updates.
        </p>
      </div>
    </div>
  );
}
