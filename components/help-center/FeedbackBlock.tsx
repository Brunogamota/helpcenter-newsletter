"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function FeedbackBlock() {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);

  if (voted) {
    return (
      <div className="border border-[#2a2730] bg-[#1c1920] p-6 text-center">
        <p className="text-sm text-[#9d9aa6]">
          {voted === "yes"
            ? "Ótimo! Fico feliz que ajudou."
            : "Obrigado pelo feedback. Vamos melhorar esse artigo."}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#2a2730] bg-[#1c1920] p-6">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="text-sm font-medium text-[#f0eff2] mb-0.5">
            Esse artigo te ajudou?
          </p>
          <p className="text-xs text-[#5a5763]">
            Seu feedback nos ajuda a melhorar a documentação.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoted("yes")}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[#2a2730] text-[#9d9aa6] hover:border-[#f72662]/50 hover:text-[#f72662] hover:bg-[#211e26] transition-all"
          >
            <ThumbsUp size={14} />
            Sim
          </button>
          <button
            onClick={() => setVoted("no")}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[#2a2730] text-[#9d9aa6] hover:border-[#3a3645] hover:text-[#f0eff2] hover:bg-[#211e26] transition-all"
          >
            <ThumbsDown size={14} />
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
