import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the ${SITE_NAME} editorial team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</span>
      <h1 className="mt-2 font-headline text-4xl text-text-primary">Get in Touch</h1>
      <div className="prose-article mt-8">
        <p>
          We welcome story tips, corrections, and reader feedback. {SITE_NAME} covers communities
          across Maryland, and local tips help shape our reporting.
        </p>
        <h2>Editorial Inquiries</h2>
        <p>editorial@marylandledger.example</p>
        <h2>General Inquiries</h2>
        <p>hello@marylandledger.example</p>
        <h2>Story Tips &amp; Corrections</h2>
        <p>
          If you believe a story contains an error, please reach out with the article title and a
          description of the issue so our editorial team can review it promptly.
        </p>
      </div>
    </div>
  );
}
