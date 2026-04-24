"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchArticles } from "@/lib/search";
import type { SearchResult } from "@/types/help-center";
import Link from "next/link";

export function HelpCenterHero() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchArticles(query).slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ajuda/busca?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const showDropdown = focused && (query.length >= 2);

  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#f72662 1px, transparent 1px), linear-gradient(90deg, #f72662 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f72662] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#2a2730] bg-[#1c1920] mb-6">
          <span className="w-1.5 h-1.5 bg-[#f72662] animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-[#9d9aa6] font-medium">
            Central de Ajuda
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-[#f0eff2] leading-[1.1] tracking-tight mb-4">
          Como podemos
          <br />
          <span className="text-[#f72662]">te ajudar?</span>
        </h1>

        <p className="text-base text-[#9d9aa6] mb-10 max-w-xl mx-auto leading-relaxed">
          Documentação técnica, guias de integração e referências de API
          para operar com a Reborn.
        </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5763] pointer-events-none"
              />
              <input
                type="text"
                placeholder="Buscar artigos, guias, referências..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                className="w-full h-12 pl-11 pr-24 bg-[#1c1920] border border-[#2a2730] text-[#f0eff2] placeholder-[#5a5763] text-sm outline-none focus:border-[#f72662]/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-5 bg-[#f72662] text-white text-sm font-medium hover:bg-[#ff3d73] transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Inline results dropdown */}
          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 bg-[#1c1920] border border-[#2a2730] border-t-0 shadow-xl">
              {results.map((r) => (
                <Link
                  key={r.article.id}
                  href={`/ajuda/${r.category.slug}/${r.article.slug}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-[#211e26] transition-colors border-b border-[#2a2730] last:border-0"
                >
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-[#f72662] mb-0.5">
                      {r.category.name}
                    </p>
                    <p className="text-sm text-[#f0eff2] truncate">{r.article.title}</p>
                  </div>
                </Link>
              ))}
              {query.length >= 2 && (
                <button
                  onClick={handleSubmit as unknown as React.MouseEventHandler}
                  className="w-full px-4 py-2.5 text-xs text-[#9d9aa6] hover:text-[#f0eff2] hover:bg-[#211e26] text-left transition-colors"
                >
                  Ver todos os resultados para &ldquo;{query}&rdquo; →
                </button>
              )}
            </div>
          )}

          {showDropdown && query.length >= 2 && results.length === 0 && (
            <div className="absolute top-full left-0 right-0 z-10 bg-[#1c1920] border border-[#2a2730] border-t-0 px-4 py-5 text-center">
              <p className="text-sm text-[#5a5763]">
                Nenhum resultado para &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-5">
          {["Pix", "Webhook", "Assinatura", "Split", "Antifraude"].map((s) => (
            <Link
              key={s}
              href={`/ajuda/busca?q=${s.toLowerCase()}`}
              className="text-xs text-[#5a5763] hover:text-[#9d9aa6] transition-colors"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
