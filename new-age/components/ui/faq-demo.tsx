import React from 'react';
import { FAQ } from './faq-tabs';

const FAQDemo = () => {
  const categories = {
    "hosting": "Hospedagem & Servidores",
    "dev-web": "Desenvolvimento Web & Apps (Zedeck's IT)",
    "pagamentos": "Pagamentos & Ativação",
    "migracao": "Migração & Suporte"
  };

  const faqData = {
    "hosting": [
      {
        question: "Qual é a diferença entre Hospedagem Web cPanel e WordPress Turbo?",
        answer: "A Hospedagem Web cPanel padrão é ideal para múltiplos tipos de sites em PHP, HTML ou CMSs variados. Já a Hospedagem WordPress Turbo inclui o servidor web LiteSpeed com módulo LSCache ativado nativamente, banco de dados pré-otimizado e staging em 1 clique."
      },
      {
        question: "Como funciona a Revenda WHM e Servidores VPS cPanel?",
        answer: "A Revenda WHM permite criar pacotes e contas cPanel individuais 100% white-label para seus clientes com DNS próprio. Os Servidores VPS entregam recursos dedicados de CPU, RAM, NVMe Gen4 e acesso root total via SSH/KVM."
      },
      {
        question: "Os planos de hospedagem incluem Certificado SSL gratuito?",
        answer: "Sim! Todas as contas e domínios hospedados na ZEDECK contam com emissão e renovação 100% automática de certificados AutoSSL de 256 bits sem nenhum custo adicional."
      },
      {
        question: "Posso fazer upgrade de plano a qualquer momento?",
        answer: "Com certeza. O upgrade de planos de Hospedagem Web, WordPress Turbo, Revenda WHM e Servidores VPS é instantâneo com 1 clique no painel, pagando apenas a diferença pró-rata."
      }
    ],
    "dev-web": [
      {
        question: "A ZEDECK também cria sites, plataformas e sistemas sob medida?",
        answer: "Sim! Enquanto o host.zedecks.com é focado na infraestrutura de hospedagem e servidores, a divisão de engenharia de software da Zedeck's IT desenvolve websites corporativos, lojas virtuais, portais e sistemas personalizados de ponta a ponta.",
        linkText: "Conhecer projetos & solicitar orçamento no site oficial da Zedeck's IT",
        linkUrl: "https://zedecks.com"
      },
      {
        question: "Como solicitar o desenvolvimento de um site ou aplicativo?",
        answer: "Você pode agendar uma consultoria técnica no portal oficial da Zedeck's IT ou via WhatsApp comercial. Elaboramos o escopo, arquitetura, design UI/UX e entregamos a solução já homologada e hospedada em nossos servidores de alto desempenho.",
        linkText: "Acessar Zedeck's IT Solutions (zedecks.com)",
        linkUrl: "https://zedecks.com"
      },
      {
        question: "Posso hospedar um sistema desenvolvido por outra empresa ou desenvolvedor?",
        answer: "Sim, sem restrições. Nossa infraestrutura suporta PHP 8.1-8.6+, Node.js, Python/Django/Flask, bases MySQL/PostgreSQL e deploy contínuo direto via repositório Git."
      },
      {
        question: "Onde posso ver os serviços completos de consultoria e software da Zedeck's IT?",
        answer: "Todo o portfólio completo de consultoria, design de interfaces, desenvolvimento mobile e soluções empresariais está centralizado no ecossistema oficial da Zedeck's IT.",
        linkText: "Ir para zedecks.com",
        linkUrl: "https://zedecks.com"
      }
    ],
    "pagamentos": [
      {
        question: "Quais são as formas de pagamento disponíveis em Moçambique?",
        answer: "Aceitamos pagamentos locais em Meticais (MZN) através de M-Pesa, E-Mola, Transferência Bancária direta (BCI, BIM, Standard Bank, Moza Banco) e cartões de débito/crédito Visa e Mastercard."
      },
      {
        question: "Quanto tempo demora para a minha hospedagem ou domínio ser ativado?",
        answer: "A ativação é 100% imediata e automatizada para pagamentos via cartão ou referências digitais. Para depósitos bancários e transferências manuais, a ativação ocorre em menos de 15 a 30 minutos após o envio do comprovativo."
      }
    ],
    "migracao": [
      {
        question: "Como funciona a migração gratuita e sem tirar meu site do ar?",
        answer: "Nossos engenheiros cuidam de 100% da transferência: clonamos arquivos, bancos MySQL e e-mails, testamos em ambiente de staging e só depois trocamos os DNS, garantindo Zero Downtime."
      },
      {
        question: "Como funciona o suporte técnico e em quanto tempo respondem?",
        answer: "Dispomos de engenheiros de plantão 24/7/365. O nosso canal de WhatsApp possui tempo de resposta médio inferior a 15 minutos, além de suporte por ticket e telefone para contas corporativas."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <FAQ 
        title="Perguntas Frequentes & Respostas Diretas"
        subtitle="DÚVIDAS FREQUENTES & ECOSSISTEMA"
        categories={categories}
        faqData={faqData}
      />
    </div>
  );
};

export default FAQDemo;
