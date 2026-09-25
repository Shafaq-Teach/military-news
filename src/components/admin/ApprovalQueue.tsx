import React from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { CheckCircle2, XCircle, Trash2, Eye, ShieldAlert, Clock } from 'lucide-react';

export const ApprovalQueue: React.FC = () => {
  const { 
    articles, 
    approveArticle, 
    rejectArticle, 
    deleteArticle, 
    setSelectedArticle,
    language, 
    t 
  } = useMilitary();

  const pendingArticles = articles.filter(a => a.status === 'pending');

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 w-full max-w-full min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 truncate">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="truncate">{t('tabApprovals')}</span>
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1 sm:line-clamp-none">
            يوللانغان ھەربىي ئاخبارات ۋە تەھلىل ماددىلىرىنى تەكشۈرۈپ تەستىقلاش مەركىزى
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold shrink-0">
          {pendingArticles.length} PENDING
        </span>
      </div>

      {pendingArticles.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-dashed border-[var(--border-color)] space-y-3 w-full max-w-full">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto opacity-70" />
          <h4 className="text-sm font-bold text-[var(--text-primary)]">
            تەستىق كۈتۈۋاتقان ھېچقانداق يېڭى مەزمۇن يوق
          </h4>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            بارلىق كىرگۈزۈلگەن تېخنىكىلىق ھۆججەتلەر تەستىقلاندى ۋە تور بېكەت يۈزىدە ئېلان قىلىندى.
          </p>
        </div>
      ) : (
        <div className="space-y-4 w-full max-w-full min-w-0">
          {pendingArticles.map(article => {
            const category = CATEGORIES.find(c => c.key === article.category);

            return (
              <div 
                key={article.id}
                className="p-3.5 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] transition-colors flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 w-full max-w-full min-w-0 overflow-hidden"
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <img 
                    src={article.imageUrl} 
                    alt="" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-black/40 border border-[var(--border-color)] shrink-0"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold text-[10px] sm:text-xs">
                        <span className="font-mono">{category?.code} :</span> {category?.name[language] || category?.name.ug}
                      </span>
                      <span className="text-[var(--text-muted)] font-mono text-[10px]">{article.date}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] line-clamp-2">
                      {article.title[language] || article.title.ug}
                    </h4>

                    <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] line-clamp-2">
                      {article.summary[language] || article.summary.ug}
                    </p>

                    {article.specs.speed && article.specs.speed !== 'N/A' && (
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[var(--text-muted)] flex-wrap">
                        <span>تېزلىكى: <span className="font-mono text-[var(--text-primary)] font-bold">{article.specs.speed}</span></span>
                        <span>•</span>
                        <span>دائىرىسى: <span className="font-mono text-[var(--text-primary)] font-bold">{article.specs.range}</span></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-[var(--border-color)]/60">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    title="كۆرۈش"
                    className="py-1.5 sm:p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-[var(--text-primary)] text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span className="text-[10px] sm:text-xs">كۆرۈش</span>
                  </button>

                  <button
                    onClick={() => approveArticle(article.id)}
                    className="py-1.5 sm:px-3 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] sm:text-xs">{t('btnApprove')}</span>
                  </button>

                  <button
                    onClick={() => rejectArticle(article.id)}
                    className="py-1.5 sm:px-3 sm:py-2 rounded-lg bg-amber-700/60 hover:bg-amber-600 text-amber-100 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] sm:text-xs">{t('btnReject')}</span>
                  </button>

                  <button
                    onClick={() => deleteArticle(article.id)}
                    className="py-1.5 sm:p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/50 text-rose-300 transition-colors flex items-center justify-center"
                    title="ئۆچۈرۈش"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
