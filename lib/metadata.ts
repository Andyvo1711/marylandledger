import type { Metadata } from "next";
import { getSiteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/utils";
import { toIsoDateTime } from "@/lib/dates";
import type { ArticleMeta } from "@/types/article";

export function buildBaseMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${SITE_NAME} — ${SITE_TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Maryland Ledger delivers daily news, politics, business, lifestyle, travel, and sports coverage from across the state of Maryland.",
    keywords: [
      "Maryland news",
      "Baltimore news",
      "Annapolis news",
      "Maryland politics",
      "Maryland business",
      "Maryland travel",
    ],
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description:
        "Maryland Ledger delivers daily news, politics, business, lifestyle, travel, and sports coverage from across the state of Maryland.",
      url: siteUrl,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description:
        "Maryland Ledger delivers daily news, politics, business, lifestyle, travel, and sports coverage from across the state of Maryland.",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function buildArticleMetadata(article: ArticleMeta): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/article/${article.slug}`;
  const publishedTime = toIsoDateTime(article.date);

  return {
    title: article.title,
    description: article.excerpt || `Read ${article.title} on ${SITE_NAME}.`,
    keywords: article.tags,
    authors: [{ name: article.author }],
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: article.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export function buildCategoryMetadata(label: string, description: string, slug: string): Metadata {
  const url = `/category/${slug}`;

  return {
    title: label,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${label} | ${SITE_NAME}`,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} | ${SITE_NAME}`,
      description,
    },
  };
}
