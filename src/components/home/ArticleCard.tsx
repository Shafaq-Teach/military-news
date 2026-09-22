import React from 'react';
import { Article } from '../../types/military';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { 
  Eye, 
  ChevronRight, 
  Radar,
  ExternalLink
} from 'lucide-react';
import { translateMetadata } from '../../utils/translator';
import { getArticleSourceUrl } from '../../utils/sourceUrl';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { language, setSelectedArticle, t } = useMilitary();

  const categoryInfo = CATEGORIES.find(c => c.key === article.category);
  const sourceUrl = getArticleSourceUrl(article);

  const isHardware = Boolean(
    (article.category === 'weapons' || article.category === 'drones') &&
    article.specs?.speed &&
    article.specs.speed !== 'N/A' &&
    !article.specs.speed.toLowerCase().includes('strategic') &&
    !article.specs.speed.toLowerCase().includes('inference') &&
    !article.specs.speed.toLowerCase().includes('quarterly')
  );

  return (
    <div 
      onClick={() => setSelectedArticle(article)}
      className="hud-panel hud-cut-corner group cursor-pointer flex flex-col justify-between rounded-xl overflow-hidden p-4 sm:p-5 transition-all duration-300 relative border border-[var(--border-color)]"
    >
      
      {/* Top Header Row with Code and Radar Pulse */}
      <div className="flex items-center justify-between gap-2 mb-3 text-xs border-b border-[var(--border-color)] pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-ping"></span>
          <span className="font-bold text-[var(--accent-primary)] font-mono">
            {categoryInfo?.code}
          </span>
          <span className="text-[var(--text-muted)] font-sans">
            // {categoryInfo?.name[language] || categoryInfo?.name.ug}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[var(--text-muted)] font-mono">
          <Radar className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
          <span className="text-[10px]">{article.date}</span>
        </div>
      </div>

      {/* Image Thumbnail with HUD Brackets */}
      <div className="relative h-44 sm:h-48 w-full rounded-lg overflow-hidden mb-4 bg-black/40 border border-[var(--border-color)]">
        <img 
          src={article.imageUrl} 
          alt={article.title[language] || article.title.ug}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        
        {/* Subtle Tech Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent opacity-80 pointer-events-none"></div>

        {/* Classification Badge overlay */}
        <div className="absolute top-2 start-2">
          <span className="px-2 py-0.5 rounded bg-[var(--bg-main)]/90 border border-[var(--border-color)] text-[10px] font-bold text-[var(--accent-primary)] backdrop-blur-md">
            {translateMetadata(article.specs.clearance, language)}
          </span>
        </div>

        {/* Origin Pill overlay */}
        <div className="absolute bottom-2 end-2">
          <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] text-amber-300 font-medium">
            {translateMetadata(article.specs.origin, language)}
          </span>
        </div>
      </div>

      {/* Title & Summary */}
      <div className="flex-1 space-y-2 mb-4">
        <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--border-highlight)] transition-colors leading-snug line-clamp-2">
          {article.title[language] || article.title.ug}
        </h3>

        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed opacity-90">
          {article.summary[language] || article.summary.ug}
        </p>
      </div>

      {/* Quick Specs Matrix Bar (Hardware vs Intel Dossier) */}
      {isHardware ? (
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-[var(--bg-main)]/80 border border-[var(--border-color)] mb-4 text-center">
          <div>
            <div className="text-[9px] text-[var(--text-muted)]">{t('speed')}</div>
            <div className="text-xs font-bold font-mono text-[var(--accent-primary)] truncate">
              {translateMetadata(article.specs.speed, language)}
            </div>
          </div>
          <div className="border-x border-[var(--border-color)] px-1">
            <div className="text-[9px] text-[var(--text-muted)]">{t('range')}</div>
            <div className="text-xs font-bold font-mono text-[var(--accent-secondary)] truncate">
              {translateMetadata(article.specs.range, language)}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-[var(--text-muted)]">{t('payload')}</div>
            <div className="text-xs font-bold font-mono text-[var(--text-primary)] truncate">
              {translateMetadata(article.specs.payload, language)}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-[var(--bg-main)]/80 border border-[var(--border-color)] mb-4 text-center">
          <div>
            <div className="text-[9px] text-[var(--text-muted)]">{language === 'en' ? 'Domain' : language === 'ar' ? 'المجال' : 'سەھىپە'}</div>
            <div className="text-xs font-bold text-[var(--accent-primary)] truncate font-sans">
              {categoryInfo?.name[language] || categoryInfo?.name.ug}
            </div>
          </div>
          <div 
            onClick={(e) => {
              if (sourceUrl) {
                e.stopPropagation();
                window.open(sourceUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className="border-x border-[var(--border-color)] px-1 hover:bg-emerald-950/25 rounded transition-colors group/src"
            title={language === 'en' ? 'Click to open original source' : language === 'ar' ? 'انقر لفتح المصدر الأصلي' : 'بىر چېكىش بىلەن ئەسلى مەنبەنى ئېچىش'}
          >
            <div className="text-[9px] text-[var(--text-muted)] flex items-center justify-center gap-1">
              <span>{language === 'en' ? 'Source' : language === 'ar' ? 'المصدر' : 'مەنبە'}</span>
              <ExternalLink className="w-2.5 h-2.5 text-emerald-400 group-hover/src:scale-110 transition-transform" />
            </div>
            <div className="text-xs font-bold text-[var(--accent-secondary)] group-hover/src:text-emerald-300 truncate font-sans">
              {article.author}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-[var(--text-muted)]">{language === 'en' ? 'Status' : language === 'ar' ? 'الحالة' : 'ھالىتى'}</div>
            <div className="text-xs font-bold text-[var(--text-primary)] truncate font-sans">
              {translateMetadata(article.specs.status, language) || (language === 'en' ? 'VERIFIED' : language === 'ar' ? 'موثق' : 'تەستىقلانغان')}
            </div>
          </div>
        </div>
      )}

      {/* Footer Details: Views, 1-Click Source Button, and Read Dossier */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] text-xs gap-2">
        <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] font-mono shrink-0">
          <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span>{article.views}</span>
        </div>

        <div className="flex items-center gap-2 min-w-0">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-500/30 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-emerald-200 text-[11px] font-bold flex items-center gap-1 transition-all z-10 shrink-0 shadow-sm"
              title={language === 'en' ? '1-Click Direct Original Source' : language === 'ar' ? 'المصدر الأصلي مباشرة' : 'بىر چېكىش بىلەن ئەسلى مەنبەگە ئۇلىنىش'}
            >
              <ExternalLink className="w-3 h-3" />
              <span>{language === 'en' ? 'Source' : language === 'ar' ? 'المصدر' : '🌐 ئەسلى مەنبە'}</span>
            </a>
          )}

          <button 
            className="flex items-center gap-1 text-xs font-bold text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)] transition-colors shrink-0"
          >
            <span>{t('readDossier')}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
};
