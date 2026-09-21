/**
 * FAQ Accordion & Category Tabs Component
 * Zedeck's IT — host.zedecks.com
 * Accessible, animated accordion with ARIA support and category tabs
 */

export function initFAQ() {
  const faqAccordion = document.getElementById('faqAccordion');
  const faqTabsNav = document.getElementById('faqTabsNav');
  if (!faqAccordion) return;

  const items = faqAccordion.querySelectorAll('.faq-item');

  // 1. Accordion items expand/collapse logic
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close other items (exclusive accordion behavior)
      items.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger && otherContent) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherItem.classList.remove('active');
            otherContent.style.maxHeight = null;
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    // Keyboard support for space and enter is native on <button>, but recalculate height on window resize
    window.addEventListener('resize', () => {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 2. Category Filter Tabs Logic
  if (faqTabsNav) {
    const tabButtons = faqTabsNav.querySelectorAll('.faq-tab-btn');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-faq-category');

        // Update active tab button state
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter accordion items
        items.forEach(item => {
          const itemCat = item.getAttribute('data-faq-cat');
          const trigger = item.querySelector('.faq-trigger');
          const content = item.querySelector('.faq-content');

          // Reset open state when filtering
          if (trigger && content) {
            trigger.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
            content.style.maxHeight = null;
          }

          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
            item.classList.add('faq-item-fade');
            setTimeout(() => item.classList.remove('faq-item-fade'), 300);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}
