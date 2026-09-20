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
  Layers
} from 'lucide-react';

type AdminTab = 'overview' | 'publish' | 'approvals' | 'articles' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    articles, 
    siteSettings, 
    setIsAdminOpen, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Top Banner with Return Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 mb-8 hud-panel">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] font-['Orbitron',sans-serif]">
                {t('adminTitle')}
              </h2>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-mono font-bold">
                ROOT ACCESS
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t('adminSubtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdminOpen(false)}
          className="px-5 py-2.5 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-highlight)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 transition-all self-start sm:self-center"
        >
          {language === 'en' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          <span>{t('exitAdmin')}</span>
        </button>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Stat 1: Total Dossiers */}
        <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs mb-2">
            <span className="font-bold">{t('totalArticles')}</span>
            <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--text-primary)]">
            {articles.length}
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
            8 تاكتىكىلىق سەھىپە بويىچە
          </span>
        </div>

        {/* Stat 2: Pending Approvals */}
        <div 
          onClick={() => setCurrentTab('approvals')}
          className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-amber-400 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs mb-2">
            <span className="font-bold">{t('pendingApproval')}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
            {pendingCount}
          </div>
          <span className="text-[10px] text-amber-300/80 mt-1 block">
            تەستىق كۈتۈۋاتقان مەزمۇنلار
          </span>
        </div>

        {/* Stat 3: Published Dossiers */}
        <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs mb-2">
            <span className="font-bold">{t('publishedArticles')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
            {publishedCount}
          </div>
          <span className="text-[10px] text-emerald-300/80 mt-1 block">
            تور يۈزىدە ئاكتىپ كۆرۈنۈۋاتىدۇ
          </span>
        </div>

        {/* Stat 4: System Views & Telemetry */}
        <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs mb-2">
            <span className="font-bold">{t('viewsCount')}</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400">
            {totalViews.toLocaleString()}
          </div>
          <span className="text-[10px] text-sky-300/80 mt-1 block">
            DEFCON دەرىجىسى: {siteSettings.activeDefcon} ئاكتىپ
          </span>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] mb-8 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
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
      <div>
        {currentTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ApprovalQueue />
              </div>
              <div>
                <SiteSettingsEditor />
              </div>
            </div>
            <div>
              <ArticleListManager />
            </div>
          </div>
        )}

        {currentTab === 'publish' && (
          <ArticleForm onSuccess={() => setCurrentTab('overview')} />
        )}

        {currentTab === 'approvals' && (
          <ApprovalQueue />
        )}

        {currentTab === 'articles' && (
          <ArticleListManager />
        )}

        {currentTab === 'settings' && (
          <SiteSettingsEditor />
        )}
      </div>

    </div>
  );
};
