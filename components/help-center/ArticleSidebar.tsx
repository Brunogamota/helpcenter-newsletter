import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Article, Category } from "@/types/help-center";

interface ArticleSidebarProps {
  articles: Article[];
  currentArticle: Article;
  category: Category;
}

export function ArticleSidebar({
  articles,
  currentArticle,
  category,
}: ArticleSidebarProps) {
  return (
    <aside className="w-56 shrink-0">
      <div className="sticky top-20">
        <Link
          href={`/ajuda/${category.slug}`}
          className="flex items-center gap-2 mb-4 group"
        >
          <span className="text-[10px] uppercase tracking-widest text-[#5a5763] group-hover:text-[#9d9aa6] transition-colors">
            {category.name}
          </span>
        </Link>

        <nav>
          <ul className="space-y-0.5">
            {articles.map((article) => {
              const isCurrent = article.id === currentArticle.id;
              return (
                <li key={article.id}>
                  <Link
                    href={`/ajuda/${category.slug}/${article.slug}`}
                    className={cn(
                      "flex items-start gap-2 py-2 px-2.5 text-xs leading-snug transition-all",
                      isCurrent
                        ? "bg-[#211e26] text-[#f0eff2] border-l-2 border-[#f72662]"
                        : "text-[#5a5763] hover:text-[#9d9aa6] hover:bg-[#1c1920] border-l-2 border-transparent"
                    )}
                  >
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
