# PROMPT — Construção do Site de Hosting (host.zedecks.com)
### Para uso no Antigravity IDE · Zedeck's IT

---

## CONTEXTO DO PROJETO (colar isto primeiro, sempre)

Vais atuar como engenheiro de software sénior responsável por construir a **landing page institucional do serviço de Hosting da Zedeck's IT**, empresa de tecnologia moçambicana sediada em Nampula.

**Regras de arquitetura que já estão fixadas para toda a árvore da empresa e que este projeto TEM de respeitar:**

1. **Princípio de isolamento ("raio de explosão"):** este site é público, de baixo risco, e NUNCA deve partilhar repositório, deploy ou processo de build com `dashboard` (painel interno, alta sensibilidade) ou com `core` (Identity/Mail/Drive). É um repositório próprio, autocontido.
2. **Sem autenticação própria nesta fase.** Landing pública, sem login. O painel de cliente (self-service, compra de planos, gestão de domínio/servidor) é **Fase 2**, projeto separado, fora deste escopo — não construir, não deixar hooks meio-feitos para isso.
3. **Stack obrigatória:** HTML5 + CSS3 + JavaScript vanilla (sem framework de build tipo React/Next/Vue). CSS/JS customizado, com componentes e animações próprias escritos à mão. Cloudflare como camada de DNS, CDN, cache e proteção (WAF básico, SSL).
4. **Hospedagem:** auto-hospedado dentro da própria infraestrutura `host.zedecks.com` da Zedeck's IT — não é Cloudflare Pages/Workers como frontend principal (Cloudflare entra só como camada de rede/DNS/proteção na frente).
5. **Preços:** os planos WordPress e Hospedagem Compartilhada já têm preço confirmado em MZN pela direção — usar exatamente os valores da secção "PLANOS OFICIAIS" abaixo, sem alterar. Os planos VPS, Revenda e cPanel Dedicado ainda não têm preço confirmado — usar as especificações técnicas reais (essas sim confirmadas) mas mostrar "[A CONFIRMAR PELA DIREÇÃO]" no lugar do preço. Nunca inventar nem converter valores entre moedas.
6. **Identidade visual e verbal:** assinatura oficial "**Made by Zedeck's IT.**" no rodapé. Tom institucional, direto, profissional — português como idioma principal, com toggle para inglês (a empresa atende clientes em todo o mundo, em qualquer moeda).
7. **Domínios/subdomínios já ativos que podem ser referenciados/linkados:** `zedecks.com`, `training.zedecks.com`, `zncreative.zedecks.com`, `zstocky.com`. Não referenciar subdomínios ainda não ativos (`accounts.`, `console.`, `mail.`, `drive.`, etc.) — não existem em produção.

---

## PLANOS OFICIAIS (dados fixos — usar tal e qual)

**Moeda: Metical moçambicano (MZN) em todos os planos, sem exceção.** As imagens de referência traziam valores em R$ (Real brasileiro) — servem **apenas como estrutura/especificações técnicas** (Passmark, armazenamento, RAM, nº de contas, núcleos, etc.), não como preço final. Onde o preço real em MZN não foi confirmado pela direção, usar "[A CONFIRMAR PELA DIREÇÃO]" — nunca converter R$→MZN automaticamente nem inventar um valor.

### VPS — Servidores cPanel (processador dedicado)

| Plano | Preço/mês (MZN) | Passmark | SSL | Armazenamento | RAM | Domínios | Tráfego | Extra |
|---|---|---|---|---|---|---|---|---|
| Pro Ryzen 3950x | [A CONFIRMAR PELA DIREÇÃO] | 39172 | Certificado SSL | 50GB NVMe (RAM DDR4) | 12GB p/ site | Ilimitados | Ilimitado | Datacenter Premium · Suporte WhatsApp · Adicionais Premium |
| Max Ryzen 3950x | [A CONFIRMAR PELA DIREÇÃO] | 39172 | Certificado SSL | 100GB NVMe (RAM DDR4) | 12GB p/ site | Ilimitados | Ilimitado | Datacenter Premium · Suporte WhatsApp · Adicionais Premium |
| Ultra Intel Core i9 | [A CONFIRMAR PELA DIREÇÃO] | 61192 | Certificado SSL | 150GB NVMe (RAM DDR5) | 12GB p/ site | Ilimitados | Ilimitado | Datacenter Premium · Suporte WhatsApp · Adicionais Premium |

