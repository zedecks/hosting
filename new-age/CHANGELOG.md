# 📜 Changelog — ZEDECK Hosting (New Age)

Todas as alterações notáveis deste projeto são documentadas neste ficheiro.

## 🚀 [v0.5.1] - 2026-09-21 — Refinamento de Design: Padronização Uniforme de Ondas, Espaçamentos entre Seções & Avatares 1:1

### ✨ Adicionado
- **Arquitetura de AI-SEO, AEO & Citação por LLMs (`llms.txt` & `robots.txt`)**:
  - Criado o arquivo `llms.txt` com manifesto estruturado em Markdown descrevendo a ZEDECK Hosting, especificações de NVMe Gen4, LiteSpeed, SLA e catálogo de planos em MZN para consumo direto por agentes de IA.
  - Configurado `robots.txt` autorizando explicitamente os crawlers de IA (`GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Bingbot`) e aplicando bloqueio rígido anti-vazamento (`Disallow`) a arquivos internos de status (`/status*`, `status.html`, `status.json`, `status.py`).
- **Sitemap XML Canônico Estrito (`sitemap.xml`)**:
  - Indexação estática e bilíngue (`pt` / `en`) focada exclusivamente na página principal (`https://host.zedecks.com/`), com blindagem total de páginas de acompanhamento interno.
- **Blindagem Anti-Tracking no Painel de Status (`status.html`)**:
  - Injeção das diretivas `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` para impedir indexação por quaisquer motores de busca.
