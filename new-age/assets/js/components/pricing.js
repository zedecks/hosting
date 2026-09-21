/**
 * Pricing Component — Segmented Control Tabs
 * Dogma v0.3.0 / Clean Code Standard
 */

export function initPricingTabs() {
  const tabButtons = document.querySelectorAll('.pricing-tab-btn');
  const panels = document.querySelectorAll('.pricing-panel');

  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update button active states and ARIA attributes
      tabButtons.forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update tab panels
      panels.forEach(panel => {
        const isTarget = panel.id === `pricing-panel-${targetTab}`;
        if (isTarget) {
          panel.removeAttribute('hidden');
          panel.classList.add('active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('active');
        }
      });
    });
  });
}
