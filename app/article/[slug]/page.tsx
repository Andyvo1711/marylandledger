import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import {
  getAdjacentArticles,
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { buildArticleMetadata } from "@/lib/metadata";
import { formatArticleDate, toIsoDateTime } from "@/lib/dates";
import { getSiteUrl, SITE_NAME } from "@/lib/utils";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Newsletter } from "@/components/Newsletter";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getRelatedArticles(article, 4);
  const { previous, next } = getAdjacentArticles(article.slug);
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/article/${article.slug}`;
  const publishedTime = toIsoDateTime(article.date);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: [{ "@type": "Person", name: article.author }],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${siteUrl}/placeholder-image.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      category
        ? {
            "@type": "ListItem",
            position: 2,
            name: category.label,
            item: `${siteUrl}/category/${category.slug}`,
          }
        : undefined,
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ].filter(Boolean),
  };

  return (
    <article className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6 pt-12 md:px-0">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-text-secondary">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {category ? (
            <>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <Link href={`/category/${category.slug}`} className="hover:text-accent">
                {category.label}
              </Link>
            </>
          ) : null}
        </nav>

        <CategoryLabel category={article.category} />
        <h1 className="mt-3 font-headline text-3xl leading-tight text-text-primary md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt ? (
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">{article.excerpt}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <span className="text-text-primary">{article.author}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{formatArticleDate(article.date)}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              {article.readingTime} min read
            </span>
          </div>
          <ShareButtons url={articleUrl} title={article.title} />
        </div>
      </div>

      <div className="relative mx-auto mt-8 aspect-video w-full max-w-5xl overflow-hidden md:rounded-xl">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 md:px-0">
        <div
          className="prose-article mt-10"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {article.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/article/${previous.slug}`}
              className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent"
            >
              <ArrowLeft size={15} aria-hidden="true" className="shrink-0" />
              <span className="line-clamp-2">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/article/${next.slug}`}
              className="group flex items-center justify-end gap-2 text-right text-sm text-text-secondary hover:text-accent"
            >
              <span className="line-clamp-2">{next.title}</span>
              <ArrowRight size={15} aria-hidden="true" className="shrink-0" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10">
        <RelatedArticles articles={related} />
      </div>

      <div className="mt-16">
        <Newsletter />
      </div>
    </article>
  );
}
