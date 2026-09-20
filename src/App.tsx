import React from 'react';
import { MilitaryProvider, useMilitary } from './context/MilitaryContext';
import { Header } from './components/layout/Header';
import { AlertTicker } from './components/layout/AlertTicker';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ArticleCard } from './components/home/ArticleCard';
import { ArticleModal } from './components/home/ArticleModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CATEGORIES } from './data/categories';
import { ShieldAlert, RefreshCw } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    articles, 
    activeCategory, 
    searchQuery, 
    setSearchQuery,
    setActiveCategory,
    isAdminOpen, 
    language, 
    t 
  } = useMilitary();

  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    // Only published articles are visible on public site
    if (article.status !== 'published') return false;

    // Filter by category
    if (activeCategory !== 'all' && article.category !== activeCategory) {
      return false;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleUg = (article.title.ug || '').toLowerCase();
      const titleAr = (article.title.ar || '').toLowerCase();
      const titleEn = (article.title.en || '').toLowerCase();
      const summaryUg = (article.summary.ug || '').toLowerCase();
      const speed = (article.specs.speed || '').toLowerCase();
      const origin = (article.specs.origin || '').toLowerCase();
      const tags = article.tags.join(' ').toLowerCase();

      return (
        titleUg.includes(q) ||
        titleAr.includes(q) ||
        titleEn.includes(q) ||
        summaryUg.includes(q) ||
        speed.includes(q) ||
        origin.includes(q) ||
        tags.includes(q)
      );
    }

    return true;
  });

  const activeCategoryInfo = CATEGORIES.find(c => c.key === activeCategory);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Top Threat & Breaking Alert Ticker */}
      <AlertTicker />

      {/* Main Header with Integrated Category Navigation, Theme Switcher, Trilingual Dropdown, Admin Access */}
      <Header />

      {/* Content Area */}
      <main className="flex-1">
        {isAdminOpen ? (
          // Admin CMS Dashboard
          <AdminDashboard />
        ) : (
          // Public Military Intelligence Portal
          <>
            {/* Hero Showcase with Holographic Radar Gauge & Lead Story */}
            <HeroSection />

            {/* Articles Grid Container */}
            <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-2">
              
              {/* Section Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] font-['Orbitron',sans-serif]">
                    {activeCategory === 'all' 
                      ? t('allCategories') 
                      : (activeCategoryInfo?.name[language] || activeCategoryInfo?.name.ug)}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {activeCategory === 'all'
                      ? 'LIVE MULTI-DOMAIN DEFENSE FEED'
                      : (activeCategoryInfo?.description[language] || activeCategoryInfo?.description.ug)}
                  </p>
                </div>

                <div className="text-xs font-mono text-[var(--text-muted)]">
                  SHOWING {filteredArticles.length} OF {articles.filter(a => a.status === 'published').length}
                </div>
              </div>

              {/* Grid or Empty Results State */}
              {filteredArticles.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-[var(--bg-surface)] border border-dashed border-[var(--border-color)] my-8 space-y-3">
                  <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
                  <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    مۇناسىۋەتلىك ھەربىي ھۆججەت تېپىلمىدى
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    ئىزدەش شەرتىنى قايتا تەكشۈرۈڭ ياكى باشقا تاكتىكىلىق سەھىپىنى تاللاڭ.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="px-4 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-xs text-[var(--accent-primary)] font-bold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>بارلىق مەزمۇننى كۆرسىتىش</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}

            </section>
          </>
        )}

        {/* Full Dossier Reader Modal (renders anywhere when an article is selected/previewed) */}
        <ArticleModal />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export function App() {
  return (
    <MilitaryProvider>
      <MainLayout />
    </MilitaryProvider>
  );
}

export default App;
