# ZEDECK Hosting (host.zedecks.com) — New Age

> Landing page institucional e catálogo de serviços de hospedagem e infraestrutura da **Zedeck's IT** (Nampula, Moçambique).

---

## 1. 🌐 Visão Geral

Este repositório contém o código-fonte da landing page pública oficial de serviços de Hosting da **Zedeck's IT** (`host.zedecks.com`). Apresenta os planos e soluções de infraestrutura (Hospedagem Compartilhada, Hospedagem WordPress, Servidores VPS e Revenda cPanel), formulário de captação de leads e prova social oficial.

---

## 2. 🏛️ Arquitetura & Isolamento

Seguindo o princípio de isolamento (*blast radius*) do ecossistema Zedeck's IT:
- **Repositório Autocontido:** Totalmente desacoplado de sistemas internos (`dashboard`, `core`, `accounts`).
- **Sem Autenticação Nesta Fase:** Plataforma estritamente pública e estática. Painel de cliente *self-service* faz parte da **Fase 2** (projeto separado).
- **Sem Lógica de Faturamento:** Não processa pagamentos ou cartões diretamente no cliente.

---

## 3. ⚡ Stack Tecnológica

- **Frontend:** HTML5 Semântico, CSS3 Moderno (Vanilla com Design Tokens), JavaScript (ES6+ Modular).
- **Rede & Proteção:** Cloudflare (DNS, CDN, WAF, SSL Full Strict, Cache).
- **Servidor:** Auto-hospedado na infraestrutura Zedeck's IT.

---

## 4. 📁 Estrutura de Diretórios

```
new-age/
├── index.html                  # Landing Page Principal
├── README.md                   # Documentação do Projeto
├── SECURITY.md                 # Políticas e Práticas de Segurança
├── LICENSE                     # Termos de Licenciamento
├── assets/
│   ├── css/
│   │   ├── tokens.css          # Design Tokens (Cores, Tipografia, Espaçamentos)
│   │   ├── base.css            # Reset, Tipografia e Estrutura Global
│   │   ├── components.css      # Componentes (Navbar, Cards, Tabelas, Formulários)
│   │   └── animations.css      # Transições e Animações CSS Puras
│   ├── js/
│   │   ├── main.js             # Inicialização e Scroll Reveal
│   │   ├── components/         # Módulos JS (i18n, Form, Tabs)
│   │   └── i18n/               # Ficheiros de Tradução (pt.json, en.json)
│   └── img/                    # Assets Gráficos e Imagens Otimizadas
└── .github/workflows/
    └── deploy.yml              # Pipeline de CI/CD para Produção
```

---

## 5. 🔒 Segurança & Não-Negociáveis

- **HTTPS Obrigatório:** Configuração Cloudflare SSL modo *Full (Strict)*.
- **Zero Segredos:** Nenhuma chave de API, credencial ou segredo em repositório.
- **Segurança de Cabeçalhos:** Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- **Canal de Leads Seguro:** Não há persistência de dados sensíveis desprotegidos no cliente.

Consulte [SECURITY.md](file:///d:/ZEDECKLAB/ZedecksProjects/zedecks/hosting/new-age/SECURITY.md) para diretrizes completas de reporte de vulnerabilidades.

---

## 6. 🚀 Setup & Execução Local

```bash
# Executar servidor local de desenvolvimento (Porta padrão 1807):
python -m http.server 1807
# ou via npx serve
npx serve -l 1807 .
```

Aceder em: `http://localhost:1807`

---

## 7. 🧪 Testes & Validação

- Validação HTML5 W3C.
- Auditoria Lighthouse (Score 90+ em Performance, Acessibilidade, Melhores Práticas e SEO).
- Responsividade testada nos breakpoints: `360px`, `768px`, `1024px`, `1440px`.

---

## 8. 🔄 CI/CD & Deploy

- Integração contínua via GitHub Actions (`.github/workflows/deploy.yml`).
- Deploy automatizado para a infraestrutura `host.zedecks.com` após validação da branch `main`.

---

## 9. 👥 Governança & Ownership

- **Responsável Geral & Engenharia:** Edmilson Muacigarro (CEO / Lead Developer)
- **Apoio Criativo & Design:** Leoltino Muacigarro / ZN CreativeStudio
- **Assinatura:** *Made by Zedeck's IT.*

---

## 10. 🗺️ Roadmap

- [x] **Fase 0:** Scaffold, Design Tokens e Fundação.
- [x] **Fase 1:** Conteúdo Semântico, Estrutura e Tabelas de Planos em MZN.
- [x] **Fase 2:** Componentes Visuais, Design Responsivo e CSS Modular.
- [x] **Fase 3:** Sistema de Internacionalização (i18n PT/EN) e Interações JS.
- [x] **Fase 4:** Fluxo de Lead e Integração com Suporte WhatsApp.
- [ ] **Fase 5:** Cloudflare DNS, CDN e Headers de Segurança.
- [ ] **Fase 6:** Otimização Lighthouse e SEO Estruturado.
- [ ] **Fase 7:** CI/CD com GitHub Actions.
- [ ] **Fase 8:** Governança e Fecho.
- [ ] **Fase 2 (Futuro / Outro Projeto):** Portal do Cliente e Painel *Self-Service*.
