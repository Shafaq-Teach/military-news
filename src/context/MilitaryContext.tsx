import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  ThemeId, 
  DisplayMode, 
  CategoryKey, 
  Article, 
  SiteSettings 
} from '../types/military';
import { INITIAL_ARTICLES } from '../data/initialArticles';
import { UI_TRANSLATIONS } from '../data/translations';

interface MilitaryContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  cycleTheme: () => void;
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
  articles: Article[];
  siteSettings: SiteSettings;
  activeCategory: CategoryKey | 'all';
  setActiveCategory: (cat: CategoryKey | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (art: Article | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  // Admin Operations
  addArticle: (article: Omit<Article, 'id' | 'views' | 'date'>) => void;
  approveArticle: (id: string) => void;
  rejectArticle: (id: string) => void;
  deleteArticle: (id: string) => void;
  clearAllArticles: () => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetToDemo: () => void;
  // UI Translation Helper
  t: (key: string) => string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: {
    ug: 'ئەسكىرىي يېڭىلىقلار',
    ar: 'الأخبار العسكرية',
    en: 'Military News'
  },
  siteSlogan: {
    ug: 'دۇنياۋى ئەسكىرىي تەتقىقات، يۇقىرى تېخنىكىلىق قوراللار ۋە تاكتىكا مەركىزى',
    ar: 'منصة الدراسات العسكرية والعتاد التكتيكي والاستخبارات الاستراتيجية',
    en: 'Global Defense Intelligence, Next-Gen Weaponry & Strategic Systems'
  },
  tickerText: {
    ug: 'ئاگاھلاندۇرۇش: دېڭىز بوغۇزلىرىدىكى فىلوت ھەرىكىتى ۋە سۈنئىي ئىدراكلىق دىرون مەشىق سىستېمىسى يۇقىرى جەڭ تەييارلىقىغا ئۆتتى.',
    ar: 'إنذار استراتيجي: إعادة تموضع الأساطيل البحرية في المضائق الدولية ورفع جاهزية أسراب الدرونات المقاتلة للدرجة القصوى.',
    en: 'ALERT: Strategic carrier battle groups repositioned; neural combat drone swarms deployed to maximum readiness state.'
  },
  activeDefcon: 2,
  contactEmail: 'intel@military-news.def',
  classificationText: {
    ug: 'ھەربىي تەھلىل دەرىجىسى: تاكتىكىلىق ئاشكارا ئاخبارات (OSINT TACTICAL)',
    ar: 'التصنيف العملياتي: استخبارات المصادر المفتوحة التكتيكية (OSINT)',
    en: 'CLASSIFICATION: TACTICAL OPEN-SOURCE DEFENSE INTELLIGENCE'
  },
  autoApproveArticles: false
};

const THEMES_LIST: ThemeId[] = ['cyber-teal', 'black-ops', 'combat-alert', 'desert-recon'];

const MilitaryContext = createContext<MilitaryContextType | undefined>(undefined);

export const MilitaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('mil_lang') as Language) || 'ug';
  });

  // 2. Theme state
  const [theme, setThemeState] = useState<ThemeId>(() => {
    return (localStorage.getItem('mil_theme') as ThemeId) || 'cyber-teal';
  });

  // 3. Dark/Light mode state
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => {
    return (localStorage.getItem('mil_mode') as DisplayMode) || 'dark';
  });

  // 4. Articles state
  const [articles, setArticles] = useState<Article[]>(() => {
    // If user explicitly wiped out all articles, do not repopulate demo articles
    const isCleared = localStorage.getItem('mil_articles_cleared') === 'true';
    if (isCleared) {
      const saved = localStorage.getItem('mil_articles');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
      return [];
    }

    const saved = localStorage.getItem('mil_articles');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse articles from storage', e);
      }
    }
    return INITIAL_ARTICLES;
  });

  // Load online published articles dynamically from news.json (updated by n8n)
  useEffect(() => {
    fetch('./news.json?t=' + Date.now())
      .then(res => res.ok ? res.json() : [])
      .then((onlineArticles: Article[]) => {
        if (Array.isArray(onlineArticles) && onlineArticles.length > 0) {
          setArticles(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const newItems = onlineArticles.filter(a => !existingIds.has(a.id));
            if (newItems.length > 0) {
              return [...newItems, ...prev];
            }
            return prev;
          });
        }
      })
      .catch(err => console.debug('Online news fetch:', err));
  }, []);

  // 5. Site Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('mil_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings from storage', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  // 6. UI Navigation & Selection state
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync Language with DOM dir, lang and local storage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mil_lang', lang);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'en' ? 'ltr' : 'rtl');
    
    // Set appropriate font family on root body
    if (language === 'ug') {
      document.body.style.fontFamily = "'UKIJ Ekran', 'Alkatip Basma Tom', 'Microsoft Uighur', 'Arabic Typesetting', 'Cairo', sans-serif";
    } else if (language === 'ar') {
      document.body.style.fontFamily = "'Cairo', 'Readex Pro', sans-serif";
    } else {
      document.body.style.fontFamily = "'Rajdhani', 'Orbitron', 'Inter', sans-serif";
    }
  }, [language]);

  // Sync Theme with DOM
  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('mil_theme', newTheme);
  };

  const cycleTheme = () => {
    const currentIndex = THEMES_LIST.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES_LIST.length;
    setTheme(THEMES_LIST[nextIndex]);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync Dark/Light Mode with DOM
  const toggleDisplayMode = () => {
    const nextMode = displayMode === 'dark' ? 'light' : 'dark';
    setDisplayMode(nextMode);
    localStorage.setItem('mil_mode', nextMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', displayMode);
  }, [displayMode]);

  // Save articles to storage whenever changed
  useEffect(() => {
    localStorage.setItem('mil_articles', JSON.stringify(articles));
  }, [articles]);

  // Save settings to storage whenever changed
  useEffect(() => {
    localStorage.setItem('mil_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Admin Actions
  const addArticle = (articleData: Omit<Article, 'id' | 'views' | 'date'>) => {
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      views: 1,
      status: siteSettings.autoApproveArticles ? 'published' : 'pending'
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const approveArticle = (id: string) => {
    setArticles(prev => 
      prev.map(a => a.id === id ? { ...a, status: 'published' } : a)
    );
  };

  const rejectArticle = (id: string) => {
    setArticles(prev => 
      prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a)
    );
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => {
      const updated = prev.filter(a => a.id !== id);
      if (updated.length === 0) {
        localStorage.setItem('mil_articles_cleared', 'true');
      }
      return updated;
    });
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  const clearAllArticles = () => {
    setArticles([]);
    setSelectedArticle(null);
    localStorage.setItem('mil_articles', JSON.stringify([]));
    localStorage.setItem('mil_articles_cleared', 'true');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDemo = () => {
    localStorage.removeItem('mil_articles_cleared');
    setArticles(INITIAL_ARTICLES);
    setSiteSettings(DEFAULT_SETTINGS);
    localStorage.setItem('mil_articles', JSON.stringify(INITIAL_ARTICLES));
    localStorage.setItem('mil_settings', JSON.stringify(DEFAULT_SETTINGS));
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['ug']?.[key] || key;
  };

  return (
    <MilitaryContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        cycleTheme,
        displayMode,
        toggleDisplayMode,
        articles,
        siteSettings,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedArticle,
        setSelectedArticle,
        isAdminOpen,
        setIsAdminOpen,
        addArticle,
        approveArticle,
        rejectArticle,
        deleteArticle,
        clearAllArticles,
        updateSiteSettings,
        resetToDemo,
        t
      }}
    >
      {children}
    </MilitaryContext.Provider>
  );
};

export const useMilitary = (): MilitaryContextType => {
  const context = useContext(MilitaryContext);
  if (!context) {
    throw new Error('useMilitary must be used within a MilitaryProvider');
  }
  return context;
};
