import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#2a2730] bg-[#161419] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 bg-[#f72662] flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="font-semibold text-sm text-[#f0eff2]">Reborn</span>
            </div>
            <p className="text-xs text-[#5a5763] leading-relaxed">
              Infraestrutura de pagamentos para operações de alto volume.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#5a5763] mb-4">Help Center</p>
            <ul className="space-y-2.5">
              {[
                { label: "Primeiros Passos", href: "/ajuda/primeiros-passos" },
                { label: "Pagamentos", href: "/ajuda/pagamentos" },
                { label: "Assinaturas", href: "/ajuda/assinaturas" },
                { label: "Antifraude", href: "/ajuda/antifraude" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#5a5763] hover:text-[#9d9aa6] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#5a5763] mb-4">Desenvolvedores</p>
            <ul className="space-y-2.5">
              {[
                { label: "API Reference", href: "/ajuda/webhooks-api" },
                { label: "Webhooks", href: "/ajuda/webhooks-api/configurando-webhooks" },
                { label: "SDKs", href: "/ajuda/webhooks-api" },
                { label: "Changelog", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#5a5763] hover:text-[#9d9aa6] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#5a5763] mb-4">Suporte</p>
            <ul className="space-y-2.5">
              {[
                { label: "Abrir ticket", href: "#" },
                { label: "Status da plataforma", href: "#" },
                { label: "Contato comercial", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#5a5763] hover:text-[#9d9aa6] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2730] mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-[#5a5763]">
            © {new Date().getFullYear()} Reborn Infraestrutura de Pagamentos. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#5a5763]">
            CNPJ 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
}
