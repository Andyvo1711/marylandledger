import { NextResponse } from "next/server";
import { searchArticles } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const results = searchArticles(query);

  return NextResponse.json({
    query: query.trim(),
    count: results.length,
    results: results.map((article) => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      category: article.category,
      date: article.date,
      image: article.image,
    })),
  });
}
