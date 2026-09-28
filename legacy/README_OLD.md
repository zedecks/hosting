# ZEDECK Hosting

> Este repositório é parte da organização técnica da Zedeck's IT — ver visão geral da org em [zedecks/opensource](https://github.com/zedecks/opensource) (site-vitrine) e stack de identidade em [zedecks/design-system](https://github.com/zedecks/design-system).

Plataforma de hospedagem, registro de domínios e serviços de infraestrutura da Zedeck's IT (`host.zedecks.com`).

---

## 🏗️ Estrutura & Modelo de Licenciamento Misto

Seguindo o padrão de licenciamento misto estabelecido no projeto **Nhonguista**, este repositório é segregado em duas camadas com níveis de proteção distintos:

1. **Camadas Abertas / Public-Facing:**
   - Landing pages e páginas institucionais de produtos (hospedagem compartilhada, VPS, WordPress, registro de domínios).
   - Componentes visuais do console e portal do cliente.
2. **Núcleo Fechado (Proprietário & Protegido):**
   - Lógica de provisionamento automatizado de servidores e DNS.
   - Mecanismos de faturamento, cobrança e integração com gateways de pagamento (*billing*).

---

## 📱 Repositórios & Submódulos

* **`mobile-app/` (`zedecks-hosting-app`):** Aplicativo Mobile oficial em Flutter (`v0.0.1`, package `com.zedecks.host`) gerenciado como um repositório independente / submódulo Git (port de teste `1808`).

---

## 🔒 Segurança de Faturamento & Dados Sensíveis

* **Regra R7 (AGENTS.md):** Nunca commitar lógica de billing, chaves de pagamento ou rotinas de provisionamento nas pastas destinadas a abertura pública futura.
* **Isolamento de Dados:** Dados de cartões e métodos de pagamento nunca são persistidos em texto ou manipulados fora de canais seguros com conformidade PCI.
