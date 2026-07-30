import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Corrections",
  description: `Corrections to ${SITE_NAME} coverage.`,
  alternates: { canonical: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
        Corrections
      </span>
      <h1 className="mt-2 font-headline text-4xl text-text-primary">Corrections</h1>
      <div className="prose-article mt-8">
        <p>
          {SITE_NAME} is committed to accuracy and transparency. When we make an error, we
          correct it and note the correction here.
        </p>
        <p>There are currently no corrections to report.</p>
        <p>
          To report a possible error, please visit our{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
}
