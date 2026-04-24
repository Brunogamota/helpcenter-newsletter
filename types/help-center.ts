export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  excerpt: string;
  content: string;
  author: Author;
  updatedAt: string;
  tags: string[];
  isFeatured: boolean;
  readingTime?: number;
}

export interface Author {
  name: string;
  role: string;
}

export interface SearchResult {
  article: Article;
  category: Category;
  matchType: "title" | "excerpt" | "content" | "tag";
}