### Revenda de Hosting (contas cPanel para revenda)

| Plano | Preço/mês (MZN) | Passmark | SSL | Armazenamento | RAM | Contas cPanel | Tráfego | Extra |
|---|---|---|---|---|---|---|---|---|
| Pro Ryzen 3950x | [A CONFIRMAR PELA DIREÇÃO] | 39172 | SSL Grátis | 40GB NVMe (RAM DDR4) | 12GB p/ site | 15 | Ilimitado | Datacenter Premium · Suporte WhatsApp · Adicionais Premium |
| Max Ryzen 3950x | [A CONFIRMAR PELA DIREÇÃO] | 39172 | SSL Grátis | 80GB NVMe (RAM DDR4) | 12GB p/ site | 30 | Ilimitado | Datacenter Premium · Suporte WhatsApp · Adicionais Premium |
| Ultra Intel Core i9 | [A CONFIRMAR PELA DIREÇÃO] | 61192 | SSL Grátis | 100GB NVMe (RAM DDR5) | 12GB p/ site | 60 | Ilimitado | Datacenter Premium · Suporte WhatsApp · Adicionais Premium |

### VPS — Servidores cPanel dedicados (planos por capacidade)

| Plano | Preço/mês (MZN) | Localização/CPU | Armazenamento | Tráfego | Gerenciamento | Uptime/Link |
|---|---|---|---|---|---|---|
| cPanel A | [A CONFIRMAR PELA DIREÇÃO] | EUA · 4x Núcleos · 4GB RAM | 100GB SSD/NVMe + 100GB FTP Backup | Ilimitado | Grátis e Opcional* | 99,9% · Link 1GB |
| cPanel B | [A CONFIRMAR PELA DIREÇÃO] | EUA · 8x Núcleos · 8GB RAM | 150GB SSD/NVMe + 150GB FTP Backup | Ilimitado | Grátis e Opcional* | 99,9% · Link 1GB |
| cPanel C | [A CONFIRMAR PELA DIREÇÃO] | EUA · 12x Núcleos · 12GB RAM | 200GB SSD/NVMe + 250GB FTP Backup | Ilimitado | Grátis e Opcional* | 99,9% · Link 1GB |
| cPanel D | [A CONFIRMAR PELA DIREÇÃO] | EUA · 16x Núcleos · 16GB RAM | 250GB SSD/NVMe + 500GB FTP Backup | Ilimitado | Grátis e Opcional* | 99,9% · Link 1GB |

Cada card desta categoria tem CTA próprio "Ver mais".

### Planos WordPress (hospedagem partilhada) — preço já confirmado pela direção

| Plano | Preço/mês (MZN) | Sites | E-mails | SSD | Bases de Dados |
|---|---|---|---|---|---|
| STARTER | 200 | 1 | 3 | 5GB | Limitadas |
| STANDARD | 450 | 1 | 5 | 10GB | Limitadas |
| WORD PLUS | 650 | 1 | 5 | 15GB | Ilimitadas |

### Planos Hospedagem Compartilhada — preço já confirmado pela direção

| Plano | Preço/mês (MZN) | Sites | E-mails | SSD | Bases de Dados |
|---|---|---|---|---|---|
| PREMIUM | 350 | 1 | 5 | 10GB | Ilimitadas |
| BUSINESS | 550 | 1 | 10 | 20GB | Ilimitadas |
| ENTERPRISE | 850 | 2 | 5 | 50GB | Ilimitadas |

**Instrução para o Antigravity:** ao renderizar as tabelas de VPS/Revenda/cPanel Dedicado, o texto "[A CONFIRMAR PELA DIREÇÃO]" deve aparecer visualmente no lugar do preço (ex.: badge "Em breve" ou "Consulte-nos"), com CTA a redirecionar para contacto — nunca deixar o campo de preço em branco nem com "R$0" ou qualquer placeholder numérico.

---

## ESTRUTURA DE REPOSITÓRIO ESPERADA

