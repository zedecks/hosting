/**
 * Domain Search & Lookup Handler
 */
export function initDomainSearch() {
  const tabs = document.querySelectorAll('.domain-tab-btn');
  const form = document.getElementById('domainSearchForm');
  const queryInput = document.getElementById('domainQueryInput');
  const extSelect = document.getElementById('domainExtSelect');
  const pills = document.querySelectorAll('.tld-pill');

  let currentAction = 'register'; // 'register', 'transfer', 'whois'

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentAction = tab.getAttribute('data-action') || 'register';
    });
  });

  // TLD pill click sets extension select
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const tld = pill.getAttribute('data-tld');
      if (extSelect && tld) {
        extSelect.value = tld;
        if (queryInput) {
          queryInput.focus();
        }
      }
    });
  });

  // Search submission -> redirect to direct WhatsApp query / portal
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const domainName = queryInput ? queryInput.value.trim() : '';
      const ext = extSelect ? extSelect.value : '.com';

      if (!domainName) {
        if (queryInput) queryInput.focus();
        return;
      }

      // Clean domain name if user typed with extension or protocol
      let cleanDomain = domainName.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/\/.*$/, '')
        .trim();

      if (!cleanDomain.includes('.')) {
        cleanDomain = cleanDomain + ext;
      }

      const waPhone = '258877703308';
      let actionLabel = 'Registo / Disponibilidade';
      if (currentAction === 'transfer') actionLabel = 'Transferência de Domínio';
      if (currentAction === 'whois') actionLabel = 'Consulta WHOIS / Diagnóstico DNS';

      const msg = `*Olá, Equipe Zedeck's IT!*\n\nGostaria de solicitar verificação de domínio:\n🌐 *Domínio:* ${cleanDomain}\n⚡ *Ação:* ${actionLabel}\n\n_Enviado através de host.zedecks.com_`;
      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}
