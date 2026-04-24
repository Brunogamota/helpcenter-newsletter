import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-[10px] uppercase tracking-widest text-[#f72662] mb-4 font-medium">
        404
      </p>
      <h1 className="text-3xl font-bold text-[#f0eff2] tracking-tight mb-3">
        Artigo não encontrado
      </h1>
      <p className="text-sm text-[#9d9aa6] mb-8 leading-relaxed">
        O artigo que você está procurando não existe ou foi movido.
      </p>
      <Link
        href="/ajuda"
        className="inline-flex items-center gap-2 text-sm text-[#f72662] hover:text-[#ff3d73] transition-colors"
      >
        <ArrowLeft size={14} />
        Voltar ao Help Center
      </Link>
    </div>
  );
}
