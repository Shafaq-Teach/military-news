import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { Save, RotateCcw, CheckCircle2, Sliders, ShieldAlert, Globe } from 'lucide-react';

export const SiteSettingsEditor: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetToDemo, language, t } = useMilitary();

  const [siteNameUg, setSiteNameUg] = useState(siteSettings.siteName.ug);
  const [siteNameAr, setSiteNameAr] = useState(siteSettings.siteName.ar);
  const [siteNameEn, setSiteNameEn] = useState(siteSettings.siteName.en);

  const [sloganUg, setSloganUg] = useState(siteSettings.siteSlogan.ug);
  const [tickerUg, setTickerUg] = useState(siteSettings.tickerText.ug);
  const [defcon, setDefcon] = useState(siteSettings.activeDefcon);
  const [autoApprove, setAutoApprove] = useState(siteSettings.autoApproveArticles);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      siteName: {
        ug: siteNameUg,
        ar: siteNameAr,
        en: siteNameEn
      },
      siteSlogan: {
        ...siteSettings.siteSlogan,
        ug: sloganUg
      },
      tickerText: {
        ...siteSettings.tickerText,
        ug: tickerUg
      },
      activeDefcon: Number(defcon),
      autoApproveArticles: autoApprove
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('ئەسلىدىكى 16 دانە Demo مەزمۇن ۋە بېكەت تەڭشەكلىرىگە ئەسلىگە كەلتۈرۈشنى جەزملەشتۈرەمسىز؟')) {
      resetToDemo();
      setSiteNameUg('ئەسكىرىي يېڭىلىقلار');
      setSiteNameAr('الأخبار العسكرية');
      setSiteNameEn('Military News');
      setDefcon(2);
      setAutoApprove(false);
      alert('بېكەت مۇۋەپپەقىيەتلىك ئەسلىگە كەلتۈرۈلدى!');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 sm:space-y-6 bg-[var(--bg-surface)] p-3.5 sm:p-8 rounded-2xl border border-[var(--border-color)]">
      
      {saved && (
        <div className="p-3 sm:p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          <span>تور بېكەت ئاساسىي تەڭشەكلىرى مۇۋەپپەقىيەتلىك يېڭىلاندى ۋە دەرھال ئەكس ئەتتى!</span>
        </div>
      )}

      <div className="border-b border-[var(--border-color)] pb-3">
        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[var(--accent-primary)]" />
          <span>{t('siteSettingsHeader')}</span>
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          بېكەت نامى، قارشى ئېلىش سۆزى، جىددىي ئۇچۇر لىنتىسى ۋە دۇنياۋى DEFCON دەرىجىسىنى بىۋاسىتە كونترول قىلىش
        </p>
      </div>

      {/* Site Name in 3 Languages */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[var(--accent-primary)] block">
          تور بېكەت نامى (3 تىلدا)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block mb-1">ئۇيغۇرچە</span>
            <input
              type="text"
              value={siteNameUg}
              onChange={(e) => setSiteNameUg(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block mb-1">العربية</span>
            <input
              type="text"
              value={siteNameAr}
              onChange={(e) => setSiteNameAr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block mb-1">English</span>
            <input
              type="text"
              value={siteNameEn}
              onChange={(e) => setSiteNameEn(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
            />
          </div>
        </div>
      </div>

      {/* Slogan */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--text-primary)] block">
          {t('settingSloganUg')}
        </label>
        <input
          type="text"
          value={sloganUg}
          onChange={(e) => setSloganUg(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
        />
      </div>

      {/* Breaking Alert Ticker */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-red-400 block flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>{t('settingTickerUg')}</span>
        </label>
        <textarea
          rows={2}
          value={tickerUg}
          onChange={(e) => setTickerUg(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-red-400"
        />
      </div>

      {/* DEFCON Level and Auto-approve */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
        <div>
          <label className="text-xs font-bold text-amber-400 block mb-2">
            {t('settingDefcon')}
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDefcon(lvl)}
                className={`flex-1 py-2 rounded-lg font-mono font-black text-xs transition-colors border ${
                  defcon === lvl
                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--border-highlight)]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[var(--text-muted)] mt-1.5 block">
            1 = ئەڭ جىددىي (يادرو كرىزىسى) / 5 = نورمال تىنچ ھالەت
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <label className="text-xs font-bold text-[var(--text-primary)] block mb-2">
            ماقالە يوللاش تەرتىپى
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoApprove}
              onChange={(e) => setAutoApprove(e.target.checked)}
              className="w-4 h-4 rounded text-[var(--accent-primary)] focus:ring-0 bg-[var(--bg-main)] border-[var(--border-color)]"
            />
            <span className="text-xs text-[var(--text-secondary)]">
              {t('autoApproveToggle')}
            </span>
          </label>
        </div>
      </div>

      {/* Save Actions & Reset */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[var(--border-color)]">
        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('resetToDemo')}</span>
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-[var(--bg-main)] text-xs font-black transition-all shadow-[0_0_15px_var(--accent-glow)] flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{t('btnSaveSettings')}</span>
        </button>
      </div>

    </form>
  );
};
