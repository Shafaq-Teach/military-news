import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { Crosshair, ArrowLeftRight, Zap, Shield, Gauge } from 'lucide-react';

export const SpecsComparator: React.FC = () => {
  const { articles, language, t } = useMilitary();

  // Published articles only
  const publishedList = articles.filter(a => a.status === 'published');

  const [idA, setIdA] = useState<string>(publishedList[0]?.id || '');
  const [idB, setIdB] = useState<string>(publishedList[1]?.id || publishedList[0]?.id || '');

  const itemA = publishedList.find(a => a.id === idA) || publishedList[0];
  const itemB = publishedList.find(a => a.id === idB) || publishedList[1];

  if (!itemA || !itemB) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      
      {/* Comparator Section Box */}
      <div className="hud-panel rounded-2xl p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--bg-surface)]/85 relative overflow-hidden shadow-2xl">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] mb-1">
              <Crosshair className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
              <span className="font-bold tracking-widest uppercase">TACTICAL ANALYSIS TOOL</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-['Orbitron',sans-serif]">
              {t('comparatorTitle')}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl">
              {t('comparatorSub')}
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center gap-2 text-xs font-mono text-[var(--accent-secondary)]">
            <Gauge className="w-4 h-4" />
            <span>INTERACTIVE MATRIX</span>
          </div>
        </div>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Select A */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
              {t('selectSystemA')}
            </label>
            <select
              value={idA}
              onChange={(e) => setIdA(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors"
            >
              {publishedList.map(a => (
                <option key={a.id} value={a.id} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  [{a.category.toUpperCase()}] {a.title[language] || a.title.ug}
                </option>
              ))}
            </select>
          </div>

          {/* Select B */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[var(--accent-secondary)] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]"></span>
              {t('selectSystemB')}
            </label>
            <select
              value={idB}
              onChange={(e) => setIdB(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors"
            >
              {publishedList.map(a => (
                <option key={a.id} value={a.id} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  [{a.category.toUpperCase()}] {a.title[language] || a.title.ug}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A */}
          <div className="p-5 rounded-xl bg-[var(--bg-main)]/90 border border-[var(--accent-primary)]/40 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={itemA.imageUrl} 
                alt="System A" 
                className="w-16 h-16 rounded-lg object-cover border border-[var(--border-color)]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[var(--accent-primary)] block font-bold">
                  PLATFORM A // {(itemA.specs.clearance || 'UNCLASSIFIED').split(' ')[0]}
                </span>
                <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                  {itemA.title[language] || itemA.title.ug}
                </h4>
                <span className="text-xs text-[var(--text-muted)]">
                  {itemA.specs.origin}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border-color)] text-xs">
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('speed')}</span>
                <span className="font-bold text-[var(--accent-primary)] font-mono">{itemA.specs.speed}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('range')}</span>
                <span className="font-bold text-[var(--text-primary)] font-mono">{itemA.specs.range}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('payload')}</span>
                <span className="font-bold text-[var(--text-primary)] font-mono">{itemA.specs.payload}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('rcs')}</span>
                <span className="font-bold text-emerald-400 font-mono">{itemA.specs.radarCrossSection || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[var(--text-muted)]">{t('status')}</span>
                <span className="font-bold text-[var(--text-secondary)]">{itemA.specs.status}</span>
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="p-5 rounded-xl bg-[var(--bg-main)]/90 border border-[var(--accent-secondary)]/40 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={itemB.imageUrl} 
                alt="System B" 
                className="w-16 h-16 rounded-lg object-cover border border-[var(--border-color)]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[var(--accent-secondary)] block font-bold">
                  PLATFORM B // {(itemB.specs.clearance || 'UNCLASSIFIED').split(' ')[0]}
                </span>
                <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                  {itemB.title[language] || itemB.title.ug}
                </h4>
                <span className="text-xs text-[var(--text-muted)]">
                  {itemB.specs.origin}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border-color)] text-xs">
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('speed')}</span>
                <span className="font-bold text-[var(--accent-secondary)] font-mono">{itemB.specs.speed}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('range')}</span>
                <span className="font-bold text-[var(--text-primary)] font-mono">{itemB.specs.range}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('payload')}</span>
                <span className="font-bold text-[var(--text-primary)] font-mono">{itemB.specs.payload}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-color)]/50">
                <span className="text-[var(--text-muted)]">{t('rcs')}</span>
                <span className="font-bold text-emerald-400 font-mono">{itemB.specs.radarCrossSection || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[var(--text-muted)]">{t('status')}</span>
                <span className="font-bold text-[var(--text-secondary)]">{itemB.specs.status}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