```
zedecks/                          [org GitHub existente]
└── hosting/                      [REPO NOVO — a criar]
    ├── index.html
    ├── /assets
    │   ├── /css
    │   │   ├── tokens.css        (variáveis de design: cor, tipografia, espaçamento)
    │   │   ├── base.css
    │   │   ├── components.css
    │   │   └── animations.css
    │   ├── /js
    │   │   ├── main.js
    │   │   ├── components/       (ex.: accordion de planos, form de lead, i18n toggle)
    │   │   └── i18n/             (pt.json, en.json)
    │   └── /img
    ├── /pages                    (se houver páginas extra: ex. /planos, /faq — avaliar se cabe tudo numa página só)
    ├── README.md                 (seguir o esqueleto padrão: Visão Geral → Arquitetura → Stack → Estrutura → Segurança → Setup → Testes → CI/CD → Governança/Ownership → Roadmap)
    ├── SECURITY.md
    └── .github/workflows/deploy.yml
```

Segue o esqueleto de README já padronizado na empresa (Visão Geral → Arquitetura → Stack → Estrutura → **Segurança** → Setup → Testes → CI/CD → Governança/Ownership → Roadmap).

---

## FASES DE EXECUÇÃO

Executa **uma fase de cada vez**. No fim de cada fase, para e apresenta o resultado antes de avançar para a seguinte — não avances fases automaticamente.

### FASE 0 — Scaffold e Fundação
- Criar a estrutura de pastas acima.
- Criar `tokens.css` com variáveis de design (paleta de cor, escala tipográfica, espaçamentos, breakpoints). Se ainda não existir um design system formal da Zedecks (`@zedecks/design-tokens` está referenciado no dossiê como parte do `design-system` monorepo, mas ainda não confirmado como publicado) — assumir paleta neutra profissional (não inventar cores de marca sem confirmação) e deixar comentário `/* TODO: alinhar com @zedecks/design-tokens quando disponível */`.
- Criar `README.md` inicial com o esqueleto padrão, secção "Segurança" já com os não-negociáveis mínimos (HTTPS obrigatório, sem segredos em texto commitado, CSP header).
- Criar `.gitignore`, `LICENSE` (a confirmar com a direção — não assumir MIT por defeito).

### FASE 1 — Conteúdo e Estrutura da Página
Construir o HTML semântico da landing, com estas secções (nesta ordem):
1. **Header/Nav** — logo Zedeck's IT, toggle PT/EN, CTA "Falar com a equipa".
2. **Hero** — proposição de valor do serviço de Hosting (hospedagem, domínios, servidores, infraestrutura web, e-mail profissional — conforme já listado na oferta oficial de TI da empresa).
3. **Serviços incluídos** — grid/cards: Hosting web, Registo/gestão de domínios, E-mail profissional, Servidores, Suporte técnico.
4. **Planos** — usar os dados reais da secção "PLANOS OFICIAIS" acima, organizados por categoria (abas ou secções separadas: VPS, Revenda, cPanel Dedicado, WordPress, Compartilhada), todos em MZN. WordPress e Compartilhada mostram o preço fixo confirmado; VPS/Revenda/cPanel Dedicado mostram as especificações reais com "[A CONFIRMAR PELA DIREÇÃO]" no lugar do preço. CTA por plano: "Contratar" (planos com preço fixo) ou "Ver mais"/"Consulte-nos" (planos a confirmar), a levar ao formulário de contacto/lead — não implementar checkout/pagamento nesta fase.
5. **Portfólio/Prova social** — SÓ os 4 exemplos publicamente citáveis: Sabores da Terra, Spicy House (spicehouses.com), Zaizah Fragrance, Nicol Store. Não incluir mais nenhum.
6. **FAQ** — reaproveitar perguntas já validadas na base de conhecimento oficial da empresa (ex.: "atendem clientes fora de Moçambique?", "quanto custa?").
7. **Formulário de contacto/lead** — nome, e-mail, telefone, mensagem. Sem processar pagamento nesta fase.
8. **Footer** — contactos (87 770 3308, info@zedecks.com), redes sociais (@zedecksit), links para zedecks.com e outros subdomínios ativos, assinatura "Made by Zedeck's IT."

Usar HTML semântico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), atributos ARIA básicos, e marcação preparada para SEO (meta tags, Open Graph, `<title>` e `<meta description>` únicos).

### FASE 2 — CSS e Componentes Visuais
- Implementar `base.css` (reset, tipografia, grid base) e `components.css` (cards, botões, formulário, tabela de planos) usando as variáveis de `tokens.css`.
- `animations.css` — transições e micro-interações discretas, sem exagero (fade-in em scroll, hover states, etc.) — sem bibliotecas externas, CSS puro.
- Responsivo mobile-first, testar em breakpoints: 360px, 768px, 1024px, 1440px.
- Garantir contraste AA (acessibilidade) na paleta.

