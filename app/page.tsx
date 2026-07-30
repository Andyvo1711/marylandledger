import {
  getAllArticles,
  getArticlesByCategory,
  getBreakingArticles,
  getFeaturedArticles,
  getLatestArticles,
} from "@/lib/articles";
import { BreakingTicker } from "@/components/BreakingTicker";
import { HeroArticle } from "@/components/HeroArticle";
import { LatestNewsRow } from "@/components/LatestNewsRow";
import { MarylandNewsSection } from "@/components/MarylandNewsSection";
import { PoliticsSection } from "@/components/PoliticsSection";
import { BusinessSection } from "@/components/BusinessSection";
import { LifestyleSection } from "@/components/LifestyleSection";
import { TravelFeature } from "@/components/TravelFeature";
import { BeautyWellnessSection } from "@/components/BeautyWellnessSection";
import { SportsSection } from "@/components/SportsSection";
import { OpinionSection } from "@/components/OpinionSection";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  const allArticles = getAllArticles();
  const breaking = getBreakingArticles();
  const featured = getFeaturedArticles();
  const heroArticle = featured[0] ?? allArticles[0];

  const latest = getLatestArticles(10).filter((article) => article.slug !== heroArticle?.slug);

  const newsArticles = getArticlesByCategory("news");
  const politicsArticles = getArticlesByCategory("politics");
  const businessArticles = getArticlesByCategory("business");
  const lifestyleArticles = getArticlesByCategory("lifestyle");
  const travelArticles = getArticlesByCategory("travel");
  const beautyWellnessArticles = getArticlesByCategory("beauty-wellness");
  const sportsArticles = getArticlesByCategory("sports");
  const opinionArticles = getArticlesByCategory("opinion");

  if (!heroArticle) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center text-text-secondary">
        No articles are available yet. Add Markdown files to content/articles to get started.
      </div>
    );
  }

  return (
    <>
      <BreakingTicker articles={breaking} />
      <HeroArticle article={heroArticle} />
      <LatestNewsRow articles={latest} />
      <MarylandNewsSection articles={newsArticles} />
      <PoliticsSection articles={politicsArticles} />
      <BusinessSection articles={businessArticles} />
      <LifestyleSection articles={lifestyleArticles} />
      <TravelFeature articles={travelArticles} />
      <BeautyWellnessSection articles={beautyWellnessArticles} />
      <SportsSection articles={sportsArticles} />
      <OpinionSection articles={opinionArticles} />
      <Newsletter />
    </>
  );
}
