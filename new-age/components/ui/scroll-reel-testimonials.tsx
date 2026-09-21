"use client";

import * as React from "react";

/* ----------------------------------------------------------------
 * ScrollReelTestimonials
 *
 * Synchronized counter-rotating scroll reel + per-character text rise.
 * - 1-to-1 sync between featured portrait and quote/author
 * - Large full-bleed brand emblems/avatars
 * - Authentic 5 golden stars
 * - Infinite loop wrapping & autonomous autoplay (4.5s)
 * ---------------------------------------------------------------- */

export interface ScrollReelTestimonial {
  /** The quote text */
  quote: string;
  /** Author name shown below the quote */
  author: string;
  /** Role / service description */
  role?: string;
  /** Tag / badge name */
  tag?: string;
  /** Rating score from 1.0 to 5.0 (e.g., 4.8, 5.0) */
  rating?: number;
  /** Portrait image URL or avatar initials for the featured tile */
  image?: string;
  /** Initials fallback when image is not provided */
  initials?: string;
  /** Accent color */
  accentColor?: string;
  /** Background gradient */
  bgGradient?: string;
  /** Optional alt text for the portrait */
  alt?: string;
}

export interface ScrollReelTestimonialsProps {
  /** Testimonials to cycle through */
  testimonials: ScrollReelTestimonial[];
  /** Per-character stagger in ms (default 5) */
  charStaggerMs?: number;
  /** Enable autonomous autoplay (default true) */
  autoplay?: boolean;
  /** Autoplay interval in ms (default 4500) */
  autoplayInterval?: number;
  /** Extra classes for the outer container */
  className?: string;
}

/* Geometry — pitch between portrait centers:
 * 3 * (cell 124px + gap 10px) = 402px */
const CELL = 124;
const GAP = 10;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const QUOTE_CLASSES =
  "m-0 text-lg font-medium leading-[1.45] tracking-[-0.01em] text-slate-100 sm:text-[20px] font-sans italic";
const AUTHOR_CLASSES =
  "m-0 text-sm font-semibold leading-[1.3] text-cyan-400";
const ROLE_CLASSES =
  "m-0 text-xs text-slate-400";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* Blurred placeholder cell */
function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-[18px] border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/90 blur-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