### FASE 3 — JavaScript e Interatividade
- `main.js` — inicialização geral, scroll reveal, menu mobile.
- Componente de toggle de idioma PT/EN, com ficheiros `i18n/pt.json` e `i18n/en.json` — nenhum texto hardcoded fora dos ficheiros de tradução.
- Validação client-side do formulário de lead (campos obrigatórios, formato de e-mail/telefone) — sem enviar dados sensíveis sem validação.
- Sem frameworks — JS vanilla ES6+, modular (`import`/`export` ou IIFE, a definir conforme suporte de browser exigido).

### FASE 4 — Envio do Formulário de Lead (sem `notify.zedecks.com` nesta fase)
- `notify.zedecks.com` (relay transacional da Conta Zedecks) **não está disponível para uso nesta fase** — não depender dele.
- Solução mínima recomendada, sem backend dedicado: CTA do formulário abre um link `wa.me` pré-preenchido com os dados do plano escolhido (WhatsApp já é o canal oficial de suporte da empresa, referenciado em todos os planos), como alternativa/complemento ao envio por formulário.
- Se o formulário em si (não o WhatsApp) precisar de facto de submeter dados: usar um serviço de formulário de terceiros simples e sem custo de infraestrutura própria (ex.: Cloudflare Pages Forms, ou um endpoint de formulário estático tipo Formspree/Web3Forms) — **escolher UM, documentar a escolha e as credenciais necessárias no README, sem commitar nenhuma chave**.
- Nunca guardar dados de lead em texto simples sem encriptação se houver qualquer persistência.
- Deixar comentário `/* TODO: migrar para notify.zedecks.com quando disponível */` no código do handler de envio, para não perder o caminho de arquitetura de longo prazo já definido para a empresa.

### FASE 5 — Cloudflare (DNS, CDN, Segurança)
- Documentar (não executar sem acesso) os passos de configuração Cloudflare para `host.zedecks.com`: proxy ativado (laranja), SSL/TLS modo "Full (Strict)", regras de cache para assets estáticos, WAF básico, rate limiting no endpoint do formulário.
- Adicionar headers de segurança no deploy: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- Preencher `SECURITY.md` com estes pontos e com processo de reporte de vulnerabilidade.

### FASE 6 — Performance e SEO
- Otimizar imagens (formatos modernos, lazy loading).
- Lighthouse: alvo mínimo 90+ em Performance, Acessibilidade, Boas Práticas e SEO.
- `sitemap.xml`, `robots.txt`, dados estruturados (schema.org `Organization`/`LocalBusiness`) com os dados oficiais já confirmados (morada, telefone, e-mail).

### FASE 7 — CI/CD e Deploy
- `.github/workflows/deploy.yml` — build (se houver etapa de minificação) e deploy automático para `host.zedecks.com` a cada push em `main`, com etapa de lint/validação HTML antes do deploy.
- Ambiente de staging antes de produção, se a infraestrutura de `host.zedecks.com` permitir subdomínio/branch de preview.
- Checklist de smoke test pós-deploy (formulário funciona, links não quebrados, toggle de idioma, responsivo).

### FASE 8 — Governança e Fecho
- Completar `README.md` com secção Governança/Ownership: responsável = Edmilson Muacigarro (CEO/Dev); apoio criativo = Leoltino Muacigarro/ZN CreativeStudio, se design visual vier de lá.
- Roadmap no README apontando explicitamente a Fase 2 (painel de cliente self-service) como projeto futuro separado, fora deste repositório.

---

## O QUE NÃO FAZER (restrições explícitas)

- Não instalar React, Next.js, Vue, Tailwind ou qualquer framework/bundler pesado — stack é HTML/CSS/JS puro.
- Não construir login, autenticação ou área de cliente — isso é Fase 2, outro projeto.
- Não inventar preços de planos de hosting.
- Não listar clientes/portfólio além dos 4 já autorizados publicamente.
- Não referenciar subdomínios da Zedecks ainda não ativos como se estivessem em produção.
- Não commitar nenhuma credencial, chave de API ou segredo — usar variáveis de ambiente/secrets do GitHub Actions.