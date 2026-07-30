import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Legal</span>
      <h1 className="mt-2 font-headline text-4xl text-text-primary">Privacy Policy</h1>
      <div className="prose-article mt-8">
        <p>
          This Privacy Policy explains how {SITE_NAME} handles information when you visit our
          website. This is placeholder policy language for demonstration purposes.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect basic usage information, such as pages visited and general location
          data, to help us understand readership and improve our coverage. If you subscribe to
          our newsletter, we collect the email address you provide.
        </p>
        <h2>How We Use Information</h2>
        <p>
          Information collected is used solely to operate and improve {SITE_NAME} and to deliver
          newsletter content to subscribers who opt in.
        </p>
        <h2>Your Choices</h2>
        <p>
          You may unsubscribe from our newsletter at any time. Contact us with any questions about
          this policy.
        </p>
      </div>
    </div>
  );
}
