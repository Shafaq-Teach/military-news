import React, { useState, useEffect } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { 
  Shield, 
  Cpu, 
  Zap, 
  Crosshair, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Radio, 
  Sparkles, 
  Pause, 
  Play, 
  ExternalLink, 
  FilePlus2 
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { translateMetadata, getArticleTitle, getArticleSummary } from '../../utils/translator';
import { getArticleSourceUrl } from '../../utils/sourceUrl';

export const HeroSection: React.FC = () => {
  const { 
    articles, 
    language, 
    searchQuery, 
    setSearchQuery, 
    setSelectedArticle,
    setIsAdminOpen,
    t 
  } = useMilitary();

  // Get the top 5 newest published articles sorted by date
  const latestArticles = [...articles]
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused || latestArticles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % latestArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, latestArticles.length, currentIndex]);

  const activeArticle = latestArticles[currentIndex] || articles[0];
  const activeCategoryInfo = CATEGORIES.find(c => c.key === activeArticle?.category);

  const isHardware = Boolean(
    activeArticle &&
    (activeArticle.category === 'weapons' || activeArticle.category === 'drones') &&
    activeArticle.specs?.speed &&
    activeArticle.specs.speed !== 'N/A' &&
    !activeArticle.specs.speed.toLowerCase().includes('strategic') &&
    !activeArticle.specs.speed.toLowerCase().includes('inference') &&
    !activeArticle.specs.speed.toLowerCase().includes('quarterly')
  );

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % latestArticles.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + latestArticles.length) % latestArticles.length);
  };

  return (
    <section className="relative pt-3 sm:pt-6 pb-8 sm:pb-12 overflow-hidden">
      
      {/* Background HUD Ambience */}
      <div className="absolute top-0 end-0 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--accent-glow)] rounded-full blur-3xl -z-10 pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Search Bar */}
        <div className="mb-6 sm:mb-8 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-[var(--accent-primary)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full ps-10 pe-4 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-highlight)] focus:ring-1 focus:ring-[var(--border-highlight)] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 pe-3 flex items-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Main Hero HUD Showcase - Auto-rotating 5 latest articles */}
        {!activeArticle ? (
          <div className="bg-[var(--bg-surface)]/90 border border-dashed border-[var(--border-color)] rounded-2xl p-8 sm:p-12 text-center space-y-4 hud-cut-corner shadow-[0_0_30px_rgba(0,0,0,0.4)] my-4">
            <Shield className="w-12 h-12 text-[var(--accent-primary)] mx-auto opacity-70 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
              {t('noArticlesHero')}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
              {t('noArticlesHeroDesc')}
            </p>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold text-xs hover:bg-[var(--accent-secondary)] transition-all inline-flex items-center gap-2 shadow-[0_0_15px_var(--accent-glow)]"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>{t('tabPublish')}</span>
            </button>
          </div>
        ) : (
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-[var(--bg-surface)]/90 border border-[var(--border-color)] rounded-2xl p-4 sm:p-6 lg:p-8 hud-cut-corner relative shadow-[0_0_30px_rgba(0,0,0,0.4)]"
          >
          
          {/* Top Slider Carousel Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--border-color)]/70">
            
            {/* Live Rotation Indicator Badge */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[var(--accent-primary)]" />
                <span>
                  {t('latestDossiers')}
                </span>
              </span>

              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(latestArticles.length).padStart(2, '0')}
              </span>
            </div>

            {/* 5 Interactive Indicators & Prev/Next Arrows */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* 5 Segmented Dot Bars */}
              <div className="flex items-center gap-1.5">
                {latestArticles.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => setCurrentIndex(idx)}
                    title={getArticleTitle(art, language)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'w-7 bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-glow)]' 
                        : 'w-2 bg-[var(--border-color)] hover:bg-[var(--accent-primary)]/50'
                    }`}
                  />
                ))}
              </div>

              {/* Pause / Play status */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-md hover:bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title={isPaused ? t('resume') : t('pause')}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              {/* Prev and Next Arrow Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title={t('prev')}
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title={t('next')}
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

            </div>

          </div>

          {/* Main Hero HUD Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left / Main Column: Lead Dossier Story */}
            <div 
              key={activeArticle.id}
              className="lg:col-span-7 space-y-4 sm:space-y-5 animate-in fade-in duration-500"
            >
              
              {/* Clearance Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--border-color)] font-bold">
                  {translateMetadata(activeArticle.specs.clearance, language)}
                </span>
                <span className="px-3 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                  {translateMetadata(activeArticle.specs.origin, language)}
                </span>
                <span className="text-[var(--text-muted)] text-[11px] font-mono">
                  {activeArticle.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[var(--text-primary)] leading-snug sm:leading-tight">
                {getArticleTitle(activeArticle, language)}
              </h1>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {getArticleSummary(activeArticle, language)}
              </p>

              {/* Quick Telemetry / Specs Badges (Hardware Platform vs Intel Dossier) */}
              {isHardware ? (
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                  <div className="p-2 sm:p-2.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">{t('speed')}</div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--accent-primary)] font-mono truncate">
                      {translateMetadata(activeArticle.specs.speed, language)}
                    </div>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">{t('range')}</div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--accent-secondary)] font-mono truncate">
                      {translateMetadata(activeArticle.specs.range, language)}
                    </div>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">{t('payload')}</div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] font-mono truncate">
                      {translateMetadata(activeArticle.specs.payload, language)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                  <div className="p-2 sm:p-2.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {t('intelDomain')}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--accent-primary)] truncate font-sans">
                      {activeCategoryInfo?.name[language] || activeCategoryInfo?.name.ug}
                    </div>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {t('authorSource')}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--accent-secondary)] truncate font-sans">
                      {activeArticle.author}
                    </div>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {t('intelStatus')}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate font-sans">
                      {translateMetadata(activeArticle.specs.status, language) || t('verified')}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedArticle(activeArticle)}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold text-xs hover:bg-[var(--accent-secondary)] transition-all shadow-[0_0_15px_var(--accent-glow)] flex items-center gap-2 group"
                >
                  <span>{t('readDossier')}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </button>

                {getArticleSourceUrl(activeArticle) && (
                  <a
                    href={getArticleSourceUrl(activeArticle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-500/30 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:text-emerald-200 text-xs font-bold flex items-center gap-2 transition-all shadow-sm group"
                    title={t('originalSource')}
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>{t('directSource')}</span>
                  </a>
                )}
              </div>

            </div>

            {/* Right Column: Real High-Resolution Featured Article Cover Image */}
            <div 
              key={`hero-img-${activeArticle.id}`}
              onClick={() => setSelectedArticle(activeArticle)}
              className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[var(--border-color)] group cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.6)] h-64 sm:h-80 lg:h-[340px] bg-black/40 animate-in fade-in duration-500"
            >
              {/* Cover Image with subtle scale on hover */}
              <img 
                src={activeArticle.imageUrl} 
                alt={getArticleTitle(activeArticle, language)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/95 via-transparent to-black/50 pointer-events-none"></div>

              {/* Top Overlay Badges */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-[10px] font-bold text-[var(--accent-primary)] backdrop-blur-md">
                  {translateMetadata(activeArticle.specs.clearance, language)}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-primary)] backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping"></span>
                  <span>{activeCategoryInfo?.name[language] || activeCategoryInfo?.name.ug}</span>
                </span>
              </div>

              {/* Center Hover Action */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <span className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-main)] font-black text-xs shadow-[0_0_20px_var(--accent-glow)] flex items-center gap-2">
                  <span>{t('readDossier')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-amber-300 font-medium">
                  {translateMetadata(activeArticle.specs.origin, language)}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-[var(--text-secondary)] font-mono text-[10px]">
                  DOSSIER #{activeArticle.id.toUpperCase()}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      </div>

    </section>
  );
};
