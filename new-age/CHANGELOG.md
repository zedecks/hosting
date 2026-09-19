# 📜 Changelog — ZEDECK Hosting (New Age)

Todas as alterações notáveis deste projeto são documentadas neste ficheiro.

---

## 🚀 [v0.2.5] - 2026-09-19 — Construção Modular Home (Fase 1: Hero & Domínios)

### ✨ Adicionado
- **Barra de Domínio com Feixes de Luz Laser Animados**:
  - Efeito de iluminação neon azul/ciano com dois feixes em sentidos opostos (topo: esquerda para a direita; base: direita para a esquerda).
  - Caixa com borda arredondada e foco com brilho dinâmico.
- **Pills de Extensões Populares Clicáveis (Sem Preços)**:
  - Atalhos rápidos para `.co.mz`, `.com`, `.mz`, `.net`, `.org`, `.tech`, `.io` e `.online`.
  - Clique direto no pill preenche ou substitui a extensão no campo de pesquisa automaticamente.
- **Verificação Interativa de Domínios Inline**:
  - Simulação local instantânea com estado de carregamento (*A verificar...*).
  - Feedback visual dinâmico com opções de *Registar Agora* (domínio livre) ou *Transferir Domínio* (domínio já registado) e botão de fechar.
  - Suporte completo a domínios de Moçambique (`.co.mz`, `.mz`) e internacionais.
- **Cards Glassmorphic para Métricas do Hero**:
  - 4 cartões com vidro escuro translúcido, gradiente de topo em azul neon e efeito hover (*99.99% Uptime*, *PCIe Gen4 NVMe*, *Anti-DDoS Proteção*, *24/7/365 Suporte*).

### 🔄 Alterado
- **Badge do Hero**: Atualizado para *"Excelência em Hosting & Domínios"*.
- **Título do Hero**: Simplificado e tornado persuasivo (*"Dê vida às suas ideias com a hospedagem mais rápida e segura"*).
- **Placeholder do Input**: Alterado para formato curto e direto (*"Digite o seu domínio (ex: meunegocio.com)..."*).
- **Traduções i18n (`pt.json` / `en.json`)**: Sincronizadas integralmente com o posicionamento global e as novas chaves do Hero.

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
