import type { Article } from "@/types/help-center";

export const articles: Article[] = [
  // PRIMEIROS PASSOS
  {
    id: "art-1",
    title: "Como criar e ativar sua conta Reborn",
    slug: "como-criar-e-ativar-sua-conta",
    categorySlug: "primeiros-passos",
    excerpt:
      "Passo a passo para criar sua conta, enviar documentação e ativar sua operação em menos de 24h.",
    content: `
<h2>Antes de começar</h2>
<p>Para criar sua conta Reborn você vai precisar de: CNPJ ativo (MEI, ME, LTDA ou SA), dados bancários para recebimento e documentos do representante legal.</p>

<h2>Criando sua conta</h2>
<p>Acesse o painel em <strong>dashboard.reborn.com.br</strong> e clique em "Criar conta". Preencha o CNPJ da empresa — os dados cadastrais serão buscados automaticamente via Receita Federal.</p>
<p>Na etapa seguinte, você irá configurar:</p>
<ul>
  <li>Dados do representante legal com documento (RG ou CNH frente e verso)</li>
  <li>Comprovante de endereço da empresa (últimos 90 dias)</li>
  <li>Conta bancária para recebimento dos repasses</li>
</ul>

<h2>Análise de risco</h2>
<p>Após envio da documentação, o time de compliance realiza análise de risco. O prazo padrão é de <strong>24 horas úteis</strong>, podendo ser reduzido para contas com volume alto projetado.</p>

<div class="callout">
  <p><strong>Contas com faturamento acima de R$ 500k/mês</strong> têm acesso ao onboarding prioritário com gerente dedicado. Entre em contato após cadastro.</p>
</div>

<h2>Ativando a operação</h2>
<p>Com a conta aprovada, você receberá por email:</p>
<ul>
  <li>Chaves de API (produção e sandbox)</li>
  <li>Acesso ao dashboard completo</li>
  <li>Link para documentação técnica</li>
</ul>
<p>Recomendamos testar todos os fluxos no ambiente sandbox antes de ativar em produção.</p>

<h2>Próximos passos</h2>
<p>Com sua conta ativa, você pode seguir para configuração do checkout, definição de webhooks e integração via API.</p>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-10",
    tags: ["conta", "cadastro", "onboarding", "documentos"],
    isFeatured: true,
    readingTime: 4,
  },
  {
    id: "art-2",
    title: "Entendendo suas chaves de API",
    slug: "entendendo-suas-chaves-de-api",
    categorySlug: "primeiros-passos",
    excerpt:
      "Como funcionam as chaves públicas e secretas, onde encontrá-las e como protegê-las.",
    content: `
<h2>Tipos de chave</h2>
<p>A Reborn utiliza um par de chaves para autenticação:</p>
<ul>
  <li><strong>Chave pública (pk_)</strong> — usada no frontend, checkout e SDKs client-side. Não dá acesso a dados sensíveis.</li>
  <li><strong>Chave secreta (sk_)</strong> — usada exclusivamente no backend. Nunca exponha em código client-side.</li>
</ul>

<h2>Ambientes</h2>
<p>Cada ambiente (sandbox e produção) possui seu próprio par de chaves:</p>
<ul>
  <li><code>pk_sandbox_...</code> e <code>sk_sandbox_...</code> para testes</li>
  <li><code>pk_live_...</code> e <code>sk_live_...</code> para produção</li>
</ul>

<h2>Onde encontrar suas chaves</h2>
<p>Acesse <strong>Dashboard → Configurações → API e Integrações</strong>. As chaves são exibidas uma única vez no momento da criação — salve em local seguro.</p>

<h2>Rotação de chaves</h2>
<p>Recomendamos rotacionar a chave secreta a cada 90 dias. O processo não causa downtime — a chave antiga continua válida por 24h após a criação da nova.</p>

<div class="callout">
  <p><strong>Nunca commite chaves em repositórios.</strong> Use variáveis de ambiente e ferramentas como Vault, AWS Secrets Manager ou Doppler.</p>
</div>
    `,
    author: { name: "Time de Engenharia", role: "Reborn" },
    updatedAt: "2025-04-08",
    tags: ["api", "autenticação", "segurança", "chaves"],
    isFeatured: true,
    readingTime: 3,
  },
  {
    id: "art-3",
    title: "Ambiente sandbox: testando sem risco",
    slug: "ambiente-sandbox-testando-sem-risco",
    categorySlug: "primeiros-passos",
    excerpt:
      "Use o sandbox para simular pagamentos, erros e webhooks antes de ir a produção.",
    content: `
<h2>O que é o sandbox</h2>
<p>O ambiente sandbox é um espelho do ambiente de produção, isolado por completo. Nenhuma transação real é processada. Ideal para desenvolvimento, QA e testes de integração.</p>

<h2>Cartões de teste</h2>
<p>Use os cartões abaixo para simular diferentes cenários:</p>
<ul>
  <li><code>4111 1111 1111 1111</code> — Aprovação imediata</li>
  <li><code>4000 0000 0000 0002</code> — Recusa por fundos insuficientes</li>
  <li><code>4000 0000 0000 9995</code> — Recusa por suspeita de fraude</li>
  <li><code>4000 0020 0000 1000</code> — Exige autenticação 3DS</li>
</ul>

<h2>Simulando Pix</h2>
<p>No sandbox, cobranças Pix são aprovadas automaticamente após 30 segundos. Para simular aprovação imediata, use a rota <code>POST /v1/sandbox/pix/simulate-payment</code>.</p>

<h2>Webhooks no sandbox</h2>
<p>Configure a URL de webhook nas configurações do sandbox. Os eventos são disparados normalmente. Use ferramentas como <a href="#">ngrok</a> ou <a href="#">Hookdeck</a> para receber webhooks em desenvolvimento local.</p>
    `,
    author: { name: "Time de Engenharia", role: "Reborn" },
    updatedAt: "2025-04-05",
    tags: ["sandbox", "teste", "desenvolvimento", "cartão de teste"],
    isFeatured: false,
    readingTime: 4,
  },

  // PAGAMENTOS
  {
    id: "art-4",
    title: "Processando pagamentos via Pix",
    slug: "processando-pagamentos-via-pix",
    categorySlug: "pagamentos",
    excerpt:
      "Crie cobranças Pix estáticas e dinâmicas, gerencie expiração e reconcile pagamentos.",
    content: `
<h2>Tipos de cobrança Pix</h2>
<p>A Reborn suporta dois tipos de cobrança Pix:</p>
<ul>
  <li><strong>Pix Estático</strong> — QR code fixo sem valor ou com valor predefinido. Simples de gerar, mas sem rastreabilidade por transação.</li>
  <li><strong>Pix Dinâmico (Cob/CobV)</strong> — QR code único por transação com rastreabilidade completa, expiração configurável e dados do pagador.</li>
</ul>
<p>Para operações de e-commerce, use exclusivamente <strong>Pix Dinâmico</strong>.</p>

<h2>Criando uma cobrança</h2>
<pre><code>POST /v1/charges
{
  "amount": 15000,
  "currency": "BRL",
  "payment_method": "pix",
  "pix": {
    "expiration": 3600,
    "description": "Pedido #1234"
  },
  "customer": {
    "name": "João Silva",
    "document": "123.456.789-00"
  }
}</code></pre>

<h2>Resposta e QR Code</h2>
<p>A API retorna o QR code em formato base64 e o código copia-e-cola no campo <code>pix.qr_code</code>. Exiba ambos para o cliente.</p>

<h2>Confirmação de pagamento</h2>
<p>A confirmação é assíncrona via webhook. Configure o evento <code>charge.paid</code> para atualizar o status do pedido em sua plataforma.</p>

<div class="callout">
  <p>O prazo de liquidação do Pix é de <strong>D+0</strong> para saldo disponível no painel. O repasse segue o cronograma configurado na sua conta.</p>
</div>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-12",
    tags: ["pix", "cobrança", "qr code", "pagamento"],
    isFeatured: true,
    readingTime: 5,
  },
  {
    id: "art-5",
    title: "Processando cartão de crédito",
    slug: "processando-cartao-de-credito",
    categorySlug: "pagamentos",
    excerpt:
      "Tokenização de cartão, parcelamento, autenticação 3DS e gestão de recusas.",
    content: `
<h2>Fluxo de pagamento com cartão</h2>
<p>O processamento de cartão na Reborn segue um fluxo em duas etapas: <strong>tokenização no cliente</strong> e <strong>cobrança no servidor</strong>. Isso garante que os dados do cartão nunca trafeguem pelos seus servidores — apenas tokens PCI-safe.</p>

<h2>Tokenizando o cartão</h2>
<p>Use o SDK JavaScript para tokenizar os dados do cartão no frontend:</p>
<pre><code>const { token, error } = await reborn.createCardToken({
  number: "4111 1111 1111 1111",
  exp_month: "12",
  exp_year: "2027",
  cvv: "123",
  holder_name: "JOAO SILVA"
});</code></pre>

<h2>Realizando a cobrança</h2>
<pre><code>POST /v1/charges
{
  "amount": 29900,
  "payment_method": "credit_card",
  "card": {
    "token": "tok_live_...",
    "installments": 3
  },
  "capture": true
}</code></pre>

<h2>Autenticação 3DS</h2>
<p>Para transações acima de R$ 300, recomendamos ativar 3DS 2.0. A Reborn gerencia o fluxo de autenticação automaticamente — basta enviar <code>"three_ds": true</code> na requisição.</p>

<h2>Tratando recusas</h2>
<p>Recusas retornam código HTTP 422 com campo <code>decline_code</code>. Os mais comuns são: <code>insufficient_funds</code>, <code>card_blocked</code>, <code>suspected_fraud</code> e <code>expired_card</code>.</p>
    `,
    author: { name: "Time de Engenharia", role: "Reborn" },
    updatedAt: "2025-04-11",
    tags: ["cartão", "crédito", "tokenização", "3DS", "parcelamento"],
    isFeatured: false,
    readingTime: 6,
  },
  {
    id: "art-6",
    title: "Emitindo e gerenciando boletos",
    slug: "emitindo-e-gerenciando-boletos",
    categorySlug: "pagamentos",
    excerpt:
      "Emissão de boleto bancário, vencimentos, multas, juros e cancelamento.",
    content: `
<h2>Emitindo um boleto</h2>
<p>A Reborn emite boletos registrados via múltiplos bancos (Itaú, Bradesco, Santander). O banco emissor é selecionado automaticamente com base em disponibilidade e custo.</p>
<pre><code>POST /v1/charges
{
  "amount": 50000,
  "payment_method": "boleto",
  "boleto": {
    "due_date": "2025-04-20",
    "instructions": "Não receber após vencimento",
    "fine": { "amount": 200 },
    "interest": { "amount": 100 }
  },
  "customer": {
    "name": "Maria Santos",
    "document": "987.654.321-00",
    "address": { ... }
  }
}</code></pre>

<h2>Vencimento e tolerância</h2>
<p>O campo <code>due_date</code> define o vencimento. Boletos vencidos não são automaticamente cancelados — o banco pode aceitar pagamentos com atraso conforme configuração de tolerância (padrão: sem tolerância).</p>

<h2>Cancelamento</h2>
<p>Use <code>POST /v1/charges/{id}/cancel</code> para cancelar um boleto ainda não pago. Boletos pagos não podem ser cancelados — use o fluxo de reembolso.</p>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-09",
    tags: ["boleto", "emissão", "vencimento", "cobrança"],
    isFeatured: false,
    readingTime: 4,
  },

  // CHECKOUT
  {
    id: "art-7",
    title: "Checkout transparente: guia de implementação",
    slug: "checkout-transparente-guia-de-implementacao",
    categorySlug: "checkout",
    excerpt:
      "Implemente checkout transparente com tokenização, validação e tratamento de erros.",
    content: `
<h2>O que é checkout transparente</h2>
<p>No checkout transparente, o cliente permanece no seu domínio durante todo o processo de pagamento. Você controla 100% da experiência visual e de UX.</p>

<h2>Requisitos técnicos</h2>
<p>Para implementar checkout transparente você precisa:</p>
<ul>
  <li>SSL ativo no domínio de checkout</li>
  <li>SDK JavaScript Reborn carregado da CDN oficial</li>
  <li>Backend seguro para processar a cobrança com a chave secreta</li>
</ul>

<h2>Instalando o SDK</h2>
<pre><code>&lt;script src="https://js.reborn.com.br/v2/reborn.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const reborn = Reborn("pk_live_...");
&lt;/script&gt;</code></pre>

<h2>Fluxo de checkout</h2>
<p>O fluxo padrão é:</p>
<ul>
  <li>Cliente insere dados do cartão no seu formulário</li>
  <li>SDK tokeniza o cartão (sem passar pelo seu servidor)</li>
  <li>Seu backend recebe o token e processa a cobrança</li>
  <li>Você redireciona ou exibe confirmação</li>
</ul>

<div class="callout">
  <p>Nunca envie dados de cartão para o seu servidor. Use sempre o token retornado pelo SDK.</p>
</div>
    `,
    author: { name: "Time de Engenharia", role: "Reborn" },
    updatedAt: "2025-04-13",
    tags: ["checkout", "transparente", "integração", "SDK"],
    isFeatured: true,
    readingTime: 6,
  },
  {
    id: "art-8",
    title: "Hosted Checkout: link de pagamento rápido",
    slug: "hosted-checkout-link-de-pagamento-rapido",
    categorySlug: "checkout",
    excerpt:
      "Crie links de pagamento em segundos sem código. Ideal para vendas avulsas e times comerciais.",
    content: `
<h2>O que é o Hosted Checkout</h2>
<p>O Hosted Checkout é uma página de pagamento hospedada pela Reborn. Você cria um link via API ou dashboard e compartilha com o cliente — sem necessidade de implementar nada no frontend.</p>

<h2>Criando um link</h2>
<pre><code>POST /v1/checkout-links
{
  "name": "Consultoria Premium",
  "amount": 150000,
  "payment_methods": ["credit_card", "pix"],
  "expires_in": 86400,
  "redirect_url": "https://suaempresa.com/obrigado"
}</code></pre>

<h2>Customizando a aparência</h2>
<p>Configure logo, cores e textos no <strong>Dashboard → Checkout → Aparência</strong>. A página hospedada usa seu branding automaticamente.</p>

<h2>Monitorando conversão</h2>
<p>No painel de checkout links você acessa métricas de visitas, inícios e conclusões de pagamento em tempo real.</p>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-07",
    tags: ["checkout", "link", "hosted", "sem código"],
    isFeatured: false,
    readingTime: 3,
  },

  // ASSINATURAS
  {
    id: "art-9",
    title: "Criando planos e assinaturas",
    slug: "criando-planos-e-assinaturas",
    categorySlug: "assinaturas",
    excerpt:
      "Configure planos recorrentes, períodos de trial, upgrades e downgrades.",
    content: `
<h2>Conceitos fundamentais</h2>
<p>Na Reborn, a cobrança recorrente é organizada em:</p>
<ul>
  <li><strong>Plano</strong> — define valor, ciclo e configurações padrão</li>
  <li><strong>Assinatura</strong> — vincula um cliente a um plano</li>
  <li><strong>Fatura</strong> — gerada automaticamente a cada ciclo</li>
</ul>

<h2>Criando um plano</h2>
<pre><code>POST /v1/plans
{
  "name": "Plano Profissional",
  "amount": 29700,
  "interval": "month",
  "interval_count": 1,
  "trial_days": 14
}</code></pre>

<h2>Assinando um plano</h2>
<pre><code>POST /v1/subscriptions
{
  "customer_id": "cus_...",
  "plan_id": "plan_...",
  "card_token": "tok_...",
  "start_at": "2025-05-01"
}</code></pre>

<h2>Trial e ativação</h2>
<p>Com <code>trial_days</code> configurado, a primeira cobrança só ocorre após o período de trial. Durante o trial, a assinatura fica no status <code>trialing</code>.</p>

<h2>Upgrade e downgrade</h2>
<p>Use <code>PATCH /v1/subscriptions/{id}</code> para trocar o plano. O sistema calcula automaticamente o valor proporcional do período vigente (proration).</p>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-14",
    tags: ["assinatura", "recorrência", "plano", "trial"],
    isFeatured: true,
    readingTime: 5,
  },
  {
    id: "art-10",
    title: "Gestão de inadimplência e retentativas",
    slug: "gestao-de-inadimplencia-e-retentativas",
    categorySlug: "assinaturas",
    excerpt:
      "Configure retentativas automáticas, notificações ao cliente e régua de comunicação.",
    content: `
<h2>O ciclo de inadimplência</h2>
<p>Quando uma cobrança de assinatura falha, a Reborn segue automaticamente a régua configurada na sua conta:</p>
<ul>
  <li>D+0: Primeira tentativa</li>
  <li>D+3: Segunda tentativa</li>
  <li>D+7: Terceira tentativa com notificação ao cliente</li>
  <li>D+14: Suspensão da assinatura</li>
  <li>D+30: Cancelamento automático (configurável)</li>
</ul>

<h2>Configurando a régua</h2>
<p>Acesse <strong>Dashboard → Assinaturas → Régua de Inadimplência</strong> para customizar intervalos, número de tentativas e ações automáticas.</p>

<h2>Notificando clientes</h2>
<p>Configure templates de email para cada etapa da régua. A Reborn dispara automaticamente com seu domínio de envio configurado.</p>

<h2>Recuperação manual</h2>
<p>Para forçar uma nova tentativa imediata:</p>
<pre><code>POST /v1/invoices/{id}/retry</code></pre>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-06",
    tags: ["inadimplência", "retentativa", "assinatura", "cobrança"],
    isFeatured: false,
    readingTime: 4,
  },

  // WEBHOOKS E API
  {
    id: "art-11",
    title: "Configurando webhooks",
    slug: "configurando-webhooks",
    categorySlug: "webhooks-api",
    excerpt:
      "Receba eventos em tempo real: como registrar endpoints, validar assinatura e processar eventos.",
    content: `
<h2>O que são webhooks</h2>
<p>Webhooks são notificações HTTP enviadas pela Reborn para o seu servidor quando eventos acontecem na plataforma. Em vez de fazer polling na API, você recebe os dados no momento em que ocorrem.</p>

<h2>Registrando um endpoint</h2>
<pre><code>POST /v1/webhooks
{
  "url": "https://api.suaempresa.com/webhooks/reborn",
  "events": ["charge.paid", "charge.failed", "subscription.renewed"],
  "description": "Produção - Loja Principal"
}</code></pre>

<h2>Validando a assinatura</h2>
<p>Todo webhook inclui o header <code>X-Reborn-Signature</code>. Valide para garantir autenticidade:</p>
<pre><code>const signature = req.headers["x-reborn-signature"];
const computed = crypto
  .createHmac("sha256", process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest("hex");

if (signature !== computed) {
  return res.status(401).send("Invalid signature");
}</code></pre>

<h2>Eventos disponíveis</h2>
<ul>
  <li><code>charge.created</code> — cobrança criada</li>
  <li><code>charge.paid</code> — pagamento confirmado</li>
  <li><code>charge.failed</code> — pagamento falhou</li>
  <li><code>charge.refunded</code> — reembolso processado</li>
  <li><code>subscription.created</code> — assinatura criada</li>
  <li><code>subscription.renewed</code> — assinatura renovada</li>
  <li><code>subscription.canceled</code> — assinatura cancelada</li>
  <li><code>dispute.opened</code> — disputa aberta</li>
</ul>

<h2>Retentativas e idempotência</h2>
<p>A Reborn tenta reenviar eventos que retornam status diferente de 2xx por até 72h com backoff exponencial. Implemente idempotência usando o campo <code>event_id</code>.</p>
    `,
    author: { name: "Time de Engenharia", role: "Reborn" },
    updatedAt: "2025-04-15",
    tags: ["webhook", "eventos", "integração", "API"],
    isFeatured: true,
    readingTime: 6,
  },
  {
    id: "art-12",
    title: "Autenticação e rate limits da API",
    slug: "autenticacao-e-rate-limits-da-api",
    categorySlug: "webhooks-api",
    excerpt:
      "Como autenticar requisições, lidar com rate limits e implementar retry com backoff.",
    content: `
<h2>Autenticação</h2>
<p>A API Reborn usa autenticação Bearer com sua chave secreta:</p>
<pre><code>Authorization: Bearer sk_live_...</code></pre>
<p>Todas as requisições devem ser feitas via HTTPS. Requisições HTTP são rejeitadas com status 426.</p>

<h2>Rate limits</h2>
<p>Os limites padrão são:</p>
<ul>
  <li><strong>100 req/s</strong> por chave de API</li>
  <li><strong>10.000 req/min</strong> por conta</li>
  <li><strong>Criação de cobranças</strong>: 50 req/s</li>
</ul>
<p>Requisições que excedem o limite retornam HTTP 429 com header <code>Retry-After</code> indicando quantos segundos aguardar.</p>

<h2>Implementando retry</h2>
<pre><code>async function requestWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (err.status === 429) {
        const wait = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      throw err;
    }
  }
}</code></pre>
    `,
    author: { name: "Time de Engenharia", role: "Reborn" },
    updatedAt: "2025-04-10",
    tags: ["autenticação", "rate limit", "API", "retry"],
    isFeatured: false,
    readingTime: 4,
  },

  // ANTIFRAUDE
  {
    id: "art-13",
    title: "Entendendo o score de fraude",
    slug: "entendendo-o-score-de-fraude",
    categorySlug: "antifraude",
    excerpt:
      "Como o motor de antifraude avalia transações, o que influencia o score e como agir em cada faixa.",
    content: `
<h2>Como funciona o score</h2>
<p>O motor de antifraude da Reborn analisa mais de 200 sinais em tempo real para cada transação, gerando um score de 0 a 1000. Quanto maior o score, menor o risco.</p>

<h2>Faixas de risco</h2>
<ul>
  <li><strong>800–1000</strong>: Baixo risco — aprovação automática</li>
  <li><strong>500–799</strong>: Risco médio — revisão opcional</li>
  <li><strong>200–499</strong>: Alto risco — revisão recomendada</li>
  <li><strong>0–199</strong>: Crítico — bloqueio automático padrão</li>
</ul>

<h2>Principais sinais analisados</h2>
<ul>
  <li>Velocidade de transações (mesmo IP, cartão, dispositivo)</li>
  <li>Reputação do documento CPF/CNPJ</li>
  <li>Correspondência entre IP geolocalizado e endereço de entrega</li>
  <li>Histórico de chargebacks do comprador</li>
  <li>Fingerprint do dispositivo</li>
  <li>Horário e padrão de compra</li>
</ul>

<h2>Customizando regras</h2>
<p>Acesse <strong>Dashboard → Antifraude → Regras Personalizadas</strong> para criar regras baseadas em campos específicos do seu negócio.</p>

<div class="callout">
  <p>Segmentos como viagens, eletrônicos e infoprodutos têm perfis de risco distintos. Fale com seu gerente de conta para calibrar o motor para seu setor.</p>
</div>
    `,
    author: { name: "Time de Risco", role: "Reborn" },
    updatedAt: "2025-04-08",
    tags: ["antifraude", "score", "risco", "chargeback"],
    isFeatured: false,
    readingTime: 5,
  },

  // SPLIT E MARKETPLACE
  {
    id: "art-14",
    title: "Configurando split de pagamento",
    slug: "configurando-split-de-pagamento",
    categorySlug: "split-marketplace",
    excerpt:
      "Divida automaticamente o valor de uma transação entre múltiplos recebedores.",
    content: `
<h2>O que é split de pagamento</h2>
<p>O split permite dividir o valor de uma transação entre múltiplos recebedores no momento do pagamento. Ideal para marketplaces, plataformas com vendedores e negócios com comissionamento.</p>

<h2>Configurando recebedores</h2>
<p>Cada recebedor (seller) precisa ter uma subconta Reborn aprovada. Crie via:</p>
<pre><code>POST /v1/recipients
{
  "name": "Loja do João",
  "document": "12.345.678/0001-90",
  "bank_account": {
    "bank": "341",
    "agency": "0001",
    "account": "12345-6",
    "type": "checking"
  }
}</code></pre>

<h2>Realizando um pagamento com split</h2>
<pre><code>POST /v1/charges
{
  "amount": 100000,
  "payment_method": "credit_card",
  "split": [
    {
      "recipient_id": "rcp_marketplace",
      "amount": 15000,
      "type": "flat",
      "charge_fee": true
    },
    {
      "recipient_id": "rcp_seller",
      "amount": 85000,
      "type": "flat"
    }
  ]
}</code></pre>

<h2>Repasse automático</h2>
<p>O repasse para os recebedores ocorre conforme o cronograma definido em cada subconta. O marketplace controla o prazo de repasse dos sellers.</p>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-11",
    tags: ["split", "marketplace", "recebedor", "subconta"],
    isFeatured: false,
    readingTime: 5,
  },

  // RELATÓRIOS
  {
    id: "art-15",
    title: "Conciliação financeira e extratos",
    slug: "conciliacao-financeira-e-extratos",
    categorySlug: "relatorios-financeiro",
    excerpt:
      "Como exportar extratos, reconciliar transações e entender o saldo disponível.",
    content: `
<h2>Saldo e liquidez</h2>
<p>O painel financeiro mostra três tipos de saldo:</p>
<ul>
  <li><strong>Disponível</strong> — pronto para saque imediato</li>
  <li><strong>A receber</strong> — transações aprovadas aguardando liquidação</li>
  <li><strong>Retido</strong> — valores em análise de disputa ou reserva de segurança</li>
</ul>

<h2>Exportando extratos</h2>
<p>Acesse <strong>Dashboard → Financeiro → Extrato</strong> e exporte em CSV ou XLSX filtrando por período, forma de pagamento ou status.</p>
<p>Via API:</p>
<pre><code>GET /v1/balance/transactions?
  start_date=2025-04-01&
  end_date=2025-04-30&
  type=payment&
  format=csv</code></pre>

<h2>Conciliação automática</h2>
<p>Configure a integração com seu ERP via API para sincronização automática diária. A Reborn suporta exportação para formatos CNAB 240 e CNAB 400.</p>

<h2>Relatório de taxas</h2>
<p>O relatório de taxas detalha MDR por bandeira, taxa de Pix, custo de boleto e tarifas de split. Disponível em <strong>Dashboard → Financeiro → Taxas</strong>.</p>
    `,
    author: { name: "Time de Produto", role: "Reborn" },
    updatedAt: "2025-04-09",
    tags: ["conciliação", "extrato", "financeiro", "relatório"],
    isFeatured: false,
    readingTime: 4,
  },
];

export function getArticleBySlug(
  categorySlug: string,
  slug: string
): Article | undefined {
  return articles.find(
    (a) => a.categorySlug === categorySlug && a.slug === slug
  );
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.isFeatured);
}

export function getRecentArticles(limit = 6): Article[] {
  return [...articles]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
}

export function getRelatedArticles(
  article: Article,
  limit = 3
): Article[] {
  return articles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.categorySlug === article.categorySlug ||
          a.tags.some((t) => article.tags.includes(t)))
    )
    .slice(0, limit);
}
