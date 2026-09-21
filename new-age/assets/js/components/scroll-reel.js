/**
 * Scroll Reel Testimonials Component (Vanilla JS & CSS)
 * Zedeck's IT — host.zedecks.com
 *
 * Implements:
 * 1. Synchronized counter-rotating scroll reel with exact 1-to-1 client matching
 * 2. Full-bleed large brand avatars/emblems in featured tiles
 * 3. Infinite loop wrapping & autonomous autoplay (4.5s)
 * 4. Staggered per-character typography animation
 */

const CELL = 124;
const GAP = 10;
const STEP = 3 * (CELL + GAP); // 402px per step (1 tile + 2 intermediate cells)
const EXIT_MS = 240;
const SLIDE_MS = 800;
const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds

export class ScrollReelTestimonials {
  constructor(containerId = 'scrollReelWidget') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.index = 0;
    this.displayIndex = 0;
    this.virtualIndex = 0; // Tracks cumulative movements for smooth continuous sliding
    this.animating = false;
    this.autoplayTimer = null;
    this.isPaused = false;
    this.timeouts = [];

    this.testimonials = [
      {
        id: 't1',
        authorKey: 'testimonials.t1_author',
        roleKey: 'testimonials.t1_role',
        quoteKey: 'testimonials.t1_quote',
        tagKey: 'testimonials.t1_tag',
        defaultAuthor: 'Sabores da Terra Moçambique',
        defaultRole: 'Hospedagem Web & Solução Digital',
        defaultQuote: 'A ZEDECK hospeda a nossa plataforma web com velocidade ultra-rápida e estabilidade exemplar. O suporte no WhatsApp responde em minutos e os discos NVMe Gen4 garantem estabilidade total nas vendas.',
        defaultTag: 'Hospedagem & Performance',
        initials: 'ST',
        accentColor: '#00C2FF',
        bgGradient: 'linear-gradient(145deg, rgba(0, 194, 255, 0.28) 0%, rgba(14, 20, 36, 0.95) 100%)',
      },
      {
        id: 't2',
        authorKey: 'testimonials.t2_author',
        roleKey: 'testimonials.t2_role',
        quoteKey: 'testimonials.t2_quote',
        tagKey: 'testimonials.t2_tag',
        defaultAuthor: 'Spicy House',
        defaultRole: 'Hospedagem Web, Domínios & cPanel',
        defaultQuote: 'Infraestrutura de excelência para os nossos projetos: registo veloz de domínios, caixas de e-mail e hospedagem de alta performance com cPanel oficial e isolamento CageFS.',
        defaultTag: 'Hospedagem & Domínios',
        initials: 'SH',
        accentColor: '#FF6C2C',
        bgGradient: 'linear-gradient(145deg, rgba(255, 108, 44, 0.28) 0%, rgba(14, 20, 36, 0.95) 100%)',
      },
      {
        id: 't3',
        authorKey: 'testimonials.t3_author',
        roleKey: 'testimonials.t3_role',
        quoteKey: 'testimonials.t3_quote',
        tagKey: 'testimonials.t3_tag',
        defaultAuthor: 'Zaizah Fragrances',
        defaultRole: 'Hospedagem Web & E-mail Corporativo',
        defaultQuote: 'Hospedagem impecável e e-mails corporativos com entrega garantida. Nosso catálogo digital opera com velocidade máxima, segurança reforçada e zero instabilidade.',
        defaultTag: 'Hospedagem & E-mails',
        initials: 'ZF',
        accentColor: '#10b981',
        bgGradient: 'linear-gradient(145deg, rgba(16, 185, 129, 0.28) 0%, rgba(14, 20, 36, 0.95) 100%)',
      },
      {
        id: 't4',
        authorKey: 'testimonials.t4_author',
        roleKey: 'testimonials.t4_role',
        quoteKey: 'testimonials.t4_quote',
        tagKey: 'testimonials.t4_tag',
        defaultAuthor: 'FJ OnThis',
        defaultRole: 'Hosting, Domínios & Revenda WHM',
        defaultQuote: 'Gerenciamos domínios e dezenas de contas cPanel de clientes com a Revenda WHM Sharon e hospedagem dedicada. Infraestrutura robusta e confiável em Moçambique.',
        defaultTag: 'Hosting + Domínio + WHM',
        initials: 'FJ',
        accentColor: '#38bdf8',
        bgGradient: 'linear-gradient(145deg, rgba(56, 189, 248, 0.28) 0%, rgba(14, 20, 36, 0.95) 100%)',
      },
    ];

