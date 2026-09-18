/**
 * Lead Form Handler
 * Integration with official WhatsApp support (+258 87 770 3308)
 * TODO: migrar para notify.zedecks.com quando disponível
 */
export function initLeadForm() {
  const form = document.getElementById('leadForm');
  if (!form) return;

  // Plan select auto-fill from CTA buttons
  document.querySelectorAll('[data-select-plan]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-select-plan');
      const selectEl = document.getElementById('leadPlan');
      if (selectEl && planName) {
        selectEl.value = planName;
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('leadName')?.value.trim();
    const email = document.getElementById('leadEmail')?.value.trim();
    const phone = document.getElementById('leadPhone')?.value.trim();
    const plan = document.getElementById('leadPlan')?.value.trim();
    const message = document.getElementById('leadMessage')?.value.trim();

    if (!name || !email || !phone) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Telefone).');
      return;
    }

    // Format WhatsApp message
    const waPhone = '258877703308';
    let text = `*Olá, Equipe Zedeck's IT!*\n\n`;
    text += `Gostaria de solicitar informações/contratação de infraestrutura:\n`;
    text += `👤 *Nome:* ${name}\n`;
    text += `📧 *E-mail:* ${email}\n`;
    text += `📱 *Telefone:* ${phone}\n`;
    if (plan) text += `📦 *Plano/Interesse:* ${plan}\n`;
    if (message) text += `💬 *Mensagem/Requisitos:* ${message}\n`;
    text += `\n_Enviado através de host.zedecks.com_`;

    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
    
    // Redirect / open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}
