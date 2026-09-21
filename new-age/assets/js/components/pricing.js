/**
 * Pricing Component — Segmented Control Tabs & Hash Routing
 * Dogma v0.3.0 / Clean Code Standard
 */

export function switchPricingTab(targetTab) {
  const tabButtons = document.querySelectorAll('.pricing-tab-btn');
  const panels = document.querySelectorAll('.pricing-panel');

  if (!tabButtons.length || !panels.length) return;

  // Normalize tab key (e.g., 'pricing-web' -> 'web', 'wordpress' -> 'wordpress')
  const cleanTab = targetTab.replace(/^#?pricing-panel-/, '').replace(/^#?pricing-/, '');

  tabButtons.forEach(btn => {
    const isActive = btn.getAttribute('data-tab') === cleanTab;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  panels.forEach(panel => {
    const isTarget = panel.id === `pricing-panel-${cleanTab}`;
    if (isTarget) {
      panel.removeAttribute('hidden');
      panel.classList.add('active');
    } else {
      panel.setAttribute('hidden', '');
      panel.classList.remove('active');
    }
  });
}

export function initPricingTabs() {
  const tabButtons = document.querySelectorAll('.pricing-tab-btn');
  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      if (targetTab) {
        switchPricingTab(targetTab);
      }
    });
  });

  // Check URL hash on initial page load
  const hash = window.location.hash.toLowerCase();
  if (hash.startsWith('#pricing-')) {
    const tabName = hash.replace('#pricing-', '');
    switchPricingTab(tabName);
  }
}