    this.count = this.testimonials.length;
    // Base cycle buffer: place the starting view on cycle index 2
    this.bufferCycles = 5;
    this.centerCycle = 2;
    this.virtualIndex = this.centerCycle * this.count; // Exact index pointing to item 0 of cycle 2

    this.render();
    this.bindEvents();
    this.startAutoplay();
  }

  getText(key, fallback) {
    if (window.i18nManager && typeof window.i18nManager.t === 'function') {
      const translated = window.i18nManager.t(key);
      if (translated && translated !== key) return translated;
    }
    return fallback;
  }

  renderChars(text, startIdx = 0, staggerMs = 5) {
    let idx = startIdx;
    const words = text.split(' ');
    return words
      .map((word, wi) => {
        const wordChars = Array.from(word)
          .map(ch => {
            const delay = idx * staggerMs;
            idx++;
            return `<span class="scroll-reel-char" style="animation-delay: ${delay}ms;">${ch}</span>`;
          })
          .join('');

        if (wi < words.length - 1) idx++;
        return `<span class="scroll-reel-word">${wordChars}</span>`;
      })
      .join(' ');
  }

  render() {
    const current = this.testimonials[this.displayIndex];
    const author = this.getText(current.authorKey, current.defaultAuthor);
    const role = this.getText(current.roleKey, current.defaultRole);
    const quote = this.getText(current.quoteKey, current.defaultQuote);
    const tag = this.getText(current.tagKey, current.defaultTag);

    // Build Reel Middle Column: 5 repeated sets of [Tile 0, Cell, Cell, Tile 1, Cell, Cell, Tile 2, Cell, Cell, Tile 3, Cell, Cell]
    let middleHtml = '';
    for (let cycle = 0; cycle < this.bufferCycles; cycle++) {
      this.testimonials.forEach((t, i) => {
        const tAuthor = this.getText(t.authorKey, t.defaultAuthor);
        middleHtml += `
          <div class="reel-featured-tile" data-cycle="${cycle}" data-index="${i}" title="${tAuthor}">
            <div class="reel-tile-full-content" style="background: ${t.bgGradient}; border-color: ${t.accentColor}55;">
              <div class="reel-large-emblem" style="color: ${t.accentColor}; text-shadow: 0 0 24px ${t.accentColor}88;">
                ${t.initials}
              </div>
              <div class="reel-tile-footer">
                <span class="reel-tile-brand">${tAuthor}</span>
              </div>
            </div>
            <div class="reel-sheen" aria-hidden="true"></div>
          </div>
          <div class="reel-cell" aria-hidden="true"></div>
          <div class="reel-cell" aria-hidden="true"></div>
        `;
      });
    }

    // Side Columns: continuous stream of spacer cells
    const totalSideCells = this.bufferCycles * this.count * 3 + 12;
    let sideHtml = '';
    for (let i = 0; i < totalSideCells; i++) {
      sideHtml += `<div class="reel-cell" aria-hidden="true"></div>`;
    }

    // Exact vertical translation: item 0 of cycle 2 is at offset `this.virtualIndex * STEP`
    const middleY = -this.virtualIndex * STEP;
    const sideY = -middleY;

    this.container.innerHTML = `
      <div class="scroll-reel-card" role="region" aria-roledescription="carousel" aria-label="Depoimentos Verificados" tabindex="0">
        
        <!-- Left Reel Window -->
        <div class="scroll-reel-window" aria-hidden="true">
          <div class="scroll-reel-columns">
            <!-- Left Counter-rotating Col -->
            <div class="reel-column reel-col-side" id="reelColLeft" style="transform: translateY(${sideY}px);">
              ${sideHtml}
            </div>
            <!-- Middle Featured Col -->
            <div class="reel-column reel-col-middle" id="reelColMiddle" style="transform: translateY(${middleY}px);">
              ${middleHtml}
            </div>
            <!-- Right Counter-rotating Col -->
            <div class="reel-column reel-col-side" id="reelColRight" style="transform: translateY(${sideY}px);">
              ${sideHtml}
            </div>
          </div>
        </div>

        <!-- Right Content Block -->
        <div class="scroll-reel-content">
          <div class="reel-content-header">
            <!-- 5 Real Authentic Golden Stars -->
            <div class="star-rating" aria-label="Avaliação 5 estrelas">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            
            <!-- Category Tag -->
            <span class="testimonial-tag" id="reelTag">${tag}</span>
          </div>

          <!-- Quote Stage with Character Stagger -->
          <div class="reel-quote-stage" id="reelQuoteStage" aria-live="polite">
            <p class="reel-quote-text" id="reelQuoteText">"${this.renderChars(quote, 0, 5)}"</p>
            <div class="reel-author-group" id="reelAuthorGroup">
              <span class="reel-author-name" id="reelAuthorName">${this.renderChars(author, quote.length + 3, 5)}</span>
              <span class="reel-author-role" id="reelAuthorRole">${role}</span>
            </div>
          </div>

          <!-- Footer Controls -->
          <div class="reel-controls-bar">
            <div class="reel-counter-text">
              <span class="text-highlight" id="reelIndexNum">${this.index + 1}</span> / ${this.count} clientes verificados
            </div>
            <div class="reel-btn-group">
              <button type="button" class="reel-nav-btn" id="reelPrevBtn" aria-label="Depoimento Anterior">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button type="button" class="reel-nav-btn" id="reelNextBtn" aria-label="Próximo Depoimento">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  paginate(dir) {
    if (this.animating) return;

    this.animating = true;
    this.virtualIndex += dir;
    this.index = (this.index + dir + this.count) % this.count;

    // 1. Move columns
    const middleY = -this.virtualIndex * STEP;
    const sideY = -middleY;

    const colMiddle = this.container.querySelector('#reelColMiddle');
    const colLeft = this.container.querySelector('#reelColLeft');
    const colRight = this.container.querySelector('#reelColRight');

    if (colMiddle) colMiddle.style.transform = `translateY(${middleY}px)`;
    if (colLeft) colLeft.style.transform = `translateY(${sideY}px)`;
    if (colRight) colRight.style.transform = `translateY(${sideY}px)`;

    // 2. Animate text exit
    const stage = this.container.querySelector('#reelQuoteStage');
    if (stage) stage.classList.add('scroll-reel-exit');

    // 3. Update counter
    const counterNum = this.container.querySelector('#reelIndexNum');
    if (counterNum) counterNum.textContent = this.index + 1;

    this.timeouts.push(
      setTimeout(() => {
        this.displayIndex = this.index;
        const current = this.testimonials[this.displayIndex];
        const author = this.getText(current.authorKey, current.defaultAuthor);
        const role = this.getText(current.roleKey, current.defaultRole);
        const quote = this.getText(current.quoteKey, current.defaultQuote);
        const tag = this.getText(current.tagKey, current.defaultTag);

        const quoteEl = this.container.querySelector('#reelQuoteText');
        const authorEl = this.container.querySelector('#reelAuthorName');
        const roleEl = this.container.querySelector('#reelAuthorRole');
        const tagEl = this.container.querySelector('#reelTag');

        if (quoteEl) quoteEl.innerHTML = `"${this.renderChars(quote, 0, 5)}"`;
        if (authorEl) authorEl.innerHTML = this.renderChars(author, quote.length + 3, 5);
        if (roleEl) roleEl.textContent = role;
        if (tagEl) tagEl.textContent = tag;

        if (stage) stage.classList.remove('scroll-reel-exit');
      }, EXIT_MS)
    );

    this.timeouts.push(
      setTimeout(() => {
        this.animating = false;

        // Reset virtual index quietly if approaching edges to maintain infinite illusion
        if (this.virtualIndex >= (this.bufferCycles - 1) * this.count || this.virtualIndex <= 0) {
          this.virtualIndex = this.centerCycle * this.count + this.index;
          const resetMiddleY = -this.virtualIndex * STEP;
          const resetSideY = -resetMiddleY;

          if (colMiddle) {
            colMiddle.style.transition = 'none';
            colMiddle.style.transform = `translateY(${resetMiddleY}px)`;
            colMiddle.offsetHeight; // force reflow
            colMiddle.style.transition = '';
          }
          if (colLeft) {
            colLeft.style.transition = 'none';
            colLeft.style.transform = `translateY(${resetSideY}px)`;
            colLeft.offsetHeight;
            colLeft.style.transition = '';
          }
          if (colRight) {
            colRight.style.transition = 'none';
            colRight.style.transform = `translateY(${resetSideY}px)`;
            colRight.offsetHeight;
            colRight.style.transition = '';
          }
        }
      }, SLIDE_MS)
    );
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused && !this.animating) {
        this.paginate(1);
      }
    }, AUTOPLAY_INTERVAL);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  resetAutoplay() {
    this.startAutoplay();
  }

  bindEvents() {
    // Buttons
    this.container.addEventListener('click', (e) => {
      const prev = e.target.closest('#reelPrevBtn');
      const next = e.target.closest('#reelNextBtn');
      if (prev) {
        this.paginate(-1);
        this.resetAutoplay();
      }
      if (next) {
        this.paginate(1);
        this.resetAutoplay();
      }
    });

    const card = this.container.querySelector('.scroll-reel-card');
    if (card) {
      // Keyboard
      card.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.paginate(1);
          this.resetAutoplay();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.paginate(-1);
          this.resetAutoplay();
        }
      });

      // Pause on hover
      card.addEventListener('mouseenter', () => {
        this.isPaused = true;
      });

      card.addEventListener('mouseleave', () => {
        this.isPaused = false;
      });

      // Pause on focus
      card.addEventListener('focusin', () => {
        this.isPaused = true;
      });

      card.addEventListener('focusout', () => {
        this.isPaused = false;
      });
    }

    // Language change observer
    window.addEventListener('languageChanged', () => {
      this.updateLanguageTexts();
    });
  }

  updateLanguageTexts() {
    const current = this.testimonials[this.displayIndex];
    const author = this.getText(current.authorKey, current.defaultAuthor);
    const role = this.getText(current.roleKey, current.defaultRole);
    const quote = this.getText(current.quoteKey, current.defaultQuote);
    const tag = this.getText(current.tagKey, current.defaultTag);

    const quoteEl = this.container.querySelector('#reelQuoteText');
    const authorEl = this.container.querySelector('#reelAuthorName');
    const roleEl = this.container.querySelector('#reelAuthorRole');
    const tagEl = this.container.querySelector('#reelTag');

    if (quoteEl) quoteEl.innerHTML = `"${this.renderChars(quote, 0, 5)}"`;
    if (authorEl) authorEl.innerHTML = this.renderChars(author, quote.length + 3, 5);
    if (roleEl) roleEl.textContent = role;
    if (tagEl) tagEl.textContent = tag;
  }
}

export function initScrollReel() {
  if (document.getElementById('scrollReelWidget')) {
    window.scrollReelInstance = new ScrollReelTestimonials('scrollReelWidget');
  }
}
