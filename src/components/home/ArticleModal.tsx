import React, { useEffect, useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { 
  X, 
  Printer, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Zap,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Shield,
  Clock,
  Radio,
  FileText,
  Layers,
  ChevronRight,
  Compass,
  ExternalLink
} from 'lucide-react';
import { translateMetadata } from '../../utils/translator';

export const ArticleModal: React.FC = () => {
  const { 
    selectedArticle, 
    setSelectedArticle, 
    language, 
    t 
  } = useMilitary();

  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    setSelectedArticle(null);
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('article')) {
        url.searchParams.delete('article');
        window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + (url.hash || ''));
      }
    } catch {}
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync selectedArticle with URL param for sharing and deep linking
  useEffect(() => {
    if (selectedArticle) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('article', selectedArticle.id);
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }
  }, [selectedArticle]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedArticle) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [selectedArticle]);

  if (!selectedArticle) return null;

  const category = CATEGORIES.find(c => c.key === selectedArticle.category);

  const sourceUrl = 
    selectedArticle.specs?.['ئەسلى ئۇلانما'] || 
    (selectedArticle.specs as any)?.sourceUrl || 
    (selectedArticle.specs as any)?.['مەنبە ئۇلانمىسى'] ||
    (selectedArticle as any).sourceUrl ||
    (selectedArticle.specs?.origin?.startsWith('http') ? selectedArticle.specs.origin : null);

  const isHardware = Boolean(
    (selectedArticle.category === 'weapons' || selectedArticle.category === 'drones') &&
    selectedArticle.specs?.speed &&
    selectedArticle.specs.speed !== 'N/A' &&
    !selectedArticle.specs.speed.toLowerCase().includes('strategic') &&
    !selectedArticle.specs.speed.toLowerCase().includes('inference') &&
    !selectedArticle.specs.speed.toLowerCase().includes('quarterly')
  );

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('article', selectedArticle.id);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const isRtl = language !== 'en';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-main)]/95 backdrop-blur-xl text-[var(--text-primary)] transition-all animate-in fade-in duration-200">
      
      {/* Background Military Grid Lines Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Tactical Command & Navigation HUD Bar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-color)] shadow-lg">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          
          {/* Start: Back to Intel Feed & Dossier ID */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={handleClose}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-xs sm:text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 transition-all shadow-sm group"
            >
              {isRtl ? (
                <ArrowRight className="w-4 h-4 text-[var(--accent-primary)] group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ArrowLeft className="w-4 h-4 text-[var(--accent-primary)] group-hover:-translate-x-0.5 transition-transform" />
              )}
              <span>
                {language === 'en' ? 'Back / Close' : language === 'ar' ? 'رجوع / إغلاق' : 'قايتىش / تاقاش'}
              </span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-black/40 text-[var(--text-muted)] border border-white/10">
                ESC
              </kbd>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono border-s border-[var(--border-color)] ps-3 sm:ps-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[var(--text-muted)]">DOSSIER //</span>
              <span className="text-[var(--accent-primary)] font-bold">{selectedArticle.id}</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-bold">
                {translateMetadata(selectedArticle.specs.clearance, language)}
              </span>
            </div>
          </div>

          {/* End: Quick Actions (Print, Share, Close) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-colors"
              title={language === 'en' ? 'Copy Article Link' : language === 'ar' ? 'نسخ الرابط' : 'ئۇلانمىنى كۆچۈرۈش'}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold hidden sm:inline">
                    {language === 'en' ? 'Copied!' : language === 'ar' ? 'تم النسخ!' : 'كۆچۈرۈلدى!'}
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'Share' : language === 'ar' ? 'مشاركة' : 'ھەمبەھىرلەش'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-colors"
              title={language === 'en' ? 'Print Dossier' : language === 'ar' ? 'طباعة التقرير' : 'بېسىپ چىقىرىش'}
            >
              <Printer className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Print' : language === 'ar' ? 'طباعة' : 'بېسىپ چىقىرىش'}
              </span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 hover:text-rose-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Full-Screen Content Theater */}
      <main className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-6 sm:py-10">
        
        {/* Responsive Two-Column Grid:
            In RTL: Column 1 is on the RIGHT, Column 2 is on the LEFT.
            Right: Primary Article Content & Deep Analysis (7-8 cols).
            Left: Image Showcase, Specs Telemetry, Metadata (4-5 cols).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* ==============================================================
              RIGHT SIDE (ئـوڭ تـەرەپ): Primary Text, Headline, Lead, Full Assessment
              ============================================================== */}
          <article className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8 order-1">
            
            {/* Metadata Badges Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent-secondary)] font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {category?.code && <span className="font-mono">{category.code} :</span>}
                <span>{category?.name[language] || category?.name.ug || translateMetadata(selectedArticle.category, language)}</span>
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{selectedArticle.date}</span>
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{translateMetadata(selectedArticle.author, language)}</span>
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{selectedArticle.views} {language === 'en' ? 'VIEWS' : language === 'ar' ? 'مشاهدة' : 'قېتىم كۆرۈلدى'}</span>
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>~3 {language === 'en' ? 'min read' : language === 'ar' ? 'دقيقة قراءة' : 'مىنۇتلۇق ئوقۇشلۇق'}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-[2.6rem] font-black text-[var(--text-primary)] leading-tight tracking-tight">
              {selectedArticle.title[language] || selectedArticle.title.ug}
            </h1>

            {/* Direct Source Reference Button */}
            {sourceUrl && (
              <div className="p-3 sm:p-4 rounded-xl bg-[var(--bg-surface)] border border-emerald-500/40 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-bold text-emerald-400 font-mono">
                    {language === 'en' ? 'ORIGINAL INTEL SOURCE:' : language === 'ar' ? 'المصدر الأصلي للتقرير:' : 'ئەسلى خەۋەر ۋە تەھلىل مەنبەسى:'}
                  </span>
                  <span className="text-[var(--text-secondary)] font-medium">
                    {selectedArticle.specs?.['مەنبە'] || selectedArticle.author || 'ئەسلى مەنبە'}
                  </span>
                </div>

                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-emerald-900/40 transition-all group shrink-0"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>
                    {language === 'en' ? 'Open Original Source' : language === 'ar' ? 'فتح المصدر الأصلي' : '🌐 ئەسلى مەنبەدىن كۆرۈش'}
                  </span>
                </a>
              </div>
            )}

            {/* Strategic Executive Summary (Lead Briefing Box) */}
            <div className="relative p-5 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-color)] shadow-[0_0_30px_var(--accent-glow)]/15 overflow-hidden">
              <div className="absolute top-0 start-0 w-2 h-full bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-secondary)] to-transparent" />
              
              <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>
                  {language === 'en' ? 'EXECUTIVE STRATEGIC BRIEFING' : language === 'ar' ? 'الإيجاز الاستراتيجي والتكتيكي' : 'تاكتىكىلىق ئىستراتېگىيەلىك يىغىنچاق مەزمۇن'}
                </span>
              </div>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
                {selectedArticle.summary[language] || selectedArticle.summary.ug}
              </p>
            </div>

            {/* Tactical Assessment & Deep Body Content */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-3">
                <FileText className="w-5 h-5 text-[var(--accent-primary)]" />
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-wide uppercase">
                  {language === 'en' 
                    ? 'TACTICAL ASSESSMENT // FULL INTELLIGENCE DOSSIER' 
                    : language === 'ar' 
                    ? 'التقييم التكتيكي // التقرير الاستخباراتي المفصل' 
                    : 'تاكتىكىلىق تەھلىل // تەپسىلىي دوكلات ۋە ھەربىي تەھلىل'}
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg leading-[2.1] sm:leading-[2.3] text-[var(--text-primary)]/95 font-normal whitespace-pre-line tracking-wide">
                  {selectedArticle.content[language] || selectedArticle.content.ug}
                </p>
              </div>
            </div>

            {/* Tags Pill Cloud */}
            <div className="pt-6 border-t border-[var(--border-color)] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] uppercase">
                <Tag className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{language === 'en' ? 'TACTICAL TAGS & CLASSIFICATIONS' : language === 'ar' ? 'الوسوم والتصنيفات' : 'تاكتىكىلىق خەتكۈچلەر ۋە ئايرىملار'}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedArticle.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-xs text-[var(--text-secondary)] hover:text-white transition-all cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Authenticated Intelligence Footer Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)]/60 border border-[var(--border-color)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
                <div>
                  <div className="text-[var(--text-primary)] font-bold">
                    AUTHENTICATED OSINT DEFENSE REPORT
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    VERIFIED CLASSIFIED MILITARY INTELLIGENCE FEED
                  </div>
                </div>
              </div>

              <div className="text-end text-[11px]">
                <div>TIMESTAMP: {selectedArticle.date}</div>
                <div className="text-[var(--accent-secondary)]">CLEARANCE: {selectedArticle.specs.clearance}</div>
              </div>
            </div>

          </article>


          {/* ==============================================================
              LEFT SIDE (سـول تـەرەپ): Image Showcase, Specs Telemetry, Quick Deck
              ============================================================== */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 self-start order-2">
            
            {/* Featured Image Showcase Card with Tactical HUD Framing */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--border-color)] bg-black shadow-2xl group">
              
              {/* Tactical Corner Accents */}
              <div className="absolute top-2 start-2 w-4 h-4 border-t-2 border-s-2 border-[var(--accent-primary)] z-20 pointer-events-none" />
              <div className="absolute top-2 end-2 w-4 h-4 border-t-2 border-e-2 border-[var(--accent-primary)] z-20 pointer-events-none" />
              <div className="absolute bottom-2 start-2 w-4 h-4 border-b-2 border-s-2 border-[var(--accent-primary)] z-20 pointer-events-none" />
              <div className="absolute bottom-2 end-2 w-4 h-4 border-b-2 border-e-2 border-[var(--accent-primary)] z-20 pointer-events-none" />

              {/* Image Frame with Aspect Ratio */}
              <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title[language] || selectedArticle.title.ug}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Status & Clearance Overlay */}
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between gap-2 z-20">
                <div className="px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-xs font-bold text-[var(--accent-secondary)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>STATUS: {translateMetadata(selectedArticle.specs.status, language)}</span>
                </div>

                <div className="px-2.5 py-1.5 rounded-lg bg-red-950/80 backdrop-blur-md border border-red-500/40 text-[11px] font-mono font-bold text-red-400">
                  {selectedArticle.specs.clearance}
                </div>
              </div>

            </div>

            {/* Tactical Telemetry & Specifications Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-color)] shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <h3 className="text-xs sm:text-sm font-bold text-[var(--accent-primary)] uppercase flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>
                    {isHardware
                      ? (language === 'en' ? 'TECHNICAL TELEMETRY' : language === 'ar' ? 'البيانات الفنية والتقنية' : 'تاكتىكا پارامېتىرلىرى')
                      : (language === 'en' ? 'INTEL DOSSIER OVERVIEW' : language === 'ar' ? 'بيانات التقرير التكتيكي' : 'ئاخبارات ۋە تەھلىل مەلۇماتى')}
                  </span>
                </h3>

                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                  METRICS // 01
                </span>
              </div>

              {/* Hardware Specs Grid */}
              {isHardware ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5 text-xs">
                  
                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('speed')}</span>
                    <span className="text-sm font-black text-[var(--accent-primary)] font-mono block">
                      {translateMetadata(selectedArticle.specs.speed, language)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('range')}</span>
                    <span className="text-sm font-black text-[var(--accent-secondary)] font-mono block">
                      {translateMetadata(selectedArticle.specs.range, language)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('payload')}</span>
                    <span className="text-sm font-black text-[var(--text-primary)] font-mono block">
                      {translateMetadata(selectedArticle.specs.payload, language)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('origin')}</span>
                    <span className="text-sm font-bold text-amber-300 font-sans block">
                      {translateMetadata(selectedArticle.specs.origin, language)}
                    </span>
                  </div>

                  {selectedArticle.specs.radarCrossSection && selectedArticle.specs.radarCrossSection !== 'N/A' && (
                    <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('rcs')}</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono block">
                        {selectedArticle.specs.radarCrossSection}
                      </span>
                    </div>
                  )}

                  {selectedArticle.specs.ceiling && selectedArticle.specs.ceiling !== 'N/A' && (
                    <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('ceiling')}</span>
                      <span className="text-xs font-bold text-sky-400 font-mono block">
                        {selectedArticle.specs.ceiling}
                      </span>
                    </div>
                  )}

                </div>
              ) : (
                /* Intelligence & Dossier Analysis Grid */
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5 text-xs">
                  
                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                      {language === 'en' ? 'INTEL DOMAIN' : language === 'ar' ? 'المجال التكتيكي' : 'تەھلىل ساھەسى'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--accent-primary)] font-sans block truncate">
                      {category?.name[language] || category?.name.ug || translateMetadata(selectedArticle.category, language)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                      {language === 'en' ? 'ANALYST / AGENCY' : language === 'ar' ? 'الباحث / المصدر' : 'تەتقىقاتچى / ئورگان'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--accent-secondary)] font-sans block truncate">
                      {selectedArticle.author}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                      {language === 'en' ? 'CLASSIFICATION' : language === 'ar' ? 'درجة التصنيف' : 'ئاخبارات دەرىجىسى'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-amber-300 font-sans block truncate">
                      {translateMetadata(selectedArticle.specs.clearance, language)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                      {language === 'en' ? 'STATUS' : language === 'ar' ? 'الحالة' : 'ھالىتى'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-sans block truncate">
                      {translateMetadata(selectedArticle.specs.status, language) || 'دەلىللەنگەن'}
                    </span>
                  </div>

                </div>
              )}

              {/* Action Deck Buttons inside Sidebar */}
              <div className="pt-2 space-y-2.5">
                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>
                      {language === 'en' ? 'View Original Source' : language === 'ar' ? 'عرض المصدر الأصلي' : '🌐 ئەسلى مەنبەدىن كۆرۈش'}
                    </span>
                  </a>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all"
                  >
                    <Printer className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>{language === 'en' ? 'Print Dossier' : language === 'ar' ? 'طباعة التقرير' : 'دوكلات بېسىش'}</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--accent-primary)]/15 hover:bg-[var(--accent-primary)]/25 border border-[var(--accent-primary)] text-xs font-bold text-[var(--accent-primary)] flex items-center justify-center gap-2 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? (language === 'en' ? 'Copied' : language === 'ar' ? 'تم النسخ' : 'كۆچۈرۈلدى') : (language === 'en' ? 'Share Link' : language === 'ar' ? 'مشاركة' : 'ھەمبەھىرلەش')}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Tactical Advisory Notice Card */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)]/40 border border-[var(--border-color)] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold">
                <Compass className="w-4 h-4" />
                <span>{language === 'en' ? 'OPERATIONAL ADVISORY' : language === 'ar' ? 'توجيهات العمليات' : 'تاكتىكىلىق ئەسكەرتىش'}</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                {language === 'en'
                  ? 'All technical telemetry and strategic intelligence data are continuously audited and synchronized with global defense repositories.'
                  : language === 'ar'
                  ? 'يتم تحديث ومزامنة جميع البيانات التكتيكية والاستخباراتية باستمرار مع قواعد البيانات الدفاعية العالمية.'
                  : 'بارلىق تاكتىكا پارامېتىرلىرى ۋە ئىستراتېگىيەلىك ئاخبارات دوكلاتلىرى دۇنياۋى ھەربىي مەنبەلەر ئارقىلىق ئۈزلۈكسىز دەلىللىنىپ تەڭشەپ تۇرۇلىدۇ.'}
              </p>
            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};
