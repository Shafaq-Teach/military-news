import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { Language, ThemeId, CategoryKey } from '../../types/military';
import { 
  Shield, 
  Palette, 
  Sun, 
  Moon, 
  Globe, 
  Settings, 
  Crosshair
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    siteSettings, 
    language, 
    setLanguage, 
    theme, 
    cycleTheme, 
    displayMode, 
    toggleDisplayMode,
    isAdminOpen, 
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsLoginModalOpen,
    activeCategory,
    setActiveCategory,
    t
  } = useMilitary();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const themeColors: Record<ThemeId, string> = {
    'cyber-teal': '#00f2fe',
    'black-ops': '#10b981',
    'combat-alert': '#ff2a5f',
    'desert-recon': '#f59e0b'
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'ug', label: 'ئۇيغۇرچە' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' }
  ];

  // 8 Categories + All filter with concise, clear labels
  const navCategories: { key: CategoryKey | 'all'; label: { ug: string; ar: string; en: string } }[] = [
    { key: 'all', label: { ug: 'ھەممىسى', ar: 'الكل', en: 'All' } },
    { key: 'weapons', label: { ug: 'قوراللار', ar: 'الأسلحة', en: 'Weapons' } },
    { key: 'drones', label: { ug: 'دىرونلار', ar: 'المسيرات', en: 'Drones' } },
    { key: 'projects', label: { ug: 'تەتقىقات', ar: 'المشاريع', en: 'R&D' } },
    { key: 'ai_military', label: { ug: 'سۈنئىي ئىدراك', ar: 'الذكاء الاصطناعي', en: 'AI' } },
    { key: 'intelligence', label: { ug: 'ئىستىخبارات', ar: 'الاستخبارات', en: 'Intel' } },
    { key: 'geopolitics', label: { ug: 'سىياسىي تەھلىل', ar: 'تحليل سياسي', en: 'Geopolitics' } },
    { key: 'news', label: { ug: 'خەۋەرلەر', ar: 'الأخبار', en: 'News' } },
    { key: 'database', label: { ug: 'مەلۇمات ئامبىرى', ar: 'الموسوعة', en: 'Database' } }
  ];

  // Distinct vibrant gradient themes matching user's requested colorful style
  const navThemeMap: Record<string, { gradient: string; text: string; glow: string; border: string }> = {
    all: {
      gradient: 'from-[#a855f7] via-[#9333ea] to-[#6366f1]',
      text: 'text-amber-200',
      glow: 'shadow-[0_4px_16px_rgba(168,85,247,0.6)]',
      border: 'border-purple-300/60'
    },
    weapons: {
      gradient: 'from-[#f97316] via-[#ea580c] to-[#ef4444]',
      text: 'text-white',
      glow: 'shadow-[0_4px_16px_rgba(249,115,22,0.6)]',
      border: 'border-orange-300/60'
    },
    drones: {
      gradient: 'from-[#00d2ff] via-[#0284c7] to-[#2563eb]',
      text: 'text-white',
      glow: 'shadow-[0_4px_16px_rgba(2,132,199,0.6)]',
      border: 'border-cyan-300/60'
    },
    projects: {
      gradient: 'from-[#10b981] via-[#059669] to-[#047857]',
      text: 'text-white',
      glow: 'shadow-[0_4px_16px_rgba(16,185,129,0.6)]',
      border: 'border-emerald-300/60'
    },
    ai_military: {
      gradient: 'from-[#facc15] via-[#fbbf24] to-[#f59e0b]',
      text: 'text-blue-950 font-black',
      glow: 'shadow-[0_4px_16px_rgba(250,204,21,0.6)]',
      border: 'border-yellow-200/70'
    },
    intelligence: {
      gradient: 'from-[#06b6d4] via-[#0891b2] to-[#0e7490]',
      text: 'text-white font-black',
      glow: 'shadow-[0_4px_16px_rgba(6,182,212,0.6)]',
      border: 'border-cyan-300/60'
    },
    geopolitics: {
      gradient: 'from-[#ec4899] via-[#f43f5e] to-[#e11d48]',
      text: 'text-white font-black',
      glow: 'shadow-[0_4px_16px_rgba(236,72,153,0.6)]',
      border: 'border-pink-300/60'
    },
    news: {
      gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
      text: 'text-white font-black',
      glow: 'shadow-[0_4px_16px_rgba(59,130,246,0.6)]',
      border: 'border-blue-300/60'
    },
    database: {
      gradient: 'from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]',
      text: 'text-yellow-200 font-black',
      glow: 'shadow-[0_4px_16px_rgba(139,92,246,0.6)]',
      border: 'border-violet-300/60'
    }
  };

  const currentSiteName = siteSettings.siteName[language] || siteSettings.siteName.ug;
  const currentSlogan = siteSettings.siteSlogan[language] || siteSettings.siteSlogan.ug;

  const handleCategoryClick = (catKey: CategoryKey | 'all') => {
    setActiveCategory(catKey);
    if (isAdminOpen) setIsAdminOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-main)]/95 backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* Main Header Bar Row */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* 1. Logo & Brand Identity (Right in RTL) */}
          <div 
            onClick={() => {
              setIsAdminOpen(false);
              setActiveCategory('all');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center p-0.5 rounded-xl bg-gradient-to-br from-[#ff007a] via-[#a855f7] to-[#00d2ff] shadow-[0_0_16px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-all shrink-0">
              <div className="w-full h-full rounded-[10px] bg-[#07131d] flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f2fe] group-hover:scale-110 transition-transform" />
                <Crosshair className="w-3.5 h-3.5 text-[#ff2a5f] absolute top-0.5 end-0.5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-[#ff007a] via-[#a855f7] via-[#00d2ff] via-[#10b981] to-[#ffaa00] bg-clip-text text-transparent font-['Orbitron',sans-serif] drop-shadow-[0_2px_14px_rgba(168,85,247,0.6)] truncate">
                  {currentSiteName}
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 text-[9px] font-mono font-bold bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
                  v3.4
                </span>
              </div>
              <p className="hidden 2xl:block text-[11px] text-[var(--text-secondary)] truncate max-w-[160px] font-sans">
                {currentSlogan}
              </p>
            </div>
          </div>

          {/* 2. Middle Category Navigation (Vibrant Candy Pills matching user screenshot) */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-1 sm:mx-2 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md overflow-x-auto scrollbar-none shadow-inner">
              {navCategories.map(cat => {
                const isActive = activeCategory === cat.key;
                const label = cat.label[language] || cat.label.ug;
                const theme = navThemeMap[cat.key] || navThemeMap.all;

                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryClick(cat.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] whitespace-nowrap transition-all duration-300 relative border bg-gradient-to-r ${theme.gradient} ${theme.border} ${theme.text} font-bold ${
                      isActive
                        ? `ring-2 ring-white scale-105 ${theme.glow} brightness-110 z-10 shadow-lg`
                        : 'opacity-90 hover:opacity-100 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 start-1/2 -translate-x-1/2 w-4 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* 3. Action Controls: Vibrant Gradient Pill Buttons (Left in RTL, matching user screenshot) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

            {/* 1) Theme Switcher Button (Golden-Amber Gradient) */}
            <button
              onClick={cycleTheme}
              title={t('theme')}
              className="p-2.5 rounded-2xl border border-amber-300/40 bg-gradient-to-br from-[#f59e0b] via-[#ea580c] to-[#d97706] text-white hover:brightness-110 shadow-[0_4px_14px_rgba(245,158,11,0.5)] transition-all flex items-center gap-1.5 group shrink-0 hover:scale-105 active:scale-95"
            >
              <Palette className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
              <span 
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/60 inline-block shadow-sm"
                style={{ backgroundColor: themeColors[theme] }}
              />
            </button>

            {/* 2) Dark / Light Mode Toggle Button (Sky-Blue Gradient) */}
            <button
              onClick={toggleDisplayMode}
              title={displayMode === 'dark' ? t('modeLight') : t('modeDark')}
              className="p-2.5 rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-[#00d2ff] via-[#0284c7] to-[#2563eb] text-white hover:brightness-110 shadow-[0_4px_14px_rgba(2,132,199,0.5)] transition-all flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
            >
              {displayMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-200" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </button>

            {/* 3) Language Dropdown (Deep Purple Gradient) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(prev => !prev)}
                title="تىل تاللاش / Select Language"
                className="p-2.5 rounded-2xl border border-purple-300/40 bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6366f1] text-white hover:brightness-110 shadow-[0_4px_14px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
              >
                <Globe className="w-4 h-4 text-white" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute end-0 mt-2 w-32 bg-[#07131d]/95 backdrop-blur-xl border border-purple-500/40 rounded-xl shadow-2xl p-1 z-50 hud-panel"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  {languages.map(item => (
                    <button
                      key={item.code}
                      onClick={() => setLanguage(item.code)}
                      className={`w-full text-start px-3 py-2 text-xs rounded-lg transition-colors font-bold ${
                        language === item.code 
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm' 
                          : 'hover:bg-white/10 text-white/90'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4) Admin CMS Dashboard Button */}
            {isAdminOpen && (
              <button
                onClick={() => setIsAdminOpen(false)}
                title={t('exitAdmin')}
                className="p-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)] border border-rose-300/50 hover:scale-105"
              >
                <Settings className="w-4 h-4 animate-spin" />
              </button>
            )}

          </div>

        </div>

      </div>

      {/* 4. Mobile & Tablet Category Scroll Strip (Visible on screens < md) */}
      <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md px-2 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 shadow-inner">
        {navCategories.map(cat => {
          const isActive = activeCategory === cat.key;
          const label = cat.label[language] || cat.label.ug;
          const theme = navThemeMap[cat.key] || navThemeMap.all;

          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-300 shrink-0 border bg-gradient-to-r ${theme.gradient} ${theme.border} ${theme.text} font-bold ${
                isActive
                  ? `ring-2 ring-white scale-105 ${theme.glow} brightness-110 shadow-md`
                  : 'opacity-85 hover:opacity-100 hover:scale-105 shadow-sm'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

    </header>
  );
};
