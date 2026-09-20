import React from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { 
  Crosshair, 
  Plane, 
  Atom, 
  Cpu, 
  Radio, 
  Globe, 
  ShieldAlert, 
  Database,
  Layers
} from 'lucide-react';
import { CategoryKey } from '../../types/military';

export const CategoryNav: React.FC = () => {
  const { 
    activeCategory, 
    setActiveCategory, 
    articles, 
    language, 
    t 
  } = useMilitary();

  const iconMap: Record<string, React.ReactNode> = {
    Crosshair: <Crosshair className="w-4 h-4" />,
    Plane: <Plane className="w-4 h-4" />,
    Atom: <Atom className="w-4 h-4" />,
    Cpu: <Cpu className="w-4 h-4" />,
    Radio: <Radio className="w-4 h-4" />,
    Globe: <Globe className="w-4 h-4" />,
    ShieldAlert: <ShieldAlert className="w-4 h-4" />,
    Database: <Database className="w-4 h-4" />
  };

  const getArticleCount = (catKey: CategoryKey | 'all') => {
    if (catKey === 'all') {
      return articles.filter(a => a.status === 'published').length;
    }
    return articles.filter(a => a.category === catKey && a.status === 'published').length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      
      <div className="flex items-center justify-between mb-3 border-b border-[var(--border-color)] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[var(--accent-primary)] rounded-full animate-ping"></span>
          <h2 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <span className="font-mono text-[10px] tracking-wider uppercase opacity-75">TACTICAL SECTORS //</span>
            <span>ھەربىي بۆلەكلەر</span>
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          TOTAL ACTIVE: {getArticleCount('all')}
        </span>
      </div>

      {/* Category Pills Slider / Grid */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        
        {/* 'All' Tab */}
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
            activeCategory === 'all'
              ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] border-[var(--border-highlight)] shadow-[0_0_15px_var(--accent-glow)]'
              : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--border-highlight)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t('allCategories')}</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-black/20 font-mono">
            {getArticleCount('all')}
          </span>
        </button>

        {/* 8 Category Tabs */}
        {CATEGORIES.map(cat => {
          const isSelected = activeCategory === cat.key;
          const count = getArticleCount(cat.key);

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] border-[var(--border-highlight)] shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--border-highlight)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              <span className={isSelected ? 'text-[var(--bg-main)]' : 'text-[var(--accent-primary)]'}>
                {iconMap[cat.iconName]}
              </span>
              <span>{cat.name[language] || cat.name.ug}</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded bg-black/20 font-mono">
                {count}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
};
