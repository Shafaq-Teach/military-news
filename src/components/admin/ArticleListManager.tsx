import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { Article, ArticleStatus } from '../../types/military';
import { ArticleForm } from './ArticleForm';
import { 
  Trash2, 
  Eye, 
  Search, 
  Pencil,
  RefreshCw,
  X,
  Cloud
} from 'lucide-react';
import { getArticleTitle } from '../../utils/translator';

export const ArticleListManager: React.FC = () => {
  const { 
    articles, 
    deleteArticle, 
    clearAllArticles,
    setSelectedArticle, 
    syncToCloud,
    isSyncing,
    syncStatus,
    language, 
    t 
  } = useMilitary();

  const [filterStatus, setFilterStatus] = useState<ArticleStatus | 'all'>('all');
  const [filterText, setFilterText] = useState('');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const filtered = articles.filter(a => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const title = (a.title[language] || a.title.ug || a.title.en || '').toLowerCase();
    const matchesSearch = !filterText || title.includes(filterText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full min-w-0">
      
      {/* Cloud Sync Status Banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] w-full max-w-full min-w-0">
        <div className="flex items-center gap-2 text-xs min-w-0">
          <Cloud className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
          <div className={`w-2 h-2 rounded-full shrink-0 ${isSyncing ? 'bg-amber-400 animate-ping' : syncStatus?.success === false ? 'bg-rose-500' : 'bg-emerald-400'}`} />
          <span className="text-[var(--text-secondary)] text-[11px] sm:text-xs leading-relaxed truncate sm:whitespace-normal">
            {isSyncing 
              ? t('cloudSyncing') 
              : syncStatus?.message 
                ? syncStatus.message 
                : t('cloudSyncStatus')}
          </span>
        </div>

        <button
          type="button"
          disabled={isSyncing}
          onClick={() => syncToCloud()}
          className="w-full sm:w-auto justify-center px-3 py-2 sm:py-1.5 rounded-lg bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50 shrink-0"
          title={t('syncNow')}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? t('cloudSyncing') : t('syncNow')}</span>
        </button>
      </div>

      {/* Top Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-b border-[var(--border-color)] pb-4 w-full max-w-full min-w-0">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full max-w-full min-w-0 touch-pan-x">
          {(['all', 'published', 'pending', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-bold capitalize transition-colors border shrink-0 ${
                filterStatus === status
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] border-[var(--border-highlight)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-highlight)]'
              }`}
            >
              {status} ({status === 'all' ? articles.length : articles.filter(a => a.status === status).length})
            </button>
          ))}
        </div>

        {/* Actions & Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-60 min-w-0">
            <Search className="w-3.5 h-3.5 absolute inset-y-0 start-3 my-auto text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder={t('searchArticlesPlaceholder')}
              className="w-full ps-8 pe-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
            />
          </div>

          {articles.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(t('confirmClearAll'))) {
                  clearAllArticles();
                }
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 border border-rose-800/80 text-rose-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors shrink-0"
              title={t('btnClearAll')}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">{t('btnClearAll')}</span>
            </button>
          )}
        </div>

      </div>

      {/* Desktop Articles Table (Visible on sm screens and up) */}
      <div className="hidden sm:block overflow-x-auto w-full max-w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)] font-bold text-[11px]">
              <th className="p-3 text-start">{t('tableTitle')}</th>
              <th className="p-3 text-start">{t('tableCategory')}</th>
              <th className="p-3 text-start">{t('tableStatus')}</th>
              <th className="p-3 text-start">{t('tableDate')}</th>
              <th className="p-3 text-start">{t('tableViews')}</th>
              <th className="p-3 text-end">{t('tableActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {filtered.map(article => {
              const category = CATEGORIES.find(c => c.key === article.category);

              return (
                <tr key={article.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                  <td className="p-3 max-w-xs">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={article.imageUrl} 
                        alt="" 
                        className="w-9 h-9 rounded object-cover border border-[var(--border-color)] shrink-0 bg-black/30" 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="font-bold text-[var(--text-primary)] line-clamp-1">
                        {getArticleTitle(article, language)}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 font-semibold text-[var(--accent-primary)] font-sans">
                    {category?.name[language] || category?.name.ug}
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                      article.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : article.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      {article.status}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-[var(--text-muted)]">
                    {article.date}
                  </td>

                  <td className="p-3 font-mono text-[var(--text-secondary)]">
                    {article.views}
                  </td>

                  <td className="p-3 text-end">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Button */}
                      <button
                        onClick={() => setSelectedArticle(article)}
                        title="ئالدىن كۆرۈش (View)"
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] text-[var(--accent-primary)] border border-transparent hover:border-[var(--border-color)]"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => setEditingArticle(article)}
                        title="ماقالىنى تەھرىرلەش (Edit)"
                        className="p-1.5 rounded hover:bg-amber-500/15 text-amber-400 border border-transparent hover:border-amber-500/40"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (window.confirm('بۇ ماقالىنى بارلىق ئۈسكۈنىلەردىن ئۆچۈرۈشنى جەزملەشتۈرەمسىز؟')) {
                            deleteArticle(article.id);
                          }
                        }}
                        title="ئۆچۈرۈش (Delete)"
                        className="p-1.5 rounded hover:bg-rose-950/60 text-rose-400 border border-transparent hover:border-rose-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-[var(--text-muted)]">
                  ھېچقانداق ماقالە تېپىلمىدى (بارلىق ماقالىلەر بوشىتىلغان ياكى ئىزدەش نەتىجىسى يوق).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Touch Cards View (Visible on phones < 640px) */}
      <div className="sm:hidden space-y-3 w-full max-w-full min-w-0">
        {filtered.map(article => {
          const category = CATEGORIES.find(c => c.key === article.category);

          return (
            <div 
              key={article.id}
              className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-highlight)] transition-all space-y-3 w-full max-w-full min-w-0 overflow-hidden"
            >
              {/* Thumbnail + Title + Category */}
              <div className="flex items-start gap-3">
                <img 
                  src={article.imageUrl} 
                  alt="" 
                  className="w-14 h-14 rounded-lg object-cover border border-[var(--border-color)] shrink-0 bg-black/30" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]">
                      {category?.name[language] || category?.name.ug || article.category}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      article.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : article.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[var(--text-primary)] line-clamp-2 leading-snug">
                    {getArticleTitle(article, language)}
                  </h4>
                </div>
              </div>

              {/* Meta: Date & Views */}
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-1.5 border-t border-[var(--border-color)]/60 font-mono">
                <span>{t('tableDate')}: {article.date}</span>
                <span>{t('tableViews')}: {article.views}</span>
              </div>

              {/* Touch Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="py-1.5 px-2 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('view')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingArticle(article)}
                  className="py-1.5 px-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>{t('edit')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('بۇ ماقالىنى بارلىق ئۈسكۈنىلەردىن ئۆچۈرۈشنى جەزملەشتۈرەمسىز؟')) {
                      deleteArticle(article.id);
                    }
                  }}
                  className="py-1.5 px-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ئۆچۈرۈش</span>
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs text-[var(--text-muted)] rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
            ھېچقانداق ماقالە تېپىلمىدى (بارلىق ماقالىلەر بوشىتىلغان ياكى ئىزدەش نەتىجىسى يوق).
          </div>
        )}
      </div>

      {/* Edit Article Modal (Responsive for Mobile & Desktop) */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-highlight)] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto p-3 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditingArticle(null)}
              className="absolute top-3 start-3 sm:top-6 sm:start-6 p-1.5 sm:p-2 rounded-lg bg-[var(--bg-main)] hover:bg-rose-950/40 text-[var(--text-muted)] hover:text-rose-400 border border-[var(--border-color)] transition-colors z-20"
              title="تاقاش"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="pt-7 sm:pt-0">
              <ArticleForm 
                editingArticle={editingArticle}
                onCancel={() => setEditingArticle(null)}
                onSuccess={() => setEditingArticle(null)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
