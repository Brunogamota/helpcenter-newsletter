import type { Article, Category, SearchResult } from "@/types/help-center";
import { articles } from "@/lib/data/articles";
import { categories } from "@/lib/data/categories";

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function searchArticles(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const q = normalize(query.trim());
  const results: SearchResult[] = [];
  const seen = new Set<string>();

  for (const article of articles) {
    if (seen.has(article.id)) continue;

    const category = categories.find((c) => c.slug === article.categorySlug);
    if (!category) continue;

    let matchType: SearchResult["matchType"] | null = null;

    if (normalize(article.title).includes(q)) {
      matchType = "title";
    } else if (normalize(article.excerpt).includes(q)) {
      matchType = "excerpt";
    } else if (article.tags.some((t) => normalize(t).includes(q))) {
      matchType = "tag";
    } else if (normalize(article.content).includes(q)) {
      matchType = "content";
    }

    if (matchType) {
      results.push({ article, category, matchType });
      seen.add(article.id);
    }
  }

  // Sort: title matches first, then excerpt/tag, then content
  return results.sort((a, b) => {
    const order = { title: 0, tag: 1, excerpt: 1, content: 2 };
    return order[a.matchType] - order[b.matchType];
  });
}

export function getSearchSnippet(content: string, query: string): string {
  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const q = normalize(query);
  const idx = normalize(plainText).indexOf(q);
  if (idx === -1) return plainText.slice(0, 140) + "...";
  const start = Math.max(0, idx - 60);
  const end = Math.min(plainText.length, idx + query.length + 80);
  return (start > 0 ? "..." : "") + plainText.slice(start, end) + (end < plainText.length ? "..." : "");
}
