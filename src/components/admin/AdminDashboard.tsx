import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { ArticleForm } from './ArticleForm';
import { ApprovalQueue } from './ApprovalQueue';
import { ArticleListManager } from './ArticleListManager';
import { SiteSettingsEditor } from './SiteSettingsEditor';
import { 
  Sliders, 
  FilePlus2, 
  Clock, 
  FolderKanban, 
  Settings, 
  ArrowLeft, 
  ArrowRight,
  Shield, 
  CheckCircle2, 
  AlertOctagon, 
  Eye, 
  Activity,
  Layers,
  KeyRound,
  LogOut
} from 'lucide-react';

type AdminTab = 'overview' | 'publish' | 'approvals' | 'articles' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    articles, 
    siteSettings, 
    setIsAdminOpen, 
    adminLogout,
    setIsLoginModalOpen,
    language, 
    t 
  } = useMilitary();

  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  const pendingCount = articles.filter(a => a.status === 'pending').length;
  const publishedCount = articles.filter(a => a.status === 'published').length;
  const totalViews = articles.reduce((acc, curr) => acc + curr.views, 0);

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: t('tabOverview'), icon: <Activity className="w-4 h-4" /> },
    { id: 'publish', label: t('tabPublish'), icon: <FilePlus2 className="w-4 h-4" /> },
    { 
      id: 'approvals', 
      label: t('tabApprovals'), 
      icon: <Clock className="w-4 h-4" />, 
      badge: pendingCount 
    },
    { id: 'articles', label: t('tabManageArticles'), icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'settings', label: t('tabSiteSettings'), icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3.5 sm:py-8 animate-in fade-in duration-300 min-w-0 overflow-x-hidden">
      
      {/* Top Banner with Return Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3 sm:p-6 mb-4 sm:mb-8 hud-panel w-full max-w-full min-w-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 w-full sm:w-auto">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] shrink-0">
            <Shield className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
              <h2 className="text-sm sm:text-2xl font-black text-[var(--text-primary)] font-['Orbitron',sans-serif] truncate">
                {t('adminTitle')}
              </h2>
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[9px] sm:text-[10px] font-mono font-bold shrink-0">
                ROOT ACCESS
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1 sm:line-clamp-none">
              {t('adminSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0">
          {/* Change Password Button */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[11px] sm:text-xs font-bold text-[var(--accent-primary)] flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-sm min-w-0"
            title={language === 'en' ? 'Change Password' : language === 'ar' ? 'تغيير كلمة المرور' : 'مەخپىي نومۇرنى ئۆزگەرتىش'}
          >
            <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">{language === 'en' ? 'Password' : language === 'ar' ? 'كلمة المرور' : 'مەخپىي نومۇر'}</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={adminLogout}
            className="px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[11px] sm:text-xs font-bold text-rose-400 flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-sm min-w-0"
            title={language === 'en' ? 'Logout' : language === 'ar' ? 'تسجيل الخروج' : 'چىقىپ كېتىش'}
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{language === 'en' ? 'Logout' : language === 'ar' ? 'خروج' : 'چىقىش'}</span>
          </button>

          {/* Return to Portal Button */}
          <button
            onClick={() => setIsAdminOpen(false)}
            className="col-span-2 sm:col-span-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-highlight)] text-[11px] sm:text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-1.5 sm:gap-2 transition-all min-w-0"
          >
            {language === 'en' ? <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
            <span className="truncate">{t('exitAdmin')}</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-8 w-full max-w-full">
        
        {/* Stat 1: Total Dossiers */}
        <div className="p-2.5 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] sm:text-xs mb-1 sm:mb-2">
            <span className="font-bold truncate">{t('totalArticles')}</span>
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-primary)] shrink-0" />
          </div>
          <div className="text-lg sm:text-3xl font-black font-mono text-[var(--text-primary)] truncate">
            {articles.length}
          </div>
          <span className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] mt-0.5 sm:mt-1 block truncate">
            8 تاكتىكىلىق سەھىپە
          </span>
        </div>

        {/* Stat 2: Pending Approvals */}
        <div 
          onClick={() => setCurrentTab('approvals')}
          className="p-2.5 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-amber-400 cursor-pointer transition-colors min-w-0 overflow-hidden"
        >
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] sm:text-xs mb-1 sm:mb-2">
            <span className="font-bold truncate">{t('pendingApproval')}</span>
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
          </div>
          <div className="text-lg sm:text-3xl font-black font-mono text-amber-400 truncate">
            {pendingCount}
          </div>
          <span className="text-[9px] sm:text-[10px] text-amber-300/80 mt-0.5 sm:mt-1 block truncate">
            تەستىق كۈتۈۋاتقان
          </span>
        </div>

        {/* Stat 3: Published Dossiers */}
        <div className="p-2.5 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] sm:text-xs mb-1 sm:mb-2">
            <span className="font-bold truncate">{t('publishedArticles')}</span>
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-lg sm:text-3xl font-black font-mono text-emerald-400 truncate">
            {publishedCount}
          </div>
          <span className="text-[9px] sm:text-[10px] text-emerald-300/80 mt-0.5 sm:mt-1 block truncate">
            ئاكتىپ كۆرۈنۈۋاتىدۇ
          </span>
        </div>

        {/* Stat 4: System Views & Telemetry */}
        <div className="p-2.5 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] min-w-0 overflow-hidden">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] sm:text-xs mb-1 sm:mb-2">
            <span className="font-bold truncate">{t('viewsCount')}</span>
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
          </div>
          <div className="text-lg sm:text-3xl font-black font-mono text-sky-400 truncate">
            {totalViews.toLocaleString()}
          </div>
          <span className="text-[9px] sm:text-[10px] text-sky-300/80 mt-0.5 sm:mt-1 block truncate">
            DEFCON: {siteSettings.activeDefcon}
          </span>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-[var(--border-color)] mb-5 sm:mb-8 overflow-x-auto pb-2 scrollbar-none w-full max-w-full min-w-0 touch-pan-x">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] border-[var(--border-highlight)] shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--border-highlight)]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white font-mono text-[10px]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="w-full max-w-full min-w-0">
        {currentTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-full min-w-0">
              <div className="lg:col-span-2 w-full max-w-full min-w-0">
                <ApprovalQueue />
              </div>
              <div className="w-full max-w-full min-w-0">
                <SiteSettingsEditor />
              </div>
            </div>
            <div className="w-full max-w-full min-w-0">
              <ArticleListManager />
            </div>
          </div>
        )}

        {currentTab === 'publish' && (
          <div className="w-full max-w-full min-w-0">
            <ArticleForm onSuccess={() => setCurrentTab('overview')} />
          </div>
        )}

        {currentTab === 'approvals' && (
          <div className="w-full max-w-full min-w-0">
            <ApprovalQueue />
          </div>
        )}

        {currentTab === 'articles' && (
          <div className="w-full max-w-full min-w-0">
            <ArticleListManager />
          </div>
        )}

        {currentTab === 'settings' && (
          <div className="w-full max-w-full min-w-0">
            <SiteSettingsEditor />
          </div>
        )}
      </div>

    </div>
  );
};
