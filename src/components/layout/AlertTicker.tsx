import React from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { Flame } from 'lucide-react';

export const AlertTicker: React.FC = () => {
  const { articles, setSelectedArticle, language } = useMilitary();

  // Filter published articles and sort by date descending
  const publishedArticles = articles.filter(a => a.status === 'published');
  const sortedArticles = [...publishedArticles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const latestFive = (sortedArticles.length > 0 ? sortedArticles : articles).slice(0, 5);

  if (latestFive.length === 0) return null;

  // Duplicate for seamless infinite loop
  const tickerItems = [...latestFive, ...latestFive];

  const getCategoryLabel = (catKey: string) => {
    const cat = CATEGORIES.find(c => c.key === catKey);
    return cat ? (cat.name[language] || cat.name.ug) : catKey;
  };

  return (
    <div 
      className="w-full max-w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] overflow-hidden py-1.5 px-2.5 sm:px-4 flex items-center relative z-20 shadow-sm select-none"
    >
      {/* 1. Leading Sleek Badge on the Right (RTL start) */}
      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] sm:text-xs font-bold rounded-lg shrink-0 shadow-[0_0_12px_rgba(225,29,72,0.4)] border border-rose-400/40 z-10 me-2 sm:me-3">
        <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-pulse shrink-0" />
        <span className="tracking-wide whitespace-nowrap font-['Cairo',sans-serif]">
          {language === 'en' ? 'LATEST 5 NEWS' : language === 'ar' ? 'آخر 5 أخبار' : 'ئەڭ يېڭى 5 خەۋەر'}
        </span>
      </div>

      {/* 2. Soft Edge Gradients for Cinematic Seamless Marquee */}
      <div className="relative flex-1 min-w-0 w-0 overflow-hidden h-6 flex items-center">
        <div className="pointer-events-none absolute inset-y-0 start-0 w-4 sm:w-10 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-4 sm:w-10 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10" />

        {/* 3. Scrolling Ticker Track (Continuously scrolls from Right to Left) */}
        <div dir="ltr" className="ticker-track flex items-center">
          {tickerItems.map((article, idx) => {
            const title = article.title[language] || article.title.ug || article.title.en;
            const catLabel = getCategoryLabel(article.category);
            const itemNumber = (idx % latestFive.length) + 1;

            return (
              <div 
                key={`${article.id}-${idx}`}
                dir="rtl"
                onClick={() => setSelectedArticle(article)}
                className="flex items-center gap-2.5 mx-4 sm:mx-6 cursor-pointer group shrink-0 transition-colors"
                title={title}
              >
                {/* Number Badge */}
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-primary)]/15 border border-[var(--border-highlight)] text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-[var(--bg-main)] transition-colors">
                  #{itemNumber}
                </span>

                {/* Category Tag */}
                <span className="text-[11px] text-[var(--accent-secondary)] font-medium shrink-0">
                  [{catLabel}]
                </span>

                {/* Title */}
                <span className="text-xs sm:text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1 max-w-[280px] sm:max-w-[450px]">
                  {title}
                </span>

                {/* Separator Bullet */}
                <span className="ms-3 sm:ms-5 text-[var(--accent-primary)]/40 text-xs select-none">
                  ⚡
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
