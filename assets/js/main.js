/**
 * Main Application Entry Point
 * Zedeck's IT — host.zedecks.com
 * Clean Code Standard: Header, Mobile Modal Drawer, i18n
 */
import { I18nManager } from './components/i18n.js';
import { initDomainSearch } from './components/domain.js';
import { initPricingTabs, switchPricingTab } from './components/pricing.js';
import { initScrollReel } from './components/scroll-reel.js';
import { initFAQ } from './components/faq.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Internationalization (i18n)
  const i18n = new I18nManager();

  // 2. Initialize Domain Search & Verification
  initDomainSearch();

  // 3. Initialize Official Pricing Plans & Segmented Control
  initPricingTabs();

  // 4. Initialize Scroll Reel Social Proof Widget
  initScrollReel();

  // 5. Initialize Interactive FAQ Accordion & Category Tabs
  initFAQ();

  // 6. Dynamic Copyright Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 7. Smooth Scroll & Intelligent Anchor Routing
  function scrollToTarget(targetId) {
    if (!targetId || targetId === '#') return;

    // Check if it's a specific pricing tab link (e.g., #pricing-web, #pricing-wordpress)
    if (targetId.startsWith('#pricing-')) {
      const tabKey = targetId.replace('#pricing-', '');
      switchPricingTab(tabKey);
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Direct element search
    let targetElement = document.querySelector(targetId);

    // Fallback aliases if needed
    if (!targetElement) {
      if (targetId === '#solucoes') targetElement = document.getElementById('solutions') || document.getElementById('solucoes');
      if (targetId === '#solutions') targetElement = document.getElementById('solucoes') || document.getElementById('solutions');
      if (targetId === '#infraestrutura') targetElement = document.getElementById('infrastructure');
      if (targetId === '#precos') targetElement = document.getElementById('pricing');
      if (targetId === '#migration') targetElement = document.getElementById('migracao');
      if (targetId === '#dominio') targetElement = document.getElementById('domainSearchForm') || document.getElementById('hero');
    }

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        scrollToTarget(targetId);
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Handle direct navigation with hash on page load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToTarget(window.location.hash);
    }, 150);
  }

  // 7. Mobile Modal Drawer System
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavModal = document.getElementById('mobileNavModal');
  const mobileModalCloseBtn = document.getElementById('mobileModalCloseBtn');
  const DESKTOP_BREAKPOINT = 1080;

  function isMobile() {
    return window.innerWidth < DESKTOP_BREAKPOINT;
  }

  function toggleMobileMenu() {
    const isOpen = mobileNavModal?.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    if (!mobileNavModal) return;
    mobileNavModal.inert = false;
    mobileNavModal.removeAttribute('aria-hidden');
    mobileNavModal.classList.add('open');
    mobileMenuBtn?.classList.add('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileNavModal) return;
    
    // Release focus from inside modal before setting inert
    if (mobileNavModal.contains(document.activeElement)) {
      if (mobileMenuBtn) {
        mobileMenuBtn.focus();
      } else if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }

    mobileNavModal.classList.remove('open');
    mobileNavModal.inert = true;
    mobileMenuBtn?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Close accordions
    mobileNavModal.querySelectorAll('.mobile-nav-accordion.open').forEach(acc => {
      acc.classList.remove('open');
      const trigger = acc.querySelector('.mobile-accordion-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  // Hamburger button click
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Modal close button (X)
  if (mobileModalCloseBtn) {
    mobileModalCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Backdrop overlay click
  if (mobileNavModal) {
    mobileNavModal.addEventListener('click', (e) => {
      if (e.target === mobileNavModal) {
        closeMobileMenu();
      }
    });

    // Mobile Accordion Items Logic
    const accordions = mobileNavModal.querySelectorAll('.mobile-nav-accordion');
    accordions.forEach(accordion => {
      const trigger = accordion.querySelector('.mobile-accordion-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = accordion.classList.contains('open');

          accordions.forEach(other => {
            if (other !== accordion) {
              other.classList.remove('open');
              const otherTrigger = other.querySelector('.mobile-accordion-trigger');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            }
          });

          accordion.classList.toggle('open', !isOpen);
          trigger.setAttribute('aria-expanded', !isOpen);
        });
      }
    });

    // Close modal when mobile nav link clicked
    mobileNavModal.querySelectorAll('a.mobile-nav-link, a.mobile-submenu-link, a.btn-mobile-access').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavModal?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Desktop Dropdowns interaction
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const btn = item.querySelector('button.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isMobile()) {
          const isVisible = dropdown.style.visibility === 'visible';
          document.querySelectorAll('.dropdown-menu').forEach(d => {
            d.style.opacity = '';
            d.style.visibility = '';
            d.style.pointerEvents = '';
            d.style.transform = '';
          });
          document.querySelectorAll('.nav-item button.nav-link').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
          });

          if (!isVisible) {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.pointerEvents = 'auto';
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
            btn.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.dropdown-menu').forEach(d => {
        d.style.opacity = '';
        d.style.visibility = '';
        d.style.pointerEvents = '';
        d.style.transform = '';
      });
      document.querySelectorAll('.nav-item button.nav-link').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
    if (isMobile() && !e.target.closest('.site-header')) {
      closeMobileMenu();
    }
  });
});
