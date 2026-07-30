import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Legal</span>
      <h1 className="mt-2 font-headline text-4xl text-text-primary">Terms of Use</h1>
      <div className="prose-article mt-8">
        <p>
          By accessing {SITE_NAME}, you agree to the following terms. This is placeholder terms
          language for demonstration purposes.
        </p>
        <h2>Content Use</h2>
        <p>
          Content published on {SITE_NAME} is intended for personal, non-commercial use.
          Reproduction of articles in full without permission is not permitted.
        </p>
        <h2>Accuracy</h2>
        <p>
          We strive for accuracy in all published content and issue corrections when errors are
          identified. See our Corrections and Editorial Standards pages for more information.
        </p>
        <h2>Changes</h2>
        <p>These terms may be updated periodically without prior notice.</p>
      </div>
    </div>
  );
}
