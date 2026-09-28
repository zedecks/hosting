import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";

const TESTIMONIALS = [
  {
    rating: 5.0,
    quote: "A ZEDECK hospeda a nossa plataforma web com velocidade ultra-rápida e estabilidade exemplar. O suporte no WhatsApp responde em minutos e os discos NVMe Gen4 garantem estabilidade total nas vendas.",
    author: "Sabores da Terra Moçambique",
    role: "Hospedagem Web & Solução Digital",
    tag: "Hospedagem & Performance",
    initials: "ST",
    accentColor: "#00C2FF",
  },
  {
    rating: 4.8,
    quote: "Infraestrutura de excelência para os nossos projetos: registo veloz de domínios, caixas de e-mail e hospedagem de alta performance com cPanel oficial e isolamento CageFS.",
    author: "Spicy House",
    role: "Hospedagem Web, Domínios & cPanel",
    tag: "Hospedagem & Domínios",
    initials: "SH",
    accentColor: "#FF6C2C",
  },
  {
    rating: 4.9,
    quote: "Hospedagem impecável e e-mails corporativos com entrega garantida. Nosso catálogo digital opera com velocidade máxima, segurança reforçada e zero instabilidade.",
    author: "Zaizah Fragrances",
    role: "Hospedagem Web & E-mail Corporativo",
    tag: "Hospedagem & E-mails",
    initials: "ZF",
    accentColor: "#10b981",
  },
  {
    rating: 4.7,
    quote: "Gerenciamos domínios e dezenas de contas cPanel de clientes com a Revenda WHM Sharon e hospedagem dedicada. Infraestrutura robusta e confiável em Moçambique.",
    author: "FJ OnThis",
    role: "Hosting, Domínios & Revenda WHM",
    tag: "Hosting + Domínio + WHM",
    initials: "FJ",
    accentColor: "#38bdf8",
  },
];

export default function DemoTestimonials() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-8">
      <ScrollReelTestimonials testimonials={TESTIMONIALS} />
    </div>
  );
}
