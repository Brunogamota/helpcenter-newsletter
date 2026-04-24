import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/help-center/Breadcrumb";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { getArticlesByCategory } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";
import {
  Rocket, CreditCard, ShoppingCart, RefreshCw,
  Webhook, GitBranch, Shield, BarChart3,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Rocket, CreditCard, ShoppingCart, RefreshCw, Webhook, GitBranch, Shield, BarChart3,
};

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const articleList = getArticlesByCategory(categoria).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const Icon = iconMap[category.icon] || Rocket;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Help Center", href: "/ajuda" },
          { label: category.name },
        ]}
      />

      {/* Category header */}
      <div className="mt-8 mb-12 pb-12 border-b border-[#2a2730]">
        <div className="flex items-start gap-5">
          <div className="w-11 h-11 bg-[#1c1920] border border-[#2a2730] flex items-center justify-center shrink-0">
            <Icon size={18} className="text-[#f72662]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#f0eff2] tracking-tight mb-2">
              {category.name}
            </h1>
            <p className="text-[#9d9aa6] text-base leading-relaxed max-w-xl">
              {category.description}
            </p>
            <p className="text-xs text-[#5a5763] mt-3">
              {articleList.length} {articleList.length === 1 ? "artigo" : "artigos"} nesta categoria
            </p>
          </div>
        </div>
      </div>

      {/* Article list */}
      {articleList.length > 0 ? (
        <div className="space-y-0">
          {articleList.map((article) => (
            <Link
              key={article.id}
              href={`/ajuda/${categoria}/${article.slug}`}
              className="group flex items-start justify-between gap-6 py-5 border-b border-[#2a2730] hover:border-[#f72662]/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-[#f0eff2] text-sm mb-1.5 group-hover:text-white transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-[#5a5763] leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-2.5">
                  {article.readingTime && (
                    <span className="flex items-center gap-1 text-[10px] text-[#3a3645]">
                      <Clock size={10} />
                      {article.readingTime} min de leitura
                    </span>
                  )}
                  <span className="text-[10px] text-[#3a3645]">
                    {formatDate(article.updatedAt)}
                  </span>
                  {article.isFeatured && (
                    <span className="text-[10px] text-[#f72662] uppercase tracking-wider">
                      Em destaque
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-[#3a3645] group-hover:text-[#f72662] transition-colors shrink-0 mt-0.5"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#5a5763] text-sm">
            Nenhum artigo nesta categoria ainda.
          </p>
        </div>
      )}

      {/* Other categories */}
      <div className="mt-16 pt-12 border-t border-[#2a2730]">
        <p className="text-xs uppercase tracking-widest text-[#5a5763] mb-5">
          Outras categorias
        </p>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== categoria)
            .map((c) => (
              <Link
                key={c.id}
                href={`/ajuda/${c.slug}`}
                className="px-3 py-1.5 text-xs border border-[#2a2730] text-[#9d9aa6] hover:border-[#f72662]/40 hover:text-[#f72662] transition-all bg-[#1c1920]"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
