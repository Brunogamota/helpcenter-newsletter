"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { searchArticles, getSearchSnippet } from "@/lib/search";
import type { SearchResult } from "@/types/help-center";
import { Breadcrumb } from "@/components/help-center/Breadcrumb";
import { useRouter } from "next/navigation";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    setQuery(q);
    if (q.trim().length >= 2) {
      setResults(searchArticles(q));
    } else {
      setResults([]);
    }
  }, [q]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ajuda/busca?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Help Center", href: "/ajuda" },
          { label: "Busca" },
        ]}
      />

      <div className="mt-8 mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5763] pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artigos..."
            className="w-full h-11 pl-11 pr-24 bg-[#1c1920] border border-[#2a2730] text-[#f0eff2] placeholder-[#5a5763] text-sm outline-none focus:border-[#f72662]/50 transition-colors"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-5 bg-[#f72662] text-white text-sm font-medium hover:bg-[#ff3d73] transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {q && (
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-[#5a5763]">
            {results.length > 0 ? (
              <>
                <span className="text-[#f0eff2] font-medium">{results.length}</span>{" "}
                {results.length === 1 ? "resultado" : "resultados"} para{" "}
                <span className="text-[#f72662]">&ldquo;{q}&rdquo;</span>
              </>
            ) : (
              <>
                Nenhum resultado para{" "}
                <span className="text-[#f72662]">&ldquo;{q}&rdquo;</span>
              </>
            )}
          </p>
          <Link
            href="/ajuda"
            className="flex items-center gap-1.5 text-xs text-[#5a5763] hover:text-[#9d9aa6] transition-colors"
          >
            <ArrowLeft size={12} />
            Voltar
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r) => (
            <Link
              key={r.article.id}
              href={`/ajuda/${r.category.slug}/${r.article.slug}`}
              className="group block p-5 bg-[#1c1920] border border-[#2a2730] hover:border-[#f72662]/40 hover:bg-[#1f1c24] transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-[#f72662] mb-1.5 font-medium">
                    {r.category.name}
                  </p>
                  <h2 className="font-semibold text-[#f0eff2] text-sm mb-2 group-hover:text-white">
                    {r.article.title}
                  </h2>
                  <p className="text-xs text-[#5a5763] leading-relaxed">
                    {getSearchSnippet(r.article.content, q) || r.article.excerpt}
                  </p>
                  {r.article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {r.article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 text-[10px] bg-[#211e26] border border-[#2a2730] text-[#5a5763]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#3a3645] shrink-0 mt-0.5 group-hover:text-[#f72662] transition-colors">
                  {r.matchType === "title"
                    ? "título"
                    : r.matchType === "tag"
                    ? "tag"
                    : "conteúdo"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {q && results.length === 0 && q.trim().length >= 2 && (
        <div className="text-center py-16 border border-[#2a2730] bg-[#1c1920]">
          <p className="text-sm font-medium text-[#f0eff2] mb-2">
            Nenhum resultado encontrado
          </p>
          <p className="text-xs text-[#5a5763] mb-6">
            Tente termos diferentes ou navegue pelas categorias abaixo.
          </p>
          <Link
            href="/ajuda"
            className="inline-flex items-center gap-1.5 text-xs text-[#f72662] hover:text-[#ff3d73] transition-colors"
          >
            <ArrowLeft size={12} />
            Ver todas as categorias
          </Link>
        </div>
      )}

      {!q && (
        <div className="text-center py-16">
          <p className="text-sm text-[#5a5763]">
            Digite algo para buscar nos artigos.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}
