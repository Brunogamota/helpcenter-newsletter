import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { HelpCenterHero } from "@/components/help-center/HelpCenterHero";
import { CategoryCard } from "@/components/help-center/CategoryCard";
import { ArticleCard } from "@/components/help-center/ArticleCard";
import { categories } from "@/lib/data/categories";
import { articles, getFeaturedArticles, getRecentArticles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Documentação técnica, guias de integração e referências de API para operar com a Reborn.",
};

export default function HelpCenterHome() {
  const featured = getFeaturedArticles();
  const recent = getRecentArticles(6);

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    articleCount: articles.filter((a) => a.categorySlug === cat.slug).length,
  }));

  return (
    <>
      <HelpCenterHero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-[#f0eff2] tracking-tight mb-1">
              Categorias
            </h2>
            <p className="text-sm text-[#5a5763]">
              Encontre exatamente o que precisa
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categoriesWithCount.map((cat) => (
            <CategoryCard key={cat.id} category={cat} articleCount={cat.articleCount} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="border-t border-[#2a2730] pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-[#f0eff2] tracking-tight mb-1">
                Artigos em destaque
              </h2>
              <p className="text-sm text-[#5a5763]">
                Os guias mais relevantes para sua operação
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featured.map((article) => {
              const category = categories.find(
                (c) => c.slug === article.categorySlug
              );
              return (
                <ArticleCard
                  key={article.id}
                  article={article}
                  category={category}
                  variant="featured"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="border-t border-[#2a2730] pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-[#f0eff2] tracking-tight mb-1">
                Atualizados recentemente
              </h2>
              <p className="text-sm text-[#5a5763]">
                Documentação sempre em dia
              </p>
            </div>
            <Link
              href="/ajuda/pagamentos"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#9d9aa6] hover:text-[#f72662] transition-colors"
            >
              Ver todos
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recent.map((article) => {
              const category = categories.find(
                (c) => c.slug === article.categorySlug
              );
              return (
                <ArticleCard
                  key={article.id}
                  article={article}
                  category={category}
                  variant="default"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section
        id="suporte"
        className="max-w-7xl mx-auto px-6 pb-24"
      >
        <div className="border border-[#2a2730] bg-[#1c1920] p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={14} className="text-[#f72662]" />
                <span className="text-xs uppercase tracking-widest text-[#f72662] font-medium">
                  Suporte direto
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#f0eff2] tracking-tight mb-2">
                Não encontrou o que precisava?
              </h2>
              <p className="text-sm text-[#9d9aa6] max-w-lg leading-relaxed">
                Nossa equipe técnica está disponível para ajudar com
                integrações, dúvidas operacionais e problemas de conta. Tempo
                médio de resposta: 2h.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#"
                className="px-5 py-2.5 text-sm font-medium bg-[#f72662] text-white hover:bg-[#ff3d73] transition-colors"
              >
                Abrir ticket
              </a>
              <a
                href="#"
                className="px-5 py-2.5 text-sm font-medium border border-[#2a2730] text-[#9d9aa6] hover:border-[#3a3645] hover:text-[#f0eff2] transition-all"
              >
                Ver status
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
