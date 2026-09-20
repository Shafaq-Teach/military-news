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
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-1.5 group-hover:border-[var(--border-highlight)] transition-all shadow-[0_0_12px_var(--accent-glow)] shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
              <Crosshair className="w-3.5 h-3.5 text-[var(--accent-secondary)] absolute top-0.5 end-0.5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-lg md:text-xl font-black tracking-tight text-[var(--text-primary)] font-['Orbitron',sans-serif] truncate">
                  {currentSiteName}
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 text-[9px] font-mono font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--border-color)] rounded">
                  v3.4
                </span>
              </div>
              <p className="hidden 2xl:block text-[11px] text-[var(--text-secondary)] truncate max-w-[160px] font-sans">
                {currentSlogan}
              </p>
            </div>
          </div>

          {/* 2. Middle Category Navigation (Now has maximum space for all 9 categories!) */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-1 sm:mx-2 min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 rounded-xl bg-[var(--bg-surface)]/80 border border-[var(--border-color)] backdrop-blur-sm overflow-x-auto scrollbar-none">
              {navCategories.map(cat => {
                const isActive = activeCategory === cat.key;
                const label = cat.label[language] || cat.label.ug;

                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryClick(cat.key)}
                    className={`px-2.5 py-1 rounded-lg text-xs sm:text-[13px] whitespace-nowrap transition-all relative ${
                      isActive
                        ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-black shadow-[0_0_12px_var(--accent-glow)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--border-highlight)] hover:bg-[var(--bg-card-hover)] font-medium'
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 start-1/2 -translate-x-1/2 w-3 h-0.5 bg-[var(--accent-secondary)] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* 3. Action Controls: ALL Compact Icon Buttons (Left in RTL) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* 1) Theme Switcher Button (Palette Icon + Glow Dot) */}
            <button
              onClick={cycleTheme}
              title={t('theme')}
              className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-highlight)] text-[var(--text-primary)] transition-all flex items-center gap-1.5 shadow-sm group"
            >
              <Palette className="w-4 h-4 text-[var(--accent-primary)] group-hover:rotate-45 transition-transform" />
              <span 
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/30 inline-block shadow-sm"
                style={{ backgroundColor: themeColors[theme] }}
              />
            </button>

            {/* 2) Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleDisplayMode}
              title={displayMode === 'dark' ? t('modeLight') : t('modeDark')}
              className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] transition-all"
            >
              {displayMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-500" />
              )}
            </button>

            {/* 3) Language Dropdown (Globe Icon Only button) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(prev => !prev)}
                title="تىل تاللاش / Select Language"
                className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-highlight)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center justify-center"
              >
                <Globe className="w-4 h-4 text-[var(--accent-secondary)]" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute end-0 mt-2 w-32 bg-[var(--bg-surface)] border border-[var(--border-highlight)] rounded-lg shadow-2xl p-1 z-50 hud-panel"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  {languages.map(item => (
                    <button
                      key={item.code}
                      onClick={() => setLanguage(item.code)}
                      className={`w-full text-start px-3 py-2 text-xs rounded transition-colors ${
                        language === item.code 
                          ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold' 
                          : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4) Admin CMS Dashboard Button (Settings Icon Only button) */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              title={isAdminOpen ? t('exitAdmin') : t('adminDashboard')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                isAdminOpen
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)] border border-rose-400'
                  : 'bg-[var(--accent-primary)]/15 border border-[var(--border-highlight)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-main)] shadow-[0_0_12px_var(--accent-glow)]'
              }`}
            >
              <Settings className={`w-4 h-4 ${isAdminOpen ? 'animate-spin' : ''}`} />
            </button>

          </div>

        </div>

      </div>

      {/* 4. Mobile & Tablet Category Scroll Strip (Visible on screens < md) */}
      <div className="md:hidden border-t border-[var(--border-color)]/60 bg-[var(--bg-surface)]/80 px-2 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-1">
        {navCategories.map(cat => {
          const isActive = activeCategory === cat.key;
          const label = cat.label[language] || cat.label.ug;

          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-black shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium'
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
