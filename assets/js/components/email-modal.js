/**
 * Email Plan Domain Flow Modal Component
 * Intercepts "Contratar Agora" on Email Plans.
 * Offers 3 paths:
 *  1. Register New Domain (Verifies ICANN/DoH live availability).
 *  2. Transfer Existing Domain (Prepares transfer parameters).
 *  3. Use Existing Domain / Own Domain (Configures DNS instructions).
 * Redirects to WhatsApp with pre-formatted quote and domain context.
 */

import { checkDomainAvailabilityLive, removeDomainExtension, escapeHtml } from './domain.js';

let activePlanName = 'Individual';
let activePlanPrice = '200,00 MT/mês';
let activePlanStorage = '5 GB NVMe';
let activePlanMailboxes = '1 Caixa';

export function initEmailDomainModal() {
  const modal = document.getElementById('emailDomainModal');
  const closeBtn = document.getElementById('emailModalCloseBtn');
  const backdrop = modal?.querySelector('.email-modal-backdrop');
  const optionCards = document.querySelectorAll('.email-domain-opt-card');
  const stepContainer = document.getElementById('emailModalSteps');
  const formCheck = document.getElementById('emailDomainCheckForm');
  const domainInput = document.getElementById('emailDomainInput');
  const domainSubmitBtn = document.getElementById('emailDomainSubmitBtn');
  const domainResult = document.getElementById('emailDomainResult');
  const directWhatsappBtn = document.getElementById('emailModalDirectWhatsapp');

  if (!modal) return;

  // Intercept all email plan hire buttons
  const emailHireButtons = document.querySelectorAll('.email-grid .btn-plan-hire');
  emailHireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const card = btn.closest('.plan-card');
      if (card) {
        const nameEl = card.querySelector('.plan-name');
        const priceValEl = card.querySelector('.price-val');
        const priceCurrEl = card.querySelector('.price-currency');
        
        activePlanName = nameEl ? nameEl.textContent.trim() : 'Email Corporativo';
        const priceVal = priceValEl ? priceValEl.textContent.trim() : '';
        const priceCurr = priceCurrEl ? priceCurrEl.textContent.trim() : 'MT';
        activePlanPrice = priceVal ? `${priceCurr} ${priceVal}/mês` : 'Sob Consulta';
      }

      openEmailDomainModal();
    });
  });

  function openEmailDomainModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update modal title/badge with selected plan
    const planBadge = document.getElementById('emailModalPlanBadge');
    if (planBadge) {
      planBadge.textContent = `${activePlanName} • ${activePlanPrice}`;
    }

    // Reset view to options selection
    resetModalView();
  }

  function closeEmailDomainModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeEmailDomainModal);
  if (backdrop) backdrop.addEventListener('click', closeEmailDomainModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeEmailDomainModal();
    }
  });

  // Handle Domain Mode Selection (Compact Tabs)
  let currentDomainMode = 'register'; // 'register', 'transfer', 'own'
  const tabButtons = document.querySelectorAll('.email-tab-btn');

  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      tabButtons.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      currentDomainMode = tab.getAttribute('data-mode') || 'register';
      showDomainInputStep(currentDomainMode);
    });
  });

  function resetModalView() {
    tabButtons.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    if (tabButtons[0]) {
      tabButtons[0].classList.add('active');
      tabButtons[0].setAttribute('aria-selected', 'true');
    }
    currentDomainMode = 'register';
    if (domainInput) domainInput.value = '';
    if (domainResult) {
      domainResult.style.display = 'none';
      domainResult.innerHTML = '';
    }
    showDomainInputStep('register');
  }

  function showDomainInputStep(mode) {
    const descEl = document.getElementById('emailDomainStepDesc');
    const isEn = document.documentElement.lang === 'en';

    if (mode === 'register') {
      if (descEl) descEl.textContent = isEn ? 'Enter desired domain to check availability (e.g. yourbrand.co.mz):' : 'Digite o domínio que deseja registrar (ex: suaempresa.co.mz):';
      if (domainSubmitBtn) domainSubmitBtn.textContent = isEn ? 'Check Live' : 'Verificar';
    } else if (mode === 'transfer') {
      if (descEl) descEl.textContent = isEn ? 'Enter existing domain to transfer to ZEDECK:' : 'Digite o domínio existente que deseja transferir:';
      if (domainSubmitBtn) domainSubmitBtn.textContent = isEn ? 'Proceed' : 'Transferir';
    } else {
      if (descEl) descEl.textContent = isEn ? 'Enter your current domain to configure MX/DNS records:' : 'Digite o seu domínio atual para configuração de DNS/MX:';
      if (domainSubmitBtn) domainSubmitBtn.textContent = isEn ? 'Configure' : 'Configurar';
    }

    if (domainResult) domainResult.style.display = 'none';
  }

  // Handle Form Submission
  if (formCheck) {
    formCheck.addEventListener('submit', async (e) => {
      e.preventDefault();
      const rawDomain = domainInput ? domainInput.value.trim() : '';
      if (!rawDomain) {
        if (domainInput) domainInput.focus();
        return;
      }

      let domain = rawDomain.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '')
        .trim();

      if (!domain.includes('.')) {
        domain = domain + '.co.mz';
      }

      const isEn = document.documentElement.lang === 'en';

      if (currentDomainMode === 'register') {
        // Live ICANN / DNS-over-HTTPS Verification
        if (domainSubmitBtn) {
          domainSubmitBtn.disabled = true;
          domainSubmitBtn.innerHTML = `
            <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <span>${isEn ? 'Checking...' : 'A verificar...'}</span>
          `;
        }

        try {
          const isTaken = await checkDomainAvailabilityLive(domain);
          if (domainSubmitBtn) {
            domainSubmitBtn.disabled = false;
            domainSubmitBtn.textContent = isEn ? 'Check Live' : 'Verificar Disponibilidade';
          }

          if (domainResult) {
            domainResult.style.display = 'flex';
            if (!isTaken) {
              // Available
              domainResult.innerHTML = `
                <div class="domain-result-left">
                  <div class="domain-result-icon available">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div class="domain-result-name">${escapeHtml(domain)}</div>
                    <div class="domain-result-status" style="color: #34D399;">${isEn ? '✓ Domain available for registration!' : '✓ Domínio disponível para registo!'}</div>
                  </div>
                </div>
                <div class="domain-result-actions">
                  <button type="button" class="btn-result-action primary btn-send-wa">
                    ${isEn ? 'Proceed to WhatsApp' : 'Avançar para WhatsApp'}
                  </button>
                </div>
              `;

              const waBtn = domainResult.querySelector('.btn-send-wa');
              if (waBtn) {
                waBtn.addEventListener('click', () => {
                  sendToWhatsApp({
                    plan: activePlanName,
                    price: activePlanPrice,
                    domain: domain,
                    mode: 'Novo Registo de Dominio'
                  });
                });
              }
            } else {
              // Taken
              domainResult.innerHTML = `
                <div class="domain-result-left">
                  <div class="domain-result-icon taken">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div>
                    <div class="domain-result-name">${escapeHtml(domain)}</div>
                    <div class="domain-result-status" style="color: #FBBF24;">${isEn ? 'Domain already registered.' : 'Dominio ja registado.'}</div>
                  </div>
                </div>
                <div class="domain-result-actions">
                  <button type="button" class="btn-result-action secondary btn-send-wa">
                    ${isEn ? 'Use as My Domain' : 'Usar como Meu Dominio'}
                  </button>
                </div>
              `;

              const waBtn = domainResult.querySelector('.btn-send-wa');
              if (waBtn) {
                waBtn.addEventListener('click', () => {
                  sendToWhatsApp({
                    plan: activePlanName,
                    price: activePlanPrice,
                    domain: domain,
                    mode: 'Dominio Proprio (Ja Registado)'
                  });
                });
              }
            }
          }
        } catch (err) {
          if (domainSubmitBtn) {
            domainSubmitBtn.disabled = false;
            domainSubmitBtn.textContent = isEn ? 'Check Live' : 'Verificar Disponibilidade';
          }
        }
      } else if (currentDomainMode === 'transfer') {
        // Transfer Mode
        sendToWhatsApp({
          plan: activePlanName,
          price: activePlanPrice,
          domain: domain,
          mode: 'Transferência de Domínio'
        });
      } else {
        // Own Domain Mode
        sendToWhatsApp({
          plan: activePlanName,
          price: activePlanPrice,
          domain: domain,
          mode: 'Usar Domínio Existente (Apontamento DNS)'
        });
      }
    });
  }

  // Fallback direct WhatsApp inquiry button in modal footer
  if (directWhatsappBtn) {
    directWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const rawDomain = domainInput ? domainInput.value.trim() : '';
      sendToWhatsApp({
        plan: activePlanName,
        price: activePlanPrice,
        domain: rawDomain || 'A definir com o atendente',
        mode: currentDomainMode === 'transfer' ? 'Transferência' : (currentDomainMode === 'own' ? 'Domínio Próprio' : 'Novo Domínio')
      });
    });
  }

  function sendToWhatsApp(data) {
    const text = encodeURIComponent(
      `Olá ZEDECK Hosting!\n\n` +
      `Gostaria de contratar o plano de E-mail Corporativo:\n` +
      `- Plano: ${data.plan}\n` +
      `- Valor: ${data.price}\n` +
      `- Dominio: ${data.domain}\n` +
      `- Opcao de Dominio: ${data.mode}\n\n` +
      `Por favor, informem-me os passos para ativacao e dados de pagamento.`
    );

    const whatsappUrl = `https://wa.me/258877703308?text=${text}`;
    window.open(whatsappUrl, '_blank');
    closeEmailDomainModal();
  }
}
