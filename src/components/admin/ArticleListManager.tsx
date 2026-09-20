import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { ArticleStatus } from '../../types/military';
import { 
  Trash2, 
  Eye, 
  Star, 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle,
  FileText
} from 'lucide-react';

export const ArticleListManager: React.FC = () => {
  const { 
    articles, 
    deleteArticle, 
    setSelectedArticle, 
    language, 
    t 
  } = useMilitary();

  const [filterStatus, setFilterStatus] = useState<ArticleStatus | 'all'>('all');
  const [filterText, setFilterText] = useState('');

  const filtered = articles.filter(a => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const title = (a.title[language] || a.title.ug).toLowerCase();
    const matchesSearch = !filterText || title.includes(filterText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['all', 'published', 'pending', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors border ${
                filterStatus === status
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] border-[var(--border-highlight)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-highlight)]'
              }`}
            >
              {status} ({status === 'all' ? articles.length : articles.filter(a => a.status === status).length})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute inset-y-0 start-3 my-auto text-[var(--text-muted)]" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="ماقالىلەردىن ئىزدەش..."
            className="ps-8 pe-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
          />
        </div>

      </div>

      {/* Articles Table / Cards */}
      <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)] font-bold text-[11px]">
              <th className="p-3 text-start">سەرلەۋھە (TITLE)</th>
              <th className="p-3 text-start">سەھىپە (CATEGORY)</th>
              <th className="p-3 text-start">ھالىتى (STATUS)</th>
              <th className="p-3 text-start">چېسلا</th>
              <th className="p-3 text-start">كۆرۈلۈشى</th>
              <th className="p-3 text-end">مەغپىيەت ۋە باشقۇرۇش</th>
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
                        className="w-9 h-9 rounded object-cover border border-[var(--border-color)] shrink-0" 
                      />
                      <span className="font-bold text-[var(--text-primary)] line-clamp-1">
                        {article.title[language] || article.title.ug}
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
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        title="ئالدىن كۆرۈش"
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] text-[var(--accent-primary)] border border-transparent hover:border-[var(--border-color)]"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteArticle(article.id)}
                        title="ئۆچۈرۈش"
                        className="p-1.5 rounded hover:bg-rose-950/60 text-rose-400 border border-transparent hover:border-rose-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
