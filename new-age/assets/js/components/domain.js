/**
 * Clean Single Domain Search & Verification Component
 * Direct search input where user types the domain (e.g. meunegocio.com, empresa.co.mz)
 * Verifies domain availability inline without redirecting to external apps.
 * Supports popular extension pills and .co.mz multi-part TLD.
 */
export function initDomainSearch() {
  const form = document.getElementById('domainSearchForm');
  const input = document.getElementById('domainQueryInput');
  const submitBtn = document.getElementById('domainSubmitBtn');
  const resultContainer = document.getElementById('domainSearchResult');
  const extBadges = document.querySelectorAll('.ext-badge');

  if (!form || !input) return;

  // Quando o visitante clica num pill (ex: .co.mz ou .com)
  extBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const selectedTld = badge.getAttribute('data-tld');
      const currentValue = input.value.trim();

      if (!currentValue) {
        input.value = `seunegocio${selectedTld}`;
      } else {
        // Remove a extensão antiga antes de colocar a nova clicada
        const nameWithoutExtension = removeDomainExtension(currentValue);
        input.value = `${nameWithoutExtension}${selectedTld}`;
      }
      input.focus();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawValue = input.value.trim();
    if (!rawValue) {
      input.focus();
      return;
    }

    // Clean protocol, www, trailing slashes if pasted
    let domain = rawValue.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '')
      .trim();

    // Default to .com if no extension was typed
    if (!domain.includes('.')) {
      domain = domain + '.com';
    }

    if (!resultContainer) return;

    // Show loading state on button
    const isEn = document.documentElement.lang === 'en';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>${isEn ? 'Checking...' : 'A verificar...'}</span>
      `;
    }

    // Simulated lookup delay (will be connected to real WHOIS/backend API later)
    setTimeout(() => {
      const currentIsEn = document.documentElement.lang === 'en';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = currentIsEn ? 'Check Availability' : 'Verificar Disponibilidade';
      }

      // Simulated availability: if domain contains "zedeck" or "google", it's taken; otherwise available
      const isTaken = domain.includes('google') || domain.includes('zedeck') || domain.includes('facebook') || domain.includes('microsoft');

      if (!isTaken) {
        // Available
        resultContainer.style.display = 'flex';
        resultContainer.innerHTML = `
          <div class="domain-result-left">
            <div class="domain-result-icon available">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div class="domain-result-name">${escapeHtml(domain)}</div>
              <div class="domain-result-status" style="color: #34D399;" data-i18n="hero.domain_available">${currentIsEn ? '✓ Domain available for immediate registration!' : '✓ Domínio disponível para registo imediato!'}</div>
            </div>
          </div>
          <div class="domain-result-actions">
            <button type="button" class="btn-result-action primary" data-i18n="hero.register_now" onclick="alert('${currentIsEn ? 'Registration flow for domain ' + escapeHtml(domain) + ' coming soon.' : 'Excelente! Em breve o fluxo de checkout e registo do domínio ' + escapeHtml(domain) + ' estará disponível.'}')">
              ${currentIsEn ? 'Register Now' : 'Registar Agora'}
            </button>
            <button type="button" class="btn-result-action secondary" data-i18n="hero.close" onclick="document.getElementById('domainSearchResult').style.display='none';">
              ${currentIsEn ? 'Close' : 'Fechar'}
            </button>
          </div>
        `;
      } else {
        // Taken / Transferable
        resultContainer.style.display = 'flex';
        resultContainer.innerHTML = `
          <div class="domain-result-left">
            <div class="domain-result-icon taken">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div>
              <div class="domain-result-name">${escapeHtml(domain)}</div>
              <div class="domain-result-status" style="color: #FBBF24;" data-i18n="hero.domain_taken">${currentIsEn ? 'Domain already registered. Are you the owner? You can transfer it.' : 'Domínio já registado. É o titular? Pode transferi-lo.'}</div>
            </div>
          </div>
          <div class="domain-result-actions">
            <button type="button" class="btn-result-action primary" style="background: #D97706;" data-i18n="hero.transfer_domain" onclick="alert('${currentIsEn ? 'Domain transfer flow for ' + escapeHtml(domain) + ' coming soon.' : 'Excelente! Em breve a transferência guiada do domínio ' + escapeHtml(domain) + ' estará disponível.'}')">
              ${currentIsEn ? 'Transfer Domain' : 'Transferir Domínio'}
            </button>
            <button type="button" class="btn-result-action secondary" data-i18n="hero.close" onclick="document.getElementById('domainSearchResult').style.display='none';">
              ${currentIsEn ? 'Close' : 'Fechar'}
            </button>
          </div>
        `;
      }
    }, 550);
  });
}

/**
 * Remove qualquer extensão do domínio (ex: 'zedecks.co.mz' vira 'zedecks', 'empresa.com' vira 'empresa')
 */
function removeDomainExtension(domainString) {
  // Limpa protocolos, www e barras
  let clean = domainString
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .trim();

  // Trata extensões moçambicanas compostas (.co.mz, .org.mz, .net.mz, etc.)
  if (clean.includes('.mz')) {
    return clean.replace(/\.[a-z0-9-]+\.mz$/i, '').replace(/\.mz$/i, '');
  }

  // Para as demais (.com, .net, .org, etc.), pega apenas o nome antes do primeiro ponto
  if (clean.includes('.')) {
    return clean.split('.')[0];
  }

  return clean;
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}