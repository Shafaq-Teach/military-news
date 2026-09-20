import React from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { Shield, Lock, Radio, Terminal, Award, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, language, setActiveCategory, t } = useMilitary();

  return (
    <footer className="mt-20 bg-[var(--bg-surface)] border-t border-[var(--border-color)] relative z-10">
      
      {/* Classification Banner */}
      <div className="bg-[var(--bg-main)]/90 border-b border-[var(--border-color)] py-3 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-bold tracking-wider">
              {siteSettings.classificationText[language] || siteSettings.classificationText.ug}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ENCRYPTED TLS 1.3
            </span>
            <span>OSINT CLEARANCE LEVEL 4</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Intel Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-glow)]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--text-primary)] font-['Orbitron',sans-serif]">
                  {siteSettings.siteName[language] || siteSettings.siteName.ug}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  GLOBAL DEFENSE RESEARCH & TACTICAL ANALYSIS
                </p>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
              {t('classificationNotice')}
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[var(--accent-primary)]">
              <span className="px-2.5 py-1 rounded bg-[var(--bg-main)] border border-[var(--border-color)]">
                SYSTEM: ACTIVE
              </span>
              <span className="px-2.5 py-1 rounded bg-[var(--bg-main)] border border-[var(--border-color)]">
                TELEMETRY: ONLINE
              </span>
            </div>
          </div>

          {/* Col 2: Categories Section 1 */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-[var(--text-primary)] uppercase mb-3 flex items-center gap-2 border-b border-[var(--border-color)] pb-1">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              SECTORS 01 - 04
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 4).map(cat => (
                <li key={cat.key}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.key);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="text-[var(--text-secondary)] hover:text-[var(--border-highlight)] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] font-mono opacity-60">{cat.code}</span>
                    <span>{cat.name[language] || cat.name.ug}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories Section 2 */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-[var(--text-primary)] uppercase mb-3 flex items-center gap-2 border-b border-[var(--border-color)] pb-1">
              <Radio className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              SECTORS 05 - 08
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(4, 8).map(cat => (
                <li key={cat.key}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.key);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="text-[var(--text-secondary)] hover:text-[var(--border-highlight)] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] font-mono opacity-60">{cat.code}</span>
                    <span>{cat.name[language] || cat.name.ug}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-3 font-mono">
          <p>{t('allRightsReserved')}</p>
          <div className="flex items-center gap-4">
            <span>UKIJ Ekran WebFont Engine</span>
            <span>•</span>
            <span>RTL / LTR Core v2.4</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
