import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { buildCategoryMetadata } from "@/lib/metadata";
import { SafeImage } from "@/components/SafeImage";
import { CategoryLabel } from "@/components/CategoryLabel";
import { ArticleCard } from "@/components/ArticleCard";
import { LoadMoreArticles } from "@/components/LoadMoreArticles";
import { formatShortDate } from "@/lib/dates";
import type { CategorySlug } from "@/types/article";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildCategoryMetadata(category.label, category.description, category.slug);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <CategoryHeader category={category} />
        <p className="mt-10 text-text-secondary">
          No stories have been published in this category yet.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
      <CategoryHeader category={category} />
      <CategoryBody categorySlug={category.slug} featured={featured} rest={rest} />
    </div>
  );
}

function CategoryHeader({ category }: { category: { label: string; description: string; slug: string } }) {
  return (
    <div className="mb-10 border-b border-border pb-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Section</span>
      <h1 className="mt-2 font-headline text-3xl text-text-primary md:text-4xl">{category.label}</h1>
      <p className="mt-3 max-w-2xl text-sm text-text-secondary md:text-base">{category.description}</p>
      <Link
        href="/search"
        className="mt-4 inline-block text-sm text-text-secondary underline underline-offset-4 hover:text-accent"
      >
        Search all stories
      </Link>
    </div>
  );
}

function CategoryBody({
  categorySlug,
  featured,
  rest,
}: {
  categorySlug: CategorySlug;
  featured: ReturnType<typeof getArticlesByCategory>[number];
  rest: ReturnType<typeof getArticlesByCategory>;
}) {
  if (categorySlug === "opinion") {
    return (
      <div>
        <FeaturedMinimal article={featured} />
        <LoadMoreArticles articles={rest} pageSize={6} />
      </div>
    );
  }

  if (categorySlug === "travel" || categorySlug === "sports") {
    return (
      <div>
        <FeaturedPanoramic article={featured} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((article) => (
            <ArticleCard key={article.slug} article={article} aspect="4/3" />
          ))}
        </div>
        <div className="mt-8">
          <LoadMoreArticles articles={rest.slice(6)} pageSize={6} />
        </div>
      </div>
    );
  }

  if (categorySlug === "lifestyle" || categorySlug === "beauty-wellness") {
    return (
      <div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[featured, ...rest.slice(0, 5)].map((article) => (
            <ArticleCard key={article.slug} article={article} aspect="1/1" />
          ))}
        </div>
        <div className="mt-8">
          <LoadMoreArticles articles={rest.slice(5)} pageSize={6} />
        </div>
      </div>
    );
  }

  // news, politics, business — split feature + list
  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <FeaturedStandard article={featured} />
      <LoadMoreArticles articles={rest} pageSize={6} />
    </div>
  );
}

function FeaturedStandard({ article }: { article: ReturnType<typeof getArticlesByCategory>[number] }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <CategoryLabel category={article.category} asLink={false} />
        <h2 className="font-headline text-2xl leading-snug text-text-primary group-hover:text-accent md:text-3xl">
          {article.title}
        </h2>
        {article.excerpt ? <p className="text-sm text-text-secondary md:text-base">{article.excerpt}</p> : null}
        <span className="text-xs text-text-secondary">{formatShortDate(article.date)}</span>
      </div>
    </Link>
  );
}

function FeaturedPanoramic({ article }: { article: ReturnType<typeof getArticlesByCategory>[number] }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
        <SafeImage
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-10">
          <CategoryLabel category={article.category} asLink={false} />
          <h2 className="max-w-3xl font-headline text-2xl leading-tight text-white md:text-4xl">
            {article.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

function FeaturedMinimal({ article }: { article: ReturnType<typeof getArticlesByCategory>[number] }) {
  return (
    <Link href={`/article/${article.slug}`} className="group mb-10 block max-w-3xl border-b border-border pb-8">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Editorial</span>
      <h2 className="mt-3 font-headline text-3xl leading-tight text-text-primary group-hover:text-accent md:text-4xl">
        {article.title}
      </h2>
      {article.excerpt ? (
        <p className="mt-4 text-base text-text-secondary md:text-lg">{article.excerpt}</p>
      ) : null}
      <div className="mt-4 flex items-center gap-3 text-sm text-text-secondary">
        <span>{article.author}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{formatShortDate(article.date)}</span>
      </div>
    </Link>
  );
}
