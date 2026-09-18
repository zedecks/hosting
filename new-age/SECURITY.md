# Política de Segurança — Zedeck's IT

## 1. Âmbito do Repositório

Este repositório (`host.zedecks.com` / `hosting`) contém exclusivamente código frontend público da landing page institucional de Hosting.

- Não contém APIs de autenticação ou banco de dados.
- Não contém credenciais de acesso ou faturamento.

---

## 2. Padrões de Segurança Aplicados

1. **HTTPS Obrigatório:** Toda a comunicação é assegurada via TLS 1.3 gerenciado por Cloudflare em modo *Full (Strict)*.
2. **Cabeçalhos de Segurança HTTP:**
   - `Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; script-src 'self';`
   - `X-Frame-Options: SAMEORIGIN`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
3. **Sem Exposição de Chaves:** Chaves de API de terceiros ou formulários são protegidas via variáveis de ambiente nos pipelines de build/deploy.

---

## 3. Reporte Responsável de Vulnerabilidades

Se identificar qualquer problema de segurança, solicitamos que reporte diretamente à equipe de engenharia da **Zedeck's IT**:

- **E-mail de Segurança:** `security@zedecks.com` / `info@zedecks.com`
- **Contacto Telefónico / WhatsApp:** `+258 87 770 3308`
- **Prazo de Resposta Inicial:** Até 48 horas úteis.

Pedimos que não divulgue publicamente qualquer vulnerabilidade antes da mitigação oficial.
