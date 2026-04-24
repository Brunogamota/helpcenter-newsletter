import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/help-center/Breadcrumb";
import { ArticleSidebar } from "@/components/help-center/ArticleSidebar";
import { RelatedArticles } from "@/components/help-center/RelatedArticles";
import { FeedbackBlock } from "@/components/help-center/FeedbackBlock";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import {
  getArticleBySlug,
  getArticlesByCategory,
  getRelatedArticles,
  articles,
} from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";
import { Clock, CalendarDays, MessageSquare } from "lucide-react";

interface Props {
  params: Promise<{ categoria: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params;
  const article = getArticleBySlug(categoria, slug);
  if (!article) return {};
  const category = getCategoryBySlug(categoria);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      section: category?.name,
      publishedTime: article.updatedAt,
    },
  };
}

export function generateStaticParams() {
  return articles.map((a) => ({
    categoria: a.categorySlug,
    slug: a.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { categoria, slug } = await params;
  const article = getArticleBySlug(categoria, slug);
  if (!article) notFound();

  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(categoria);
  const related = getRelatedArticles(article);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Help Center", href: "/ajuda" },
          { label: category.name, href: `/ajuda/${category.slug}` },
          { label: article.title },
        ]}
      />

      <div className="mt-8 flex gap-12 lg:gap-16">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <ArticleSidebar
            articles={categoryArticles}
            currentArticle={article}
            category={category}
          />
        </div>

        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-2xl">
          {/* Article header */}
          <header className="mb-10 pb-8 border-b border-[#2a2730]">
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#f72662] font-medium">
                {category.name}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f0eff2] tracking-tight leading-[1.1] mb-4">
              {article.title}
            </h1>
            <p className="text-base text-[#9d9aa6] leading-relaxed mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1c1920] border border-[#2a2730] flex items-center justify-center">
                  <span className="text-[10px] text-[#f72662] font-bold">
                    {article.author.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#9d9aa6]">
                    {article.author.name}
                  </p>
                </div>
              </div>

              <span className="text-[#2a2730]">·</span>

              <span className="flex items-center gap-1.5 text-xs text-[#5a5763]">
                <CalendarDays size={12} />
                Atualizado em {formatDate(article.updatedAt)}
              </span>

              {article.readingTime && (
                <>
                  <span className="text-[#2a2730]">·</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#5a5763]">
                    <Clock size={12} />
                    {article.readingTime} min de leitura
                  </span>
                </>
              )}
            </div>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] bg-[#1c1920] border border-[#2a2730] text-[#5a5763] uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article content */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Feedback */}
          <div className="mt-12 pt-8 border-t border-[#2a2730]">
            <FeedbackBlock />
          </div>

          {/* Support CTA */}
          <div className="mt-6 p-5 border border-[#2a2730] bg-[#1c1920]">
            <div className="flex items-start gap-3">
              <MessageSquare size={14} className="text-[#f72662] mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#f0eff2] mb-1">
                  Ainda com dúvidas?
                </p>
                <p className="text-xs text-[#5a5763] mb-3">
                  Nossa equipe de suporte técnico responde em até 2 horas.
                </p>
                <a
                  href="#suporte"
                  className="inline-block text-xs font-medium text-[#f72662] hover:text-[#ff3d73] transition-colors"
                >
                  Falar com suporte →
                </a>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#2a2730]">
              <RelatedArticles articles={related} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
