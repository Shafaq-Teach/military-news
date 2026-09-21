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
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  adminLogin: (user: string, pass: string, remember: boolean) => boolean;
  adminLogout: () => void;
  changeAdminPassword: (currentPass: string, newPass: string, newUser?: string) => { success: boolean; error?: string };
  getAdminCredentials: () => { user: string; pass: string };
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

const getDeletedIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem('mil_deleted_ids');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
};

const saveDeletedId = (id: string) => {
  try {
    const deleted = getDeletedIds();
    deleted.add(id);
    localStorage.setItem('mil_deleted_ids', JSON.stringify(Array.from(deleted)));
  } catch (e) {
    console.error('Failed to save deleted ID', e);
  }
};

const sanitizeArticle = (a: Article): Article => {
  if (a.category !== 'weapons' && a.category !== 'drones') {
    if (a.specs) {
      return {
        ...a,
        specs: {
          ...a.specs,
          speed: 'N/A',
          range: 'N/A',
          payload: 'N/A'
        }
      };
    }
  }
  return a;
};

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
    const deletedIds = getDeletedIds();
    const isCleared = localStorage.getItem('mil_articles_cleared') === 'true';
    if (isCleared) {
      const saved = localStorage.getItem('mil_articles');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return Array.isArray(parsed) ? parsed.filter((a: Article) => !deletedIds.has(a.id)).map(sanitizeArticle) : [];
        } catch {
          return [];
        }
      }
      return [];
    }

    const saved = localStorage.getItem('mil_articles');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((a: Article) => !deletedIds.has(a.id)).map(sanitizeArticle);
        }
      } catch (e) {
        console.error('Failed to parse articles from storage', e);
      }
    }
    return INITIAL_ARTICLES.filter(a => !deletedIds.has(a.id)).map(sanitizeArticle);
  });

  // Load online published articles dynamically from news.json (updated by n8n or automation)
  useEffect(() => {
    fetch('./news.json?t=' + Date.now())
      .then(res => res.ok ? res.json() : [])
      .then((onlineArticles: any[]) => {
        if (Array.isArray(onlineArticles) && onlineArticles.length > 0) {
          const deletedIds = getDeletedIds();
          setArticles(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const newItems = onlineArticles
              .filter(a => a && a.id && !existingIds.has(a.id) && !deletedIds.has(a.id))
              .map(a => ({
                ...a,
                title: {
                  ug: a.title?.ug || a.title?.en || '',
                  ar: a.title?.ar || a.title?.ug || a.title?.en || '',
                  en: a.title?.en || a.title?.ug || ''
                },
                summary: {
                  ug: a.summary?.ug || a.summary?.en || '',
                  ar: a.summary?.ar || a.summary?.ug || a.summary?.en || '',
                  en: a.summary?.en || a.summary?.ug || ''
                },
                content: {
                  ug: a.content?.ug || a.content?.en || '',
                  ar: a.content?.ar || a.content?.ug || a.content?.en || '',
                  en: a.content?.en || a.content?.ug || ''
                },
                specs: {
                  speed: a.specs?.speed || a.specs?.['تېزلىكى'] || 'N/A',
                  range: a.specs?.range || a.specs?.['دائىرىسى'] || 'N/A',
                  payload: a.specs?.payload || a.specs?.['يۈكى'] || 'N/A',
                  origin: a.specs?.origin || a.specs?.['ئىشلەپچىقارغۇچى'] || a.specs?.['مەنبە'] || 'دۇنياۋى ئاخبارات',
                  status: a.specs?.status || a.specs?.['ھالىتى'] || 'ئاكتىپ',
                  clearance: a.specs?.clearance || a.specs?.['دەرىجىسى'] || 'ئاشكارا تاكتىكىلىق ئاخبارات'
                }
              }));

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

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('mil_admin_auth') === 'true' ||
      localStorage.getItem('mil_admin_auth') === 'true'
    );
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const getAdminCredentials = () => {
    const user = localStorage.getItem('mil_admin_user') || 'admin';
    const pass = localStorage.getItem('mil_admin_pass') || 'admin123';
    return { user, pass };
  };

  const adminLogin = (inputUser: string, inputPass: string, remember: boolean): boolean => {
    const creds = getAdminCredentials();
    const matchUser = inputUser.trim().toLowerCase() === creds.user.trim().toLowerCase();
    const matchPass = inputPass === creds.pass;

    if (matchUser && matchPass) {
      if (remember) {
        localStorage.setItem('mil_admin_auth', 'true');
      } else {
        sessionStorage.setItem('mil_admin_auth', 'true');
      }
      setIsAdminAuthenticated(true);
      setIsLoginModalOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    sessionStorage.removeItem('mil_admin_auth');
    localStorage.removeItem('mil_admin_auth');
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
  };

  const changeAdminPassword = (
    currentPass: string, 
    newPass: string, 
    newUser?: string
  ): { success: boolean; error?: string } => {
    const creds = getAdminCredentials();
    if (currentPass !== creds.pass) {
      return { 
        success: false, 
        error: language === 'en' 
          ? 'Current password does not match' 
          : language === 'ar' 
          ? 'كلمة المرور الحالية غير صحيحة' 
          : 'ھازىرقى مەخپىي نومۇر خاتا' 
      };
    }
    if (!newPass || newPass.length < 4) {
      return { 
        success: false, 
        error: language === 'en' 
          ? 'New password must be at least 4 characters' 
          : language === 'ar' 
          ? 'يجب أن تكون كلمة المرور 4 أحرف على الأقل' 
          : 'يېڭى مەخپىي نومۇر كەم دېگەندە 4 ھەرپ ياكى سان بولسۇن' 
      };
    }

    if (newUser && newUser.trim()) {
      localStorage.setItem('mil_admin_user', newUser.trim());
    }
    localStorage.setItem('mil_admin_pass', newPass);
    return { success: true };
  };

  // Check URL param or hash on mount to support direct linking to an article or admin
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const articleId = params.get('article') || (window.location.hash ? window.location.hash.replace('#', '') : null);
      if (articleId && articles.length > 0) {
        const found = articles.find(a => a.id === articleId);
        if (found) setSelectedArticle(found);
      }

      const adminParam = params.get('admin') || params.get('login');
      if (adminParam === 'true' || adminParam === '1') {
        if (isAdminAuthenticated) {
          setIsAdminOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    } catch {}
  }, [articles, isAdminAuthenticated]);

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
    saveDeletedId(id);
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
    articles.forEach(a => saveDeletedId(a.id));
    INITIAL_ARTICLES.forEach(a => saveDeletedId(a.id));
    setArticles([]);
    setSelectedArticle(null);
    localStorage.setItem('mil_articles', JSON.stringify([]));
    localStorage.setItem('mil_articles_cleared', 'true');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDemo = () => {
    localStorage.removeItem('mil_deleted_ids');
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
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        isLoginModalOpen,
        setIsLoginModalOpen,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        getAdminCredentials,
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
