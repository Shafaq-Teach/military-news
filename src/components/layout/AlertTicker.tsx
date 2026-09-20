import React from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { AlertTriangle, Radio, ShieldAlert } from 'lucide-react';

export const AlertTicker: React.FC = () => {
  const { siteSettings, language, t } = useMilitary();

  const currentTicker = siteSettings.tickerText[language] || siteSettings.tickerText.ug;

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] overflow-hidden py-1.5 px-4 flex items-center relative z-20">
      <div className="flex items-center gap-2 px-3 py-0.5 bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold rounded shrink-0 animate-pulse">
        <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
        <span className="tracking-wider uppercase">DEFCON {siteSettings.activeDefcon}</span>
      </div>

      <div className="flex items-center gap-2 ms-3 me-2 shrink-0 text-xs text-[var(--accent-primary)] font-semibold border-e border-[var(--border-color)] pe-3">
        <Radio className="w-3.5 h-3.5 animate-pulse text-[var(--accent-secondary)]" />
        <span>FLASH INTEL:</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        <div className="inline-block text-xs font-medium text-[var(--text-secondary)]">
          {currentTicker}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 text-[11px] text-[var(--text-muted)] shrink-0 font-mono">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>SECURE FEED</span>
      </div>
    </div>
  );
};
