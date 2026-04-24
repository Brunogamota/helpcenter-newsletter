import Link from "next/link";
import {
  Rocket,
  CreditCard,
  ShoppingCart,
  RefreshCw,
  Webhook,
  GitBranch,
  Shield,
  BarChart3,
} from "lucide-react";
import type { Category } from "@/types/help-center";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Rocket,
  CreditCard,
  ShoppingCart,
  RefreshCw,
  Webhook,
  GitBranch,
  Shield,
  BarChart3,
};

interface CategoryCardProps {
  category: Category;
  articleCount?: number;
}

export function CategoryCard({ category, articleCount }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Rocket;

  return (
    <Link
      href={`/ajuda/${category.slug}`}
      className="group block p-5 bg-[#1c1920] border border-[#2a2730] hover:border-[#f72662]/40 hover:bg-[#1f1c24] transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 bg-[#211e26] border border-[#2a2730] flex items-center justify-center shrink-0 group-hover:border-[#f72662]/30 group-hover:bg-[#261e25] transition-all">
          <Icon size={16} className="text-[#f72662]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#f0eff2] text-sm mb-1 group-hover:text-white transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-[#5a5763] leading-relaxed line-clamp-2">
            {category.description}
          </p>
          {articleCount !== undefined && (
            <p className="text-[10px] text-[#3a3645] mt-2 uppercase tracking-wider">
              {articleCount} {articleCount === 1 ? "artigo" : "artigos"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