/* Featured brand tile with large full-bleed emblem */
function Featured({ item }: { item: ScrollReelTestimonial }) {
  const accent = item.accentColor || "#00C2FF";
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[18px] bg-slate-950 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.7),0_0_25px_rgba(0,194,255,0.2)]"
      style={{ width: CELL, height: CELL }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-between p-2.5 border border-cyan-500/30 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        style={{
          background:
            item.bgGradient ||
            `linear-gradient(145deg, ${accent}44 0%, rgba(14,20,36,0.95) 100%)`,
          borderColor: `${accent}66`,
        }}
      >
        <div
          className="text-4xl font-black tracking-tight leading-none mt-3"
          style={{ color: accent, textShadow: `0 0 24px ${accent}88` }}
        >
          {item.initials || item.author.slice(0, 2).toUpperCase()}
        </div>
        <div className="w-full text-center">
          <span className="block text-[11px] font-bold text-slate-200 truncate max-w-full px-1">
            {item.author}
          </span>
        </div>
      </div>

      {/* Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] blur-[4px] mix-blend-overlay"
        style={{
          background:
            "linear-gradient(220.99deg, rgba(0,194,255,0) 32%, rgba(0,194,255,0.4) 41%, rgba(16,185,129,0.5) 47%, rgba(56,189,248,0.3) 54%, rgba(0,194,255,0) 65%)",
        }}
      />
    </div>
  );
}

/* Per-character split */
function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char inline-block"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 5,
  autoplay = true,
  autoplayInterval = 4500,
  className,
}: ScrollReelTestimonialsProps) {
  const count = testimonials.length;
  const centerCycle = 2;
  const bufferCycles = 5;

  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [virtualIndex, setVirtualIndex] = React.useState(centerCycle * count);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      animating.current = true;

      const next = (index + dir + count) % count;
      setIndex(next);
      setVirtualIndex((prev) => prev + dir);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );

      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  // Autonomous autoplay
  React.useEffect(() => {
    if (!autoplay || isPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, isPaused, autoplayInterval, paginate]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  /* 5 cycles of [Tile, Cell, Cell] */
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number; key: string }> = [];
    for (let cycle = 0; cycle < bufferCycles; cycle++) {
      testimonials.forEach((_, i) => {
        items.push({ type: "featured", i, key: `${cycle}-${i}` });
        items.push({ type: "cell" }, { type: "cell" });
      });
    }
    return items;
  }, [testimonials, bufferCycles]);

  const sideCellCount = bufferCycles * count * 3 + 12;
  const middleY = -virtualIndex * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = testimonials[displayIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={cn(
        "relative flex w-full max-w-[1060px] mx-auto flex-col items-stretch gap-4 overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/85 shadow-2xl outline-none backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-cyan-500 md:min-h-[360px] md:flex-row",
        className
      )}
    >
      {/* Reel window */}
      <div
        aria-hidden="true"
        className="relative h-60 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[380px] bg-slate-950/40 border-b md:border-b-0 md:border-r border-slate-800/60"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div
          className="absolute left-0 right-0 flex items-center justify-center gap-2.5"
          style={{ top: "50%", marginTop: `-${CELL / 2}px` }}
        >
          {/* Left column */}
          <div
            className="flex shrink-0 flex-col gap-2.5 will-change-transform"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          {/* Middle column */}
          <div
            className="flex shrink-0 flex-col gap-2.5 will-change-transform"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured key={item.key} item={testimonials[item.i]} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column */}
          <div
            className="flex shrink-0 flex-col gap-2.5 will-change-transform"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-6 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Dynamic Star Rating with Numeric Badge */}
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1" aria-label={`Avaliação ${(current.rating ?? 5.0).toFixed(1)} de 5 estrelas`}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = current.rating ?? 5.0;
                  const full = rating >= i + 1;
                  const partial = !full && rating > i;
                  const pct = Math.round((rating - i) * 100);
                  const gradId = `star-grad-${current.author.replace(/\s+/g, '')}-${i}`;

                  if (full) {
                    return (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                        viewBox="0 0 24 24"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    );
                  }

                  if (partial) {
                    return (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id={gradId}>
                            <stop offset={`${pct}%`} stopColor="#f59e0b" />
                            <stop offset={`${pct}%`} stopColor="rgba(255, 255, 255, 0.15)" />
                          </linearGradient>
                        </defs>
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          fill={`url(#${gradId})`}
                        />
                      </svg>
                    );
                  }

                  return (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-white/15"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded-md font-sans">
                {(current.rating ?? 5.0).toFixed(1)}
              </span>
            </div>

            {current.tag && (
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {current.tag}
              </span>
            )}
          </div>

          {/* Text stage */}
          <div
            className="relative w-full max-w-[540px] overflow-hidden min-h-[140px]"
            aria-live="polite"
          >
            <div
              aria-hidden="true"
              className="invisible flex min-h-[120px] flex-col gap-3"
            >
              <p className={QUOTE_CLASSES}>{current.quote}</p>
              <div>
                <p className={AUTHOR_CLASSES}>{current.author}</p>
                {current.role && <p className={ROLE_CLASSES}>{current.role}</p>}
              </div>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-4 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit"
              )}
            >
              <p className={QUOTE_CLASSES}>
                "{Chars({
                  text: current.quote,
                  startIndex: 0,
                  staggerMs: charStaggerMs,
                })}"
              </p>
              <div>
                <p className={AUTHOR_CLASSES}>
                  {Chars({
                    text: current.author,
                    startIndex: current.quote.length + 4,
                    staggerMs: charStaggerMs,
                  })}
                </p>
                {current.role && (
                  <p className={ROLE_CLASSES}>
                    {Chars({
                      text: current.role,
                      startIndex: current.quote.length + current.author.length + 8,
                      staggerMs: charStaggerMs,
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls and Counter */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/60">
          <div className="text-xs text-slate-400 font-medium">
            <span className="text-cyan-400 font-bold">{index + 1}</span> / {count} clientes verificados
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-700 bg-slate-900/80 p-0 text-slate-200 transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.5 2.5 3.5 6l4 3.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-700 bg-slate-900/80 p-0 text-slate-200 transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4.5 2.5 4 3.5-4 3.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
