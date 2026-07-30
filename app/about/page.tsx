import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_NAME}, Maryland's independent local news and editorial publication.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">About</span>
      <h1 className="mt-2 font-headline text-4xl text-text-primary">{SITE_NAME}</h1>
      <div className="prose-article mt-8">
        <p>
          {SITE_NAME} is an independent digital publication covering news, politics, business,
          lifestyle, travel, beauty and wellness, sports, and opinion from across the state of
          Maryland. Our mission is to deliver clear, credible, locally rooted journalism to
          readers in Baltimore, Annapolis, and every community in between.
        </p>
        <p>
          From the Chesapeake Bay waterfront to the mountains of Western Maryland, our coverage
          reflects the full range of communities that make up the state. We report on the issues
          that shape daily life for Maryland residents: local government, the state economy,
          neighborhood culture, and the businesses that serve Maryland communities.
        </p>
        <h2>Our Approach</h2>
        <p>
          {SITE_NAME} is built around clear, accessible reporting and editorial commentary. We
          separate news coverage from opinion and label commentary clearly, so readers always
          know what they&apos;re reading.
        </p>
      </div>
    </div>
  );
}