- **Structured Data Completo Schema.org (JSON-LD)**:
  - Injetado no `<head>` do `index.html` o schema com grafo para `Organization` (Zedeck's IT Solutions), `WebSite`, `WebPage`, `Product` & `Offer` (WordPress Starter, Web Premium, Revenda Sharon Pro em MZN) e `FAQPage`.
- **Fórmula Uniforme de Divisores de Onda de Rádio / Sea Wave (`.section-cloud-divider`)**:
  - Implementada a representação pura em onda vetorial suave de 3 camadas sobrepostas com cristas e vales harmoniosos conectando com precisão todas as 9 fases da landing page.
  - Alternância de fase e amplitude orgânica (*Wave Up* / *Wave Down*) replicando rigorosamente a lógica uniforme estabelecida na transição do Hero para a Fase 2.

### 🔄 Alterado
- **Espaçamento e Ritmo Vertical Uniforme entre Todas as Seções**:
  - Padronização de `padding-bottom: 0` em todas as seções com divisores, eliminando lacunas residuais e garantindo que cada divisor toque o piso da seção exatamente como no Hero.
  - Espaçamento superior do divisor (`margin-top: var(--space-12)` a `var(--space-20)`) e padding superior uniforme (`padding-top: var(--space-16)`), conferindo respiro equilibrado e consistente.
- **Estrutura do CTA de Conversão Final (`#cta-final`)**:
  - Layout horizontal orgânico diretamente contido no container fluído, com feixe superior de iluminação e tipografia de alto impacto.
- **Especificações e Links Oficiais da Loja WHMCS nos Planos de Preços (`#pricing`)**:
  - **WordPress Turbo**:
    - `STARTER`: 1 site, 3 e-mails, 10 GB NVMe (`/store/hospedagem-wordpress/starter`).
    - `STANDARD`: 1 site, 5 e-mails, 15 GB NVMe (`/store/hospedagem-wordpress/standard`).
    - `WORD PLUS`: 2 sites, 15 e-mails, 25 GB NVMe (`/store/hospedagem-wordpress/word-plus`).
  - **Hospedagem Web (cPanel®)**:
    - `PREMIUM`: 1 site, 5 e-mails, 15 GB NVMe (`/store/hospedagem-compartilhada/premium`).
    - `BUSINESS`: 1 site, 15 e-mails, 25 GB NVMe (`/store/hospedagem-compartilhada/business`).
    - `ENTERPRISE`: 2 sites, 20 e-mails, 50 GB NVMe (`/store/hospedagem-compartilhada/enterprise`).
  - **Revenda WHM (Sharon Pro)**:
    - `Sharon Pro`: 15 contas cPanel, 50 GB NVMe (`/store/revenda-de-hospedagem/sharon-pro`).
    - `Sharon Business`: 30 contas cPanel, 80 GB NVMe (`/store/revenda-de-hospedagem/sharon-business`).
    - `Sharon Enterprise`: 60 contas cPanel, 100 GB NVMe (`/store/revenda-de-hospedagem/sharon-enterprise`).
  - **VPS cPanel® Dedicado**:
    - Links diretos de contratação configurados para `Sharon cPA`, `Sharon cPB`, `Sharon cPC` e `Sharon cPD` em `/store/servers/...`.
- **Formato, Escala e Visibilidade dos Avatares de Testemunhos (`#depoimentos`)**:
  - Proporção exata **1:1 ampliada para `148px × 148px`** no carrossel lateral com monograma de destaque de `80px` (`font-size: 3rem`), bordas iluminadas e cantos arredondados de `24px`.
  - Adicionado badge de avatar 1:1 de destaque ampliado (`54px × 54px`, `font-size: 1.35rem`) junto ao grupo de identificação do autor.
- **Ícones de Avaliação Exclusivos Zedeck**:
  - Substituídas as estrelas genéricas por 5 emblemas oficiais da marca Zedecks IT, com estado ativo em **Azul Tech Neon com brilho radiante** e estado inativo em **branco suave translúcido monocromático**.

### 🗑️ Removido
- **Pontuação Numérica das Avaliações**:
  - Removido o rótulo numérico (`5.0`), exibindo exclusivamente os 5 emblemas da marca.
- **Separador de Onda entre FAQ e CTA Final**:
  - Removido o divisor de onda entre as seções `#faq` e `#cta-final`, unificando as duas áreas num fluxo contínuo e integrado que culmina na chamada de conversão antes do rodapé.
- **Invólucro de Card Fechado no CTA Final**:
  - Removida a caixa retangular delimitada (`.final-cta-card`), permitindo que a seção respire livremente sobre a ondulação de fundo.

### ⚡ Melhorado
- **Ajuste Fino de Transição entre Fases**:
  - Fechamento milimétrico sem lacunas ou frestas entre seções (`margin-bottom: -2px; pointer-events: none`).
  - Preenchimento exato da paleta Dark Matte combinando perfeitamente com os tons de cada seção subsequente.

---

## 🚀 [v0.5.0] - 2026-09-21 — Fase 9: CTA de Conversão Final, Selos de Confiança & Conclusão 100% do Roadmap

### ✨ Adicionado
- **Seção "CTA de Conversão Final & Ação Imediata" (`#cta-final`)**:
  - **Banner de Conversão Horizontal de Alto Impacto**:
    - Layout horizontal assimétrico e moderno: **Texto persuasivo, tag e título à esquerda** e **Coluna com botões duplos de ação (WhatsApp + Ver Todos os Planos) à direita**.
    - Feixe de iluminação superior ciano/esmeralda (`.final-cta-beam`), acabamento matte refinado (`rgba(14, 20, 36, 0.75)` com `backdrop-filter: blur(16px)`), borda de 1px e cantos arredondados de `24px`.
    - Tag em badge de destaque *"PRONTO PARA ACELERAR?"*.
    - Tipografia persuasiva voltada para a alta performance e estabilidade dos servidores da ZEDECK.
  - **Ações de Conversão Duplas (CTA Group)**:
    - **Botão Primário Glow WhatsApp**: Direcionamento direto para atendimento imediato com mensagem contextualizada.
    - **Botão Secundário Catálogo de Planos**: Âncora rápida com scroll suave para a Seção de Preços (`#pricing`).
  - **Grid de 4 Selos de Confiança e Garantia**:
    1. *Ativação Instantânea* (Ícone de raio ciano): Provisionamento automatizado de contas.
    2. *Migração Zero Downtime* (Ícone de transferência esmeralda): Transferência assistida sem tirar o site do ar.
    3. *Suporte Especializado 24/7/365* (Ícone de headset céu): Engenheiros dedicados em Moçambique e suporte contínuo.
    4. *Garantia de 30 Dias* (Ícone de escudo âmbar): Satisfação e reembolso assegurados.
  - **Cloud Wave Divider Orgânico SVG**:
    - Transição de ondas conectando a Seção de FAQ (`#faq`) ao CTA Final (`#cta-final`) e do CTA Final ao Rodapé do site.
  - **100% de Cobertura i18n Bilíngue (PT/EN)**:
    - Namespace `final_cta` totalmente mapeado e traduzido em `pt.json` e `en.json`.

### 🔄 Alterado
- **Sincronização Integral do Roadmap no `status.json`, `status.html` e `status.py`**:
  - **100% Concluído** (9 de 9 Fases Entregues com Sucesso).
  - Atualização da versão do projeto para **`v0.5.0`**.

### ⚡ Conclusão do Roadmap de Lançamento (9/9 Fases)
1. ✅ **Fase 1**: Hero, Navegação em Cápsula, Modal Drawer & Pesquisa de Domínios TLDs (`#hero`).
2. ✅ **Fase 2**: Nossas Soluções — 6 Pilares de Infraestrutura & Serviços (`#solucoes`).
3. ✅ **Fase 3**: Infraestrutura & Engenharia de Datacenter Tier-III+ (`#infrastructure`).
4. ✅ **Fase 4**: Catálogo Oficial de Planos & Preços em Meticais MZN (`#pricing`).
5. ✅ **Fase 5**: Migração Gratuita & Zero Downtime (`#migracao`).
6. ✅ **Fase 6**: Ecossistema de Ferramentas, cPanel® e Stacks Tecnológicas (`#tecnologias`).
7. ✅ **Fase 7**: Prova Social, Casos de Sucesso & Scroll Reel Testimonials (`#depoimentos`).
8. ✅ **Fase 8**: FAQ Interativo por Categorias & Links para Zedeck's IT (`#faq`).
9. ✅ **Fase 9**: CTA de Conversão Final, Selos de Confiança & Contato Direto (`#cta-final`).

---

## 🚀 [v0.4.5] - 2026-09-21 — Fase 8: FAQ Interativo (Perguntas Frequentes & Respostas Diretas)

### ✨ Adicionado
- **Seção "FAQ Interativo com Abas de Categorias & Links para Zedeck's IT" (`#faq`)**:
  - **Sistema de Filtro por Abas (Segmented Category Tabs)**:
    - Alternância dinâmica entre categorias: *Todas as Dúvidas*, *Hospedagem & Servidores*, *Desenvolvimento Web (Zedeck's IT)*, *Pagamentos & Ativação* e *Migração & Suporte*.
  - **Integração & Posicionamento Estratégico do Ecossistema Zedeck's IT**:
    - Dúvidas sobre desenvolvimento web, aplicativos e sistemas personalizados esclarecem que a infraestrutura pertence ao `host.zedecks.com`, direcionando projetos e orçamentos de software para o portal oficial `https://zedecks.com`.
  - **Layout Lado a Lado (2 Colunas em Grid Responsivo)**:
    - Exibição paralela em 2 colunas no Desktop e Tablet expandido (`max-width: 1200px`), com colapso responsivo fluído para 1 coluna em telas menores que `900px`.
  - **Accordion Interativo Acessível com ARIA**:
    - Suporte nativo aos atributos `aria-expanded`, `aria-controls` e `aria-labelledby`.
    - Expansão suave via `max-height` com curva de aceleração `cubic-bezier(0.16, 1, 0.3, 1)` e rotação em 180° do chevron indicador.
  - **Componentes Reutilizáveis React / shadcn**:
    - Criados `components/ui/faq-tabs.tsx` e `components/ui/faq-demo.tsx` com suporte a Tailwind CSS, framer-motion e Lucide icons.
  - **Banner de Contato Extra "Ainda tem alguma dúvida?"**:
    - Destaque com gradiente de borda cyan/emerald e CTA direto para falar com um engenheiro no WhatsApp.
  - **Divisores Cloud Wave Orgânicos SVG**:
    - Transição fluida entre Depoimentos (`#depoimentos`) e FAQ (`#faq`), e entre FAQ e o Rodapé.
  - **100% de Cobertura i18n Bilíngue (PT/EN)**:
    - Mapeamento dinâmico no namespace `faq` em `pt.json` e `en.json`.

### 🔄 Alterado
- **Sincronização de Roadmap no `status.json`, `status.html` e `status.py`**:
  - Fase 8 marcada como Concluída (Progresso elevado para **88% - 8 de 9 Fases Concluídas**).

### ⚡ Melhorado
- Performance de transição com cálculo dinâmico de `scrollHeight` e suporte a resize responsivo.

---

## 🚀 [v0.4.0] - 2026-09-21 — Fase 7: Prova Social, Casos de Sucesso & Avaliações

### ✨ Adicionado
- **Seção "Prova Social & Casos de Sucesso" (`#depoimentos`)**:
  - **Barra de Métricas de Confiança**:
    - `15+ Clientes Ativos`: Empresas, agências e profissionais atendidos com infraestrutura dedicada.
    - `99.99% Uptime Real Registado`: SLA verificado em monitoramento contínuo.
    - `3x+ Ganho de Performance`: Aceleração aferida com NVMe PCIe Gen4 e LiteSpeed.
    - `< 15min Tempo Médio de Resposta`: Atendimento técnico ágil via engenheiros dedicados.
  - **Widget Interativo Scroll Reel Testimonials (`#scrollReelWidget`)**:
    - **Variação Realista de Avaliações em Estrelas (4.7 a 5.0)**: Suporte a estrelas fracionadas com SVG dinâmico e gradiente de preenchimento, exibindo badge com nota numérica para cada cliente verificado (*Sabores da Terra: 5.0*, *Spicy House: 4.8*, *Zaizah Fragrances: 4.9*, *FJ OnThis: 4.7*).
    - **Engine de Carretel Rotativo Contra-Rotacional (3 Colunas)**: Coluna central com tiles dos clientes e colunas laterais em contra-rotação suave (`800ms` com aceleração `cubic-bezier`).
    - **Tipografia com Efeito Per-Character Rise**: Texto das citações e autores renderizado com stagger dinâmico caractere a caractere (`Chars`) e animação de saída suave (`scroll-reel-exit`).
    - **Navegação & Acessibilidade**: Botões de navegação circular anterior/próximo, contador em tempo real de clientes destacados e suporte a teclas de setas do teclado (`ArrowLeft` / `ArrowRight`).
    - **4 Casos Reais Verificados**:
      1. *Sabores da Terra Moçambique* (Badge: `Hospedagem & Performance`): Hospedagem web ultra-rápida, estabilidade exemplar com discos NVMe Gen4 e suporte dedicado.
      2. *Spicy House* (Badge: `Hospedagem & Domínios`): Registo ágil de domínios, caixas postais e hospedagem de alta performance com cPanel oficial e isolamento CageFS.
      3. *Zaizah Fragrances* (Badge: `Hospedagem & E-mails`): Hospedagem estável, e-mails corporativos com alta entregabilidade e catálogo digital seguro.
      4. *FJ OnThis* (Badge: `Hosting + Domínio + WHM`): Gestão de domínios, contas cPanel de clientes com Revenda WHM Sharon e servidores dedicados.
  - **Componente Reutilizável React / shadcn**:
    - Disponibilizado em `components/ui/scroll-reel-testimonials.tsx` e `components/ui/demo.tsx`.
  - **Cloud Wave Divider Orgânico SVG**:
    - Transição de ondas conectando a Seção de Tecnologias (`#tecnologias`) à Seção de Depoimentos (`#depoimentos`).
  - **100% de Cobertura i18n Bilíngue (PT/EN)**:
    - Mapeamento dinâmico e reativo a mudanças de idioma via `languageChanged` event.

### 🔄 Alterado
- **Sincronização de Roadmap no `status.json`, `status.html` e `status.py`**:
  - Fase 7 marcada como Concluída (Progresso elevado para 77% - 7 de 9 Fases).

### ⚡ Melhorado
- Acabamento matte com borda gradiente lateral no hover dos cartões de depoimento e avatares estilizados de alta legibilidade.

---

## 🚀 [v0.3.5] - 2026-09-21 — Fase 6: Ecossistema de Ferramentas & cPanel® Integrado

### ✨ Adicionado
- **Seção "Ecossistema de Tecnologias & cPanel" (`#tecnologias`)**:
  - **Duo de Pilares de Destaque**:
    1. *cPanel® Control Panel Líder Mundial*: Gestor de arquivos, DNS Zones, contas de e-mail ilimitadas e emissão de AutoSSL em 1 clique.
    2. *Softaculous Apps Installer (400+ Scripts)*: Instalação, clonagem, backup e restauração instantânea de WordPress, Joomla, PrestaShop, Laravel e outros CMSs.
  - **Sub-Grid Perfeito com 9 Stacks Tecnológicas Suportadas (3x3 Grid)**:
    - *PHP 8.1 ao 8.6+ & Multi-Versões*: Suporte afinado para PHP 8.1, 8.2, 8.3, 8.4, 8.5 e 8.6+ com OPcache.
    - *MySQL, MariaDB & PostgreSQL*: Bancos de dados relacionais com phpMyAdmin e phpPgAdmin.
    - *Node.js, NPM & TypeScript*: Microsserviços e aplicações modernas via Node.js Selector.
    - *Python & WSGI (Django/Flask)*: Otimização para Django, Flask, FastAPI e scripts pip.
    - *Redis & Memcached Nativo*: Cache em memória de alta vazão para sessões e bancos de dados.
    - *Ruby, Perl & Go*: Suporte a Ruby on Rails, Perl e binários compilados em Go.
    - *Versionamento Git Nativo & CI/CD*: Deploy contínuo via SSH ou interface visual cPanel.
    - *AutoSSL & Imunify360*: Proteção contra malware e certificados SSL automáticos.
    - *IA & Machine Learning Ready*: Preparado para integração de LLMs, Gemini API, OpenAI e vector DBs.
  - **Cloud Wave Divider Orgânico SVG**:
    - Transição fluida entre a Seção de Migração (`#migracao`) e a Seção de Tecnologias (`#tecnologias`).
  - **100% de Cobertura i18n Bilíngue (PT/EN)**:
    - Mapeamento completo e dinâmico no namespace `technologies` em `pt.json` e `en.json`.

### 🔄 Alterado
- **Submenus "Tools" no Header & Drawer Mobile**:
  - Adicionado atalho direto para `#tecnologias` nos submenus desktop e gaveta mobile.
- **Sincronização de Roadmap no `status.json` & `status.html`**:
  - Fase 6 marcada como Concluída (Progresso elevado para 66% - 6 de 9 Fases).

### ⚡ Melhorado
- Layout simétrico em grelha 3x3 no Desktop e 2 colunas no Tablet para máxima clareza e legibilidade.

---

## 🚀 [v0.2.6] - 2026-09-21 — Fase 5: Migração Gratuita & Zero Downtime + Hub de Status & Roadmap

### ✨ Adicionado
- **Menu "Serviços" no Header & Gaveta Mobile**:
  - Adicionado dropdown com atalhos diretos para **Migração de Sites** (`#migracao`), **Desenvolvimento Web** (`#solucoes`) e **E-mail Corporativo** (`#solucoes`) tanto na barra superior de navegação flutuante quanto no drawer modal mobile.
- **Seção de Migração Gratuita & Zero Downtime (`#migracao`)**:
  - Fluxo visual estruturado em 4 etapas:
    1. `01. Solicitação Rápida`: Envio seguro de credenciais ou backups via canal protegido.
    2. `02. Cópia em Background`: Clonagem completa de arquivos, bancos MySQL e caixas de e-mail enquanto o site permanece 100% online.
    3. `03. Auditoria de Integridade`: Validação minuciosa de links, rotas, versões de PHP e certificados SSL antes da virada de tráfego.
    4. `04. Apontamento DNS Seguro`: Troca assistida de nameservers com propagação rápida para os servidores NVMe Gen4.
  - **4 Diferenciais Técnicos em Destaque**:
    - *Zero Downtime Garantido*: Navegação e vendas ininterruptas.
    - *100% Assistida & Gratuita*: Engenheiros dedicados sem custo adicional.
    - *Compatibilidade Total*: cPanel para cPanel, WordPress, Laravel, bancos de dados MySQL e webmail.
    - *Salto de Performance*: Upgrade imediato para SSD NVMe PCIe Gen4 com aceleração LiteSpeed.
  - **Banner CTA Direto com Integração WhatsApp**:
    - Botão de ação rápida com mensagem pré-formatada para suporte e agendamento imediato.
  - **Divisor Cloud Wave Orgânico SVG**:
    - Transição estética suave entre a Seção de Preços (`#pricing`) e a Seção de Migração (`#migracao`).
  - **100% de Cobertura i18n Bilíngue (PT/EN)**:
    - Mapeamento completo e dinâmico no namespace `migration` em `pt.json` e `en.json`.
- **Painel de Controle de Roadmap & Status**:
  - `status.json`: Base centralizada de dados com as 9 fases, entregáveis, âncoras e status do projeto.
  - `status.py`: Ferramenta CLI para terminal com barra de progresso, filtros (`--pending`, `--completed`), detalhes por fase (`-p <num>`) e acionador web (`--web`).
  - `status.html`: Dashboard web visual servido em `http://localhost:1807/status.html` com filtros interativos e links diretos para cada âncora da landing page.

### 🔄 Alterado
- IDs de seções e cards normalizados para garantir âncoras perfeitas (`#solucoes`, `#solucoes-desenvolvimento`, `#solucoes-email`, `#pricing-web`, `#pricing-wordpress`, etc.).
- Offset de âncora ajustado via CSS (`scroll-margin-top: 90px`) para evitar sobreposição do header flutuante.

### ⚡ Melhorado
- Remodelação visual completa do `status.html` com padrão Matte Dark Theme e tabela com filtros reativos.

---

## 🚀 [v0.2.5] - 2026-09-19 — Construção Modular Home (Fase 1: Hero, Fase 2: Soluções, Fase 3: Infraestrutura & Fase 4: Catálogo de Planos Oficiais)

### ✨ Adicionado
- **Menu "Preços" / "Pricing" no Header (Desktop & Mobile Modal Drawer)**:
  - Adicionado link âncora direto para a seção `#pricing` na barra de navegação flutuante para desktop e no drawer móvel com ícone temático de finanças.
- **Seção de Catálogo de Planos Oficiais & Segmented Control (`#pricing`)**:
  - Segmented Control responsivo com 4 abas dinâmicas: **Hospedagem Web**, **WordPress Turbo**, **Revenda WHM** e **VPS cPanel Dedicado**.
  - Transições suaves animadas (`fadeInPricing`) e suporte total a acessibilidade ARIA (`tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`).
  - **Hospedagem Web cPanel®**:
    - `PREMIUM`: 450,00 MT/mês (1 Site, 5 E-mails, 10 GB NVMe Gen4, cPanel® Oficial, SSL Grátis).
    - `BUSINESS` *(Mais Popular)*: 750,00 MT/mês (1 Site, 10 E-mails, 20 GB NVMe Gen4, cPanel® Oficial, SSL Grátis).
    - `ENTERPRISE`: 1 000,00 MT/mês (2 Sites, 5 E-mails, 50 GB NVMe Gen4, cPanel® Oficial, SSL Grátis).
  - **Hospedagem WordPress Turbo**:
    - `STARTER`: 200,00 MT/mês (1 Site, 3 E-mails, 5 GB NVMe Gen4, Aceleração LSCache, SSL Grátis).
    - `STANDARD` *(Mais Popular)*: 450,00 MT/mês (1 Site, 5 E-mails, 10 GB NVMe Gen4, LSCache + Staging em 1 Clique, SSL Grátis).
    - `WORD PLUS`: 650,00 MT/mês (1 Site, 5 E-mails, 15 GB NVMe Gen4, LSCache + Staging em 1 Clique, SSL Grátis).
  - **Revenda WHM (Sharon Pro)**:
    - `Sharon Pro`: 500,00 MT/mês (40 GB NVMe Gen4, Contas cPanel Ilimitadas, Painel WHM White-Label, DNS Próprio, SSL Grátis).
    - `Sharon Business` *(Mais Popular)*: 800,00 MT/mês (60 GB NVMe Gen4, Contas cPanel Ilimitadas, Painel WHM White-Label, DNS Próprio, SSL Grátis).
    - `Sharon Enterprise`: 1 100,00 MT/mês (80 GB NVMe Gen4, Contas cPanel Ilimitadas, Painel WHM White-Label, DNS Próprio, SSL Grátis).
  - **VPS cPanel® Dedicado (Sharon cP)**:
    - `Sharon cPA`: 2 500,00 MT/mês (100 GB NVMe Gen4, 2 vCPU, 4 GB RAM, Acesso Root & KVM, Anti-DDoS 100Gbps+).
    - `Sharon cPB` *(Mais Popular)*: 4 500,00 MT/mês (150 GB NVMe Gen4, 4 vCPU, 8 GB RAM, Acesso Root & KVM, Anti-DDoS 100Gbps+).
    - `Sharon cPC`: 8 000,00 MT/mês (200 GB NVMe Gen4, 6 vCPU, 16 GB RAM, Acesso Root & KVM, Anti-DDoS 100Gbps+).
    - `Sharon cPD`: 10 000,00 MT/mês (250 GB NVMe Gen4, 8 vCPU, 32 GB RAM, Acesso Root & KVM, Anti-DDoS 100Gbps+).
- **Design & Cards de Alta Fidelidade (Matte & Sem Tons Roxos)**:
  - Cards com cantos generosamente arredondados (`24px`), acabamento fosco suave, bordas de 1px e destaque sutil no card *Mais Popular*.
  - Links de contratação com integração direta e mensagens contextualizadas para cada plano.
- **Divisor em Nuvem SVG (Cloud Wave Divider)**:
  - Transição orgânica suave conectando a Seção de Infraestrutura à Seção de Preços.
- **Seção de Infraestrutura & Diferenciais de Engenharia (`#infrastructure`)**:
  - Cards reestruturados com empilhamento vertical limpo: **Ícone no topo**, **Título no centro** e **Descrição na base**.
  - **Armazenamento 100% NVMe PCIe Gen4**: Taxas de transferência ultrarrápidas de até 7.000 MB/s para carregamento instantâneo.
  - **Servidores LiteSpeed & LSCache Nativo**: Arquitetura assíncrona com processamento até 300% mais veloz para WordPress e PHP.
  - **Anycast DNS & Baixa Latência**: Roteamento geo-distribuído para o nó de presença mais próximo.
  - **Segurança CageFS & Imunify360**: Isolamento rigoroso de contas com firewall ativo e proteção Anti-DDoS 100Gbps+.
  - **Backups Automáticos & Restore em 1 Clique**: Cópias de segurança diárias com retenção off-site e restauração granular.
  - **SLA 99.99% & Monitoramento 24/7/365**: Infraestrutura redundante em datacenters Tier-III+ monitorada por engenheiros.
- **Banner de Métricas de Datacenter**:
  - Indicadores globais em tempo real: `99.99% Uptime Garantido`, `100Gbps+ Mitigação Anti-DDoS`, `Ativação Instantânea` e `Datacenters Tier-III+`.
- **Design Matte Premium & Zero Tons Roxos/Violetas**:
  - Cards com cantos generosamente arredondados (`24px`), acabamento fosco e gradientes sutis em ciano elétrico, esmeralda, céu e cobalto.
- **100% de Cobertura i18n em Português e Inglês**:
  - Mapeamento completo e bilíngue em `pt.json` e `en.json`.
- **Separadores em Ondulação de Nuvem (Cloud Wave Dividers)**:
  - Divisores vetoriais orgânicos SVG posicionados nas transições estratégicas: base do Hero (Fase 1 ➔ Fase 2) e base de Soluções (Fase 2 ➔ Fase 3: Infraestrutura).
- **Seção "Nossas Soluções" (6 Pilares Sem Preços)**:
  - **Hospedagem Web cPanel®**: LiteSpeed, NVMe Gen4, SSL grátis, emails corporativos (`/hospedagem-web` — *Ver Planos*).
  - **Hospedagem WordPress Turbo**: LSCache otimizado, isolamento de segurança e staging em 1 clique (`/wordpress` — *Ver Planos*).
  - **Servidores VPS Cloud**: Armazenamento 100% NVMe, acesso Root KVM e Anti-DDoS dedicado (`/vps` — *Ver Planos*).
  - **Revenda de Hospedagem WHM**: Painel WHM líder, contas cPanel independentes e 100% white-label (`/revenda` — *Ver Planos*).
  - **E-mail Corporativo Profissional**: Caixas de correio com domínio próprio, antispam inteligente e sincronização universal (`/email-corporativo` — *Ver Planos*).
  - **Criação de Sites, Apps & Sistemas**: Desenvolvimento sob medida de websites, e-commerces, apps mobile, ferramentas e plataformas web (`/desenvolvimento` — *Solicitar Proposta*).
- **Ícones Oficiais e Badges em Todos os Cards**:
  - **cPanel® Web Hosting**: Logótipo vetorial autêntico cPanel® com marca angular em traçado oficial (`allsvgicons.com`) e acento laranja da marca (`#FF6C2C`) + Badge *"Mais Popular"* / *"Most Popular"*.
  - **WordPress Turbo**: Logótipo vetorial oficial do WordPress com W serifado e anel exterior perfeito (`allsvgicons.com`) e acento azul da marca (`#38a5e8`) + Badge *"Turbo Speed"*.
  - **VPS Cloud**: Ícone de rack de servidor e nós computacionais dedicados + Badge *"Dedicado"* / *"Dedicated"* (sem tons violetas/roxos, respeitando o padrão Dark Cyan/Cobalt).
  - **Revenda WHM**: Ícone de infraestrutura multi-tenant e gestão de contas WHM + Badge *"Marca Própria"* / *"White-Label"*.
  - **E-mail Corporativo**: Ícone de correio profissional + Badge *"Profissional"* / *"Professional"*.
  - **Criação de Sites, Apps & Sistemas**: Ícone de motor de código/desenvolvimento sob medida (`</>`) + Badge *"Sob Medida"* / *"Custom Built"*.
- **Padrão de Repositório de Ícones (@zedecks-design)**:
  - Adotado o repositório `https://allsvgicons.com/` como fonte de referência canônica para SVGs vetoriais puros, leves e inline em todo o design system.
- **Internacionalização Integral (100% de Cobertura i18n PT / EN)**:
  - Todas as tags de navegação desktop, submenus dropdown, modal drawer mobile, badges dos cards, listas de recursos técnicos e mensagens dinâmicas de disponibilidade de domínio foram totalmente mapeadas e sincronizadas em `pt.json` e `en.json`.
- **Aparência Matte Elegante & Bordas Arredondadas**:
  - Remoção de brilhos e sombras neon agressivas aos olhos em favor de acabamento fosco (matte) refinado com bordas subtis (`border: 1px solid rgba(255, 255, 255, 0.08)`).
  - Cards com cantos generosamente arredondados (`border-radius: 24px`) e ícones em recipientes suaves (`border-radius: 16px`).
  - Botões de ação orientados a rotas internas dedicadas em vez de links para o WhatsApp.
- **Barra de Domínio com Feixes de Luz Laser Animados**:
  - Efeito de iluminação neon azul/ciano com dois feixes em sentidos opostos (topo: esquerda para a direita; base: direita para a esquerda).
  - Caixa com borda arredondada e foco com brilho dinâmico.
- **Pills de Extensões Populares Clicáveis (Sem Preços)**:
  - Atalhos rápidos para `.co.mz`, `.com`, `.mz`, `.net`, `.org`, `.tech`, `.io` e `.online`.
  - Clique direto no pill preenche ou substitui a extensão no campo de pesquisa automaticamente.
- **Verificação Interativa de Domínios Inline**:
  - Simulação local instantânea com estado de carregamento (*A verificar...* / *Checking...*).
  - Feedback visual dinâmico com opções de *Registar Agora* / *Register Now* (domínio livre) ou *Transferir Domínio* / *Transfer Domain* (domínio já registado) e botão de fechar.
  - Suporte completo a domínios de Moçambique (`.co.mz`, `.mz`) e internacionais.
- **Cards Glassmorphic para Métricas do Hero**:
  - 4 cartões com vidro escuro translúcido, gradiente de topo em azul neon e efeito hover (*99.99% Uptime*, *PCIe Gen4 NVMe*, *Anti-DDoS Proteção*, *24/7/365 Suporte*).

### 🔄 Alterado
- **Badge do Hero**: Atualizado para *"Excelência em Hosting & Domínios"*.
- **Título do Hero**: Simplificado e tornado persuasivo (*"Dê vida às suas ideias com a hospedagem mais rápida e segura"*).
- **Placeholder do Input**: Alterado para formato curto e direto (*"Digite o seu domínio (ex: meunegocio.com)..."*).
- **Botões dos Cards de Produtos**: Atualizados de *"Saber Mais"* para *"Ver Planos"* (para produtos com catálogo/planos) e *"Solicitar Proposta"* (para serviços sob medida).
- **Traduções i18n (`pt.json` / `en.json`)**: Sincronizadas integralmente com 100% de cobertura entre Português e Inglês em todos os elementos visíveis e dinâmicos do site.

### 🗑️ Removido
- **Descrição Prolixa do Hero**: Removido o parágrafo de texto descritivo longo para manter o foco total na barra de busca e nas métricas.
- **Redirecionamento para WhatsApp na Busca**: Eliminado o envio forçado para o WhatsApp na verificação de domínios.
- **Folha de Estilos Externa Não Utilizada**: Removido link do CDN `flag-icons.min.css` em favor dos assets SVG locais.
- **Classes e Estilos Órfãos**: Limpeza rigorosa em `components.css`, `base.css`, `animations.css` e `responsive.css`.

### ⚡ Melhorado
- **Responsividade Mobile-First do Hero**:
  - Grelha das métricas adaptada perfeitamente: 2 colunas em mobile e 4 colunas em tablet/desktop.
  - Ajuste dinâmico de preenchimento, tipografia e espaçamento em todas as resoluções.
- **Legibilidade e Clean Code no Módulo `domain.js`**:
  - Função auxiliar `removeDomainExtension()` dedicada e limpa para troca inteligente de extensões.

---

## 🚀 [v0.2.4] - 2026-09-19 — Refatoração Clean Code & Preservação de Header e Footer

### 🧹 Limpeza & Reestruturação
- **Sanitização do Main (`index.html`)**: Esvaziamento do conteúdo do `<main>` para reconstrução modular sob os dogmas de design `@zedecks-design` (v0.3.0).
- **Preservação dos Componentes Base**:
  - **Header Flutuante em Cápsula**: Navegação limpa, logotipo oficial Zedeck's IT, menu dropdown e drawer modal mobile totalmente funcionais.
  - **Footer Corporativo**: Ecossistema Zedecks, contactos, morada oficial e seletor circular de idioma.
- **Remoção de Módulos Não Utilizados**: Eliminação de scripts e estilos temporários (`domain.js`, `faq.js`, `form.js`, `tabs.js`).
- **Sincronização Estrita do i18n (`pt.json` / `en.json`)**: Chaves de tradução filtradas estritamente para os elementos em uso ativo.

---

## 🚀 [v0.2.3] - 2026-09-19 — Posicionamento Internacional, Otimização Estrutural & Catálogo Unificado

### ✨ Adicionado
- **Hero Domain Box Interativo**: Barra de verificação de domínios com abas de ação (`Registrar`, `Transferir`, `WHOIS`), seletor de extensão (`.com`, `.co.mz`, `.mz`, `.org`, `.net`, `.io`, `.online`) e pills rápidos sem preços visíveis.
- **Clientes & Casos de Uso com Depoimentos Reais**: 4 cartões de depoimentos de clientes verificados (*Sabores da Terra*, *Spicy House*, *Zaizah Fragrance*, *Nicol Store*) com classificação de 5 estrelas e métricas de desempenho.
- **Esclarecimentos Técnicos em Grelha 2-Colunas**: 8 perguntas frequentes estruturadas lado a lado cobrindo ativação instantânea, NVMe Gen4, migração sem downtime, Anycast DNS, SSL e backup.
- Posicionamento global e internacional da infraestrutura em todos os conteúdos e traduções (PT / EN).
- Endereço institucional da sede física (`Av. do Trabalho, Nampula`) e e-mail corporativo oficial (`info@zedecks.com`).

### 🔄 Alterado
- **Catálogo de Planos (Segmented Control)**: Menu de abas simplificado e unificado com controle segmentado horizontal destacando a categoria ativa (`Compartilhada`, `WordPress`, `VPS cPanel Dedicado`, `Revenda`).
- **Remoção de Elementos Desnecessários**: Eliminação do formulário `#contact` (substituído por CTAs diretos via WhatsApp), remoção da categoria *VPS Processador Dedicado* e eliminação de blocos/grelhas artificiais de badges.
- Substituição integral de copywriting genérico de IA por métricas reais e especificações técnicas de datacenters (PCIe Gen4 NVMe, Anycast DNS, CageFS, SLA 99.99%).
- **Soluções Corporativas**: Blocos informativos limpos e compactos sem sub-botões excessivos.

### ⚡ Melhorado
- Densidade visual e clareza do catálogo de planos, portfólio oficial e canais de suporte.
- Interatividade fluida e responsividade mobile-first completa em todas as resoluções.

---

## 🚀 [v0.2.2] - 2026-09-19 — Responsividade Mobile-First & Ações Rápidas

### ✨ Adicionado
- Modal Drawer Flutuante de navegação para dispositivos móveis com estrutura dividida em `MENU`, `ACESSO` (botões duplos lado a lado) e rodapé com identidade visual e botão circular de fecho `(X)`.
- Suporte a acordeão inteligente com rotação suave de chevrons para submenus (Domínios, Produtos e Tools).
- Arquitetura de estilos dedicada para responsividade em dispositivos móveis e tablets (`responsive.css`).
- Botões de ação em formato circular com ícones dedicados para Mobile e Tablet.

### 🔄 Alterado
- Seletor de idioma relocalizado do cabeçalho para a área inferior do rodapé.
- Botões de ação do cabeçalho ("Área do Cliente" e "Vamos Conversar!") compactados em formato de ícone em resoluções móveis e tablets, mantendo o texto completo em Desktop.

### ⚡ Melhorado
- Adaptação fluida das grelhas de métricas, catálogo de planos e formulário de contacto para todos os formatos de ecrã.
- Animação do botão de menu hambúrguer e experiência de toque em dispositivos móveis.

---

## 🚀 [v0.2.1] - 2026-09-18 — Identidade Visual & Alternador de Idioma Circular

### ✨ Adicionado
- Favicon e ícone oficial da Zedeck's IT com suporte a temas claro e escuro.
- Conjunto de ícones vetoriais em formato circular para bandeiras de idiomas.

### ⚡ Melhorado
- Alternador de idioma otimizado em botão circular único com transição dinâmica de bandeiras.

---

## 🚀 [v0.2.0] - 2026-09-18 — Lançamento da Nova Geração Web (New Age)

### ✨ Adicionado
- Estrutura base da plataforma New Age com HTML5, CSS3 e JavaScript Vanilla modular.
- Barra de navegação em formato de cápsula flutuante translúcida com efeitos de desfoque.
- Catálogo de planos de alojamento web e servidores com preços em meticais (MZN).
- Formulário de captação de leads e integração com suporte técnico oficial.
- Design system completo com tokens de cor *Tech Blue Neon*, tipografia *Space Grotesk* e *Inter*.
