import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Article, Category } from "@/types/help-center";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  category?: Category;
  variant?: "default" | "compact" | "featured";
}

export function ArticleCard({
  article,
  category,
  variant = "default",
}: ArticleCardProps) {
  const href = `/ajuda/${article.categorySlug}/${article.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex items-start gap-3 py-3 border-b border-[#2a2730] last:border-0 hover:text-[#f72662] transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#f0eff2] group-hover:text-white font-medium leading-snug">
            {article.title}
          </p>
          {article.updatedAt && (
            <p className="text-xs text-[#5a5763] mt-1">{formatDate(article.updatedAt)}</p>
          )}
        </div>
        <ArrowUpRight
          size={13}
          className="text-[#3a3645] group-hover:text-[#f72662] transition-colors shrink-0 mt-0.5"
        />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group block p-5 bg-[#1c1920] border border-[#2a2730] hover:border-[#f72662]/40 hover:bg-[#1f1c24] transition-all duration-200"
      >
        {category && (
          <p className="text-[10px] uppercase tracking-widest text-[#f72662] mb-2.5 font-medium">
            {category.name}
          </p>
        )}
        <h3 className="font-semibold text-[#f0eff2] text-sm mb-2 group-hover:text-white leading-snug">
          {article.title}
        </h3>
        <p className="text-xs text-[#5a5763] leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3">
          {article.readingTime && (
            <span className="flex items-center gap-1 text-[10px] text-[#3a3645]">
              <Clock size={10} />
              {article.readingTime} min
            </span>
          )}
          <span className="text-[10px] text-[#3a3645]">{formatDate(article.updatedAt)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-4 p-4 bg-[#1c1920] border border-[#2a2730] hover:border-[#f72662]/40 hover:bg-[#1f1c24] transition-all duration-200"
    >
      <div className="flex-1 min-w-0">
        {category && (
          <p className="text-[10px] uppercase tracking-widest text-[#f72662] mb-1.5 font-medium">
            {category.name}
          </p>
        )}
        <h3 className="font-medium text-[#f0eff2] text-sm mb-1 group-hover:text-white leading-snug">
          {article.title}
        </h3>
        <p className="text-xs text-[#5a5763] leading-relaxed line-clamp-1">
          {article.excerpt}
        </p>
      </div>
      <ArrowUpRight
        size={14}
        className="text-[#3a3645] group-hover:text-[#f72662] transition-colors shrink-0 mt-0.5"
      />
    </Link>
  );
}
