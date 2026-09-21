import React, { useEffect } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { 
  X, 
  Printer, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Zap
} from 'lucide-react';
import { translateMetadata } from '../../utils/translator';

export const ArticleModal: React.FC = () => {
  const { 
    selectedArticle, 
    setSelectedArticle, 
    language, 
    t 
  } = useMilitary();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedArticle]);

  if (!selectedArticle) return null;

  const category = CATEGORIES.find(c => c.key === selectedArticle.category);

  const isHardware = Boolean(
    (selectedArticle.category === 'weapons' || selectedArticle.category === 'drones') &&
    selectedArticle.specs?.speed &&
    selectedArticle.specs.speed !== 'N/A' &&
    !selectedArticle.specs.speed.toLowerCase().includes('strategic') &&
    !selectedArticle.specs.speed.toLowerCase().includes('inference') &&
    !selectedArticle.specs.speed.toLowerCase().includes('quarterly')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-4xl bg-[var(--bg-surface)] border-2 border-[var(--border-highlight)] rounded-2xl shadow-[0_0_50px_var(--accent-glow)] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Military Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[var(--bg-main)] border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-mono text-xs font-black tracking-wider text-[var(--accent-primary)] uppercase">
              DOSSIER // {selectedArticle.id}
            </span>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-bold">
              {selectedArticle.specs.clearance}
            </span>
          </div>

          <button
            onClick={() => setSelectedArticle(null)}
            className="p-1.5 rounded-lg bg-[var(--bg-surface)] hover:bg-rose-950 text-[var(--text-muted)] hover:text-white border border-[var(--border-color)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 flex-1">
          
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs border-b border-[var(--border-color)] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent-secondary)] font-bold">
                <span className="font-mono">{category?.code} :</span> {category?.name[language] || category?.name.ug}
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)] flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.date}
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)] flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {translateMetadata(selectedArticle.author, language)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono">
              <Eye className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>{selectedArticle.views} VIEWS</span>
            </div>
          </div>

          {/* Dossier Title */}
          <h2 className="text-xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight">
            {selectedArticle.title[language] || selectedArticle.title.ug}
          </h2>

          {/* Image Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-[var(--border-color)] bg-black/60 max-h-96">
            <img 
              src={selectedArticle.imageUrl} 
              alt={selectedArticle.title[language] || selectedArticle.title.ug}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 start-3 px-3 py-1 bg-black/80 rounded border border-white/20 text-xs text-[var(--accent-secondary)] font-bold">
              STATUS: {translateMetadata(selectedArticle.specs.status, language)}
            </div>
          </div>

          {/* Technical Specs Detailed Sheet */}
          <div className="bg-[var(--bg-main)]/90 border border-[var(--border-color)] rounded-xl p-4 sm:p-5">
            <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>
                {isHardware
                  ? `${t('quickSpecs')} (TECHNICAL TELEMETRY)`
                  : (language === 'en' ? 'INTEL DOSSIER OVERVIEW' : language === 'ar' ? 'بيانات التقرير التكتيكي' : 'ئاخبارات ۋە تەھلىل مەلۇماتى')}
              </span>
            </h3>

            {isHardware ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('speed')}</span>
                  <span className="text-sm font-bold text-[var(--accent-primary)] font-mono">{translateMetadata(selectedArticle.specs.speed, language)}</span>
                </div>
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('range')}</span>
                  <span className="text-sm font-bold text-[var(--accent-secondary)] font-mono">{translateMetadata(selectedArticle.specs.range, language)}</span>
                </div>
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('payload')}</span>
                  <span className="text-sm font-bold text-[var(--text-primary)] font-mono">{translateMetadata(selectedArticle.specs.payload, language)}</span>
                </div>
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('origin')}</span>
                  <span className="text-sm font-bold text-amber-300 font-sans">{translateMetadata(selectedArticle.specs.origin, language)}</span>
                </div>

                {selectedArticle.specs.radarCrossSection && selectedArticle.specs.radarCrossSection !== 'N/A' && (
                  <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('rcs')}</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">{selectedArticle.specs.radarCrossSection}</span>
                  </div>
                )}

                {selectedArticle.specs.ceiling && selectedArticle.specs.ceiling !== 'N/A' && (
                  <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">{t('ceiling')}</span>
                    <span className="text-xs font-bold text-sky-400 font-mono">{selectedArticle.specs.ceiling}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                    {language === 'en' ? 'INTEL DOMAIN' : language === 'ar' ? 'المجال التكتيكي' : 'تەھلىل ساھەسى'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--accent-primary)] font-sans">
                    {category?.name[language] || category?.name.ug}
                  </span>
                </div>
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                    {language === 'en' ? 'ANALYST / AGENCY' : language === 'ar' ? 'الباحث / المصدر' : 'تەتقىقاتچى / ئورگان'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--accent-secondary)] font-sans">
                    {selectedArticle.author}
                  </span>
                </div>
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                    {language === 'en' ? 'CLASSIFICATION' : language === 'ar' ? 'درجة التصنيف' : 'ئاخبارات دەرىجىسى'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-300 font-sans">
                    {translateMetadata(selectedArticle.specs.clearance, language)}
                  </span>
                </div>
                <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-mono">
                    {language === 'en' ? 'STATUS' : language === 'ar' ? 'الحالة' : 'ھالىتى'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 font-sans">
                    {translateMetadata(selectedArticle.specs.status, language) || 'دەلىللەنگەن'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Deep Analysis Content */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[var(--text-secondary)] uppercase border-b border-[var(--border-color)] pb-2">
              TACTICAL ASSESSMENT // تەپسىلىي دوكلات
            </h4>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)] font-normal whitespace-pre-line">
              {selectedArticle.content[language] || selectedArticle.content.ug}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--border-color)]">
            <Tag className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            {selectedArticle.tags.map(tag => (
              <span 
                key={tag}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-main)] border border-[var(--border-color)] text-[11px] text-[var(--text-secondary)]"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-4 sm:px-6 py-4 bg-[var(--bg-main)] border-t border-[var(--border-color)] flex items-center justify-between">
          <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)]">
            AUTHENTICATED OSINT DEFENSE REPORT
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => window.print()}
              className="px-3 sm:px-4 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Print</span>
            </button>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="px-4 sm:px-5 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-[var(--bg-main)] text-xs font-bold transition-all shadow-[0_0_12px_var(--accent-glow)]"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
