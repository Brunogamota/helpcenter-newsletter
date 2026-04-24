import type { Category } from "@/types/help-center";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Primeiros Passos",
    slug: "primeiros-passos",
    description:
      "Configure sua conta, entenda credenciais e faça sua primeira transação.",
    icon: "Rocket",
  },
  {
    id: "cat-2",
    name: "Pagamentos",
    slug: "pagamentos",
    description:
      "Pix, cartão de crédito, boleto e todas as formas de recebimento.",
    icon: "CreditCard",
  },
  {
    id: "cat-3",
    name: "Checkout",
    slug: "checkout",
    description:
      "Checkout transparente, hosted checkout e customizações avançadas.",
    icon: "ShoppingCart",
  },
  {
    id: "cat-4",
    name: "Assinaturas",
    slug: "assinaturas",
    description:
      "Cobrança recorrente, planos, trials e gestão de inadimplência.",
    icon: "RefreshCw",
  },
  {
    id: "cat-5",
    name: "Webhooks e API",
    slug: "webhooks-api",
    description:
      "Integração via API REST, webhooks, autenticação e rate limits.",
    icon: "Webhook",
  },
  {
    id: "cat-6",
    name: "Split e Marketplace",
    slug: "split-marketplace",
    description:
      "Split de pagamento, subcontas, repasses automáticos e marketplace.",
    icon: "GitBranch",
  },
  {
    id: "cat-7",
    name: "Antifraude",
    slug: "antifraude",
    description: "Regras de risco, score de fraude, chargeback e disputas.",
    icon: "Shield",
  },
  {
    id: "cat-8",
    name: "Relatórios e Financeiro",
    slug: "relatorios-financeiro",
    description:
      "Conciliação, extratos, DRE operacional e exportação de dados.",
    icon: "BarChart3",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
