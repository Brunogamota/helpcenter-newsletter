"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronRight } from "lucide-react";
import { searchArticles } from "@/lib/search";
import type { SearchResult } from "@/types/help-center";
import { useRouter } from "next/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchArticles(query).slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      router.push(`/ajuda/busca?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleResultClick(result: SearchResult) {
    setOpen(false);
    router.push(`/ajuda/${result.category.slug}/${result.article.slug}`);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2730] bg-[#161419]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 bg-[#f72662] flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">R</span>
              </div>
              <span className="font-semibold text-[#f0eff2] text-sm tracking-tight">
                Reborn
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/ajuda"
                className="text-sm text-[#9d9aa6] hover:text-[#f0eff2] transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/ajuda/webhooks-api/configurando-webhooks"
                className="text-sm text-[#9d9aa6] hover:text-[#f0eff2] transition-colors"
              >
                API Docs
              </Link>
              <Link
                href="/ajuda/primeiros-passos/como-criar-e-ativar-sua-conta"
                className="text-sm text-[#9d9aa6] hover:text-[#f0eff2] transition-colors"
              >
                Guia Rápido
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="hidden md:flex items-center gap-2.5 h-8 px-3 bg-[#1c1920] border border-[#2a2730] text-[#5a5763] text-sm hover:border-[#3a3645] hover:text-[#9d9aa6] transition-all"
            >
              <Search size={13} />
              <span>Buscar...</span>
              <span className="ml-2 text-xs bg-[#2a2730] px-1.5 py-0.5 text-[#5a5763]">
                ⌘K
              </span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 text-[#9d9aa6] hover:text-[#f0eff2] transition-colors"
            >
              <Search size={16} />
            </button>
            <a
              href="#suporte"
              className="hidden sm:block text-sm font-medium text-[#f72662] hover:text-[#ff3d73] transition-colors"
            >
              Suporte
            </a>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-2xl bg-[#1c1920] border border-[#2a2730] shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2a2730]">
                <Search size={16} className="text-[#5a5763] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar artigos, guias e referências..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[#f0eff2] placeholder-[#5a5763] text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 text-[#5a5763] hover:text-[#9d9aa6] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </form>

            {results.length > 0 && (
              <ul className="py-1.5 max-h-[60vh] overflow-y-auto">
                {results.map((r) => (
                  <li key={r.article.id}>
                    <button
                      onClick={() => handleResultClick(r)}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#211e26] transition-colors text-left group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] uppercase tracking-widest text-[#f72662] font-medium">
                            {r.category.name}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[#f0eff2] truncate">
                          {r.article.title}
                        </p>
                        <p className="text-xs text-[#5a5763] mt-0.5 line-clamp-1">
                          {r.article.excerpt}
                        </p>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-[#5a5763] group-hover:text-[#9d9aa6] mt-1 shrink-0"
                      />
                    </button>
                  </li>
                ))}
                {query.length >= 2 && (
                  <li className="border-t border-[#2a2730] mt-1.5 pt-1.5">
                    <button
                      onClick={handleSubmit as unknown as React.MouseEventHandler}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-[#9d9aa6] hover:text-[#f0eff2] hover:bg-[#211e26] transition-colors text-left"
                    >
                      <Search size={12} />
                      Ver todos os resultados para &ldquo;{query}&rdquo;
                    </button>
                  </li>
                )}
              </ul>
            )}

            {query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-[#5a5763]">
                  Nenhum resultado para &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {query.length < 2 && (
              <div className="px-4 py-4">
                <p className="text-xs text-[#5a5763] mb-3 uppercase tracking-wider">
                  Sugestões
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Pix", "Webhooks", "Assinatura", "Chargeback", "Split"].map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-2.5 py-1 text-xs bg-[#211e26] border border-[#2a2730] text-[#9d9aa6] hover:border-[#f72662] hover:text-[#f72662] transition-colors"
                      >
                        {s}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
