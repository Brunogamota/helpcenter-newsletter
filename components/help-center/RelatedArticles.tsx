import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/types/help-center";
import { categories } from "@/lib/data/categories";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-[#5a5763] mb-4">
        Artigos relacionados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {articles.map((article) => {
          const category = categories.find(
            (c) => c.slug === article.categorySlug
          );
          return (
            <Link
              key={article.id}
              href={`/ajuda/${article.categorySlug}/${article.slug}`}
              className="group p-4 bg-[#1c1920] border border-[#2a2730] hover:border-[#f72662]/40 hover:bg-[#1f1c24] transition-all"
            >
              {category && (
                <p className="text-[10px] uppercase tracking-widest text-[#f72662] mb-1.5 font-medium">
                  {category.name}
                </p>
              )}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-[#f0eff2] group-hover:text-white leading-snug">
                  {article.title}
                </h3>
                <ArrowUpRight
                  size={13}
                  className="text-[#3a3645] group-hover:text-[#f72662] transition-colors shrink-0 mt-0.5"
                />
              </div>
              <p className="text-xs text-[#5a5763] mt-1.5 line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
