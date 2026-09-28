import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItemData {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
}

export interface FAQProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemData[]>;
  className?: string;
}

// Main reusable FAQ component
export const FAQ: React.FC<FAQProps> = ({ 
  title = "Perguntas Frequentes & Respostas Diretas",
  subtitle = "DÚVIDAS FREQUENTES",
  categories,
  faqData,
  className,
  ...props 
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-background px-4 py-16 text-foreground",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs 
        categories={categories}
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
      />
      <FAQList 
        faqData={faqData}
        selected={selectedCategory} 
      />
    </section>
  );
};

const FAQHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10">
    <span className="mb-3 inline-block text-xs font-bold tracking-wider uppercase text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
      {subtitle}
    </span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{title}</h2>
    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
  </div>
);

const FAQTabs: React.FC<{
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}> = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto mb-10">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        type="button"
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
          selected === key
            ? "border-cyan-400/50 text-white shadow-[0_0_20px_rgba(0,194,255,0.25)]"
            : "border-white/10 bg-slate-900/60 text-slate-400 hover:text-white hover:border-white/20"
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500/20 via-cyan-400/25 to-blue-500/20 border border-cyan-400/40 rounded-xl"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

const FAQList: React.FC<{
  faqData: Record<string, FAQItemData[]>;
  selected: string;
}> = ({ faqData, selected }) => (
  <div className="mx-auto max-w-6xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
            >
              {questions.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

const FAQItem: React.FC<FAQItemData> = ({ question, answer, linkText, linkUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-md",
        isOpen 
          ? "border-cyan-500/40 bg-slate-900/90 shadow-[0_4px_25px_rgba(0,194,255,0.08)]" 
          : "border-white/10 bg-slate-900/60 hover:border-cyan-500/20 hover:bg-slate-900/80"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span
          className={cn(
            "text-base sm:text-lg font-bold transition-colors leading-snug",
            isOpen ? "text-cyan-400" : "text-white"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
            isOpen 
              ? "border-cyan-400/40 bg-cyan-500/20 text-cyan-400" 
              : "border-white/10 bg-white/5 text-slate-400"
          )}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : "0px", 
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-5"
      >
        <div className="pb-5 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5">
          <p>{answer}</p>
          {linkUrl && linkText && (
            <div className="mt-3 pt-2">
              <a 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                {linkText} &rarr;
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
