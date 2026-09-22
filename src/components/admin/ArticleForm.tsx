import React, { useState, useRef, useEffect } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { CATEGORIES } from '../../data/categories';
import { Article, CategoryKey } from '../../types/military';
import { autoTranslateContent } from '../../utils/translator';
import { 
  Send, 
  CheckCircle2, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  Trash2,
  FilePlus2,
  Loader2,
  Pencil,
  Save,
  X
} from 'lucide-react';

const PRESET_MILITARY_IMAGES = [
  {
    name: 'ھاۋا ئارمىيە / ئايروپىلان',
    url: 'https://images.unsplash.com/photo-1517976487502-53b6f041d8e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'دىرون / ستېلس سىستېمىسى',
    url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'كىبېر مۇداپىئە / رادار',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'دېڭىز ئارمىيە / ھەربىي پاراخوت',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'لازېر ۋە راكېتا قوراللىرى',
    url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'سۈنئىي ھەمراھ / ئىستىخبارات',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
  }
];

interface ArticleFormProps {
  editingArticle?: Article | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({ 
  editingArticle, 
  onCancel, 
  onSuccess 
}) => {
  const { addArticle, updateArticle, language, t } = useMilitary();

  const isEditMode = Boolean(editingArticle);

  const [category, setCategory] = useState<CategoryKey>(editingArticle?.category || 'news');
  const [title, setTitle] = useState(
    editingArticle ? (editingArticle.title[language] || editingArticle.title.ug || editingArticle.title.en || '') : ''
  );
  const [summary, setSummary] = useState(
    editingArticle ? (editingArticle.summary[language] || editingArticle.summary.ug || editingArticle.summary.en || '') : ''
  );
  const [content, setContent] = useState(
    editingArticle ? (editingArticle.content[language] || editingArticle.content.ug || editingArticle.content.en || '') : ''
  );
  const [sourceUrl, setSourceUrl] = useState(
    editingArticle ? (editingArticle.sourceUrl || (editingArticle.specs && (editingArticle.specs.sourceUrl || editingArticle.specs['ئەسلى ئۇلانما'])) || '') : ''
  );
  
  // Image handling
  const [imageUrl, setImageUrl] = useState(
    editingArticle?.imageUrl || PRESET_MILITARY_IMAGES[0].url
  );
  const [imageTab, setImageTab] = useState<'upload' | 'gallery' | 'url'>(
    editingArticle?.imageUrl ? 'url' : 'upload'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isTranslating, setIsTranslating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editingArticle) {
      setCategory(editingArticle.category);
      setTitle(editingArticle.title[language] || editingArticle.title.ug || editingArticle.title.en || '');
      setSummary(editingArticle.summary[language] || editingArticle.summary.ug || editingArticle.summary.en || '');
      setContent(editingArticle.content[language] || editingArticle.content.ug || editingArticle.content.en || '');
      setImageUrl(editingArticle.imageUrl || PRESET_MILITARY_IMAGES[0].url);
      setSourceUrl(editingArticle.sourceUrl || (editingArticle.specs && (editingArticle.specs.sourceUrl || editingArticle.specs['ئەسلى ئۇلانما'])) || '');
    } else {
      setCategory('news');
      setTitle('');
      setSummary('');
      setContent('');
      setImageUrl(PRESET_MILITARY_IMAGES[0].url);
      setSourceUrl('');
    }
  }, [editingArticle, language]);

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('رەسىم چوڭلۇقى 5MB دىن ئېشىپ كەتمەسلىكى كېرەك.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent, directPublish: boolean = false) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('ماۋزۇنى كىرگۈزۈڭ!');
      return;
    }

    setIsTranslating(true);

    try {
      if (isEditMode && editingArticle) {
        // Edit Mode: check if fields changed and translate if updated
        const isTitleChanged = title.trim() !== (editingArticle.title[language] || editingArticle.title.ug || '');
        const isSummaryChanged = summary.trim() !== (editingArticle.summary[language] || editingArticle.summary.ug || '');
        const isContentChanged = content.trim() !== (editingArticle.content[language] || editingArticle.content.ug || '');

        const [multilingualTitle, multilingualSummary, multilingualContent] = await Promise.all([
          isTitleChanged ? autoTranslateContent(title.trim(), language) : Promise.resolve(editingArticle.title),
          isSummaryChanged ? autoTranslateContent(summary.trim() || title.trim(), language) : Promise.resolve(editingArticle.summary),
          isContentChanged ? autoTranslateContent(content.trim() || summary.trim() || title.trim(), language) : Promise.resolve(editingArticle.content)
        ]);

        await updateArticle(editingArticle.id, {
          category,
          title: multilingualTitle,
          summary: multilingualSummary,
          content: multilingualContent,
          imageUrl: imageUrl || editingArticle.imageUrl || PRESET_MILITARY_IMAGES[0].url,
          sourceUrl: sourceUrl.trim(),
          specs: {
            ...(editingArticle.specs || {}),
            sourceUrl: sourceUrl.trim(),
            'ئەسلى ئۇلانما': sourceUrl.trim()
          }
        });

        setIsTranslating(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          if (onSuccess) onSuccess();
        }, 1200);
        return;
      }

      // Create Mode:
      const [multilingualTitle, multilingualSummary, multilingualContent] = await Promise.all([
        autoTranslateContent(title.trim(), language),
        autoTranslateContent(summary.trim() || title.trim(), language),
        autoTranslateContent(content.trim() || summary.trim() || title.trim(), language)
      ]);

      addArticle({
        category,
        title: multilingualTitle,
        summary: multilingualSummary,
        content: multilingualContent,
        imageUrl: imageUrl || PRESET_MILITARY_IMAGES[0].url,
        sourceUrl: sourceUrl.trim(),
        author: 'تەھرىرات',
        status: directPublish ? 'published' : 'pending',
        featured: false,
        tags: [category, 'Military Intelligence'],
        specs: {
          speed: 'N/A',
          range: 'N/A',
          payload: 'N/A',
          origin: 'خەلقئارا',
          status: 'ئاكتىپ خىزمەتتە',
          clearance: 'ئاشكارا كەسپىي (PUBLIC-OSINT)',
          sourceUrl: sourceUrl.trim(),
          'ئەسلى ئۇلانما': sourceUrl.trim()
        }
      });

      setIsTranslating(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        // Reset inputs
        setTitle('');
        setSummary('');
        setContent('');
        setSourceUrl('');
        if (onSuccess) onSuccess();
      }, 1500);

    } catch (err) {
      console.error('Submission error:', err);
      setIsTranslating(false);
      
      if (isEditMode && editingArticle) {
        await updateArticle(editingArticle.id, {
          category,
          title: { ...editingArticle.title, [language]: title.trim() },
          summary: { ...editingArticle.summary, [language]: summary.trim() },
          content: { ...editingArticle.content, [language]: content.trim() },
          imageUrl: imageUrl || editingArticle.imageUrl,
          sourceUrl: sourceUrl.trim(),
          specs: {
            ...(editingArticle.specs || {}),
            sourceUrl: sourceUrl.trim(),
            'ئەسلى ئۇلانما': sourceUrl.trim()
          }
        });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          if (onSuccess) onSuccess();
        }, 1200);
        return;
      }

      // Fallback create:
      addArticle({
        category,
        title: { ug: title, ar: title, en: title },
        summary: { ug: summary || title, ar: summary || title, en: summary || title },
        content: { ug: content || title, ar: content || title, en: content || title },
        imageUrl: imageUrl || PRESET_MILITARY_IMAGES[0].url,
        sourceUrl: sourceUrl.trim(),
        author: 'تەھرىرات',
        status: directPublish ? 'published' : 'pending',
        featured: false,
        tags: [category],
        specs: {
          speed: 'N/A',
          range: 'N/A',
          payload: 'N/A',
          origin: 'خەلقئارا',
          status: 'ئاكتىپ خىزمەتتە',
          clearance: 'ئاشكارا كەسپىي (PUBLIC-OSINT)',
          sourceUrl: sourceUrl.trim(),
          'ئەسلى ئۇلانما': sourceUrl.trim()
        }
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setTitle('');
        setSummary('');
        setContent('');
        setSourceUrl('');
        if (onSuccess) onSuccess();
      }, 1500);
    }
  };

  return (
    <form className="space-y-6 bg-[var(--bg-surface)] p-5 sm:p-8 rounded-2xl border border-[var(--border-color)]">
      
      {/* Success Notification */}
      {submitted && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>مەزمۇن مۇۋەپپەقىيەتلىك ساقلاندى ھەمدە 3 خىل تىلغا (ئۇيغۇرچە، ئەرەبچە، ئىنگلىزچە) ئاپتوماتىك تەرجىمە قىلىندى!</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            {isEditMode ? (
              <>
                <Pencil className="w-5 h-5 text-amber-400" />
                <span>ماقالىنى تەھرىرلەش</span>
              </>
            ) : (
              <>
                <FilePlus2 className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>{t('publishNewTitle')}</span>
              </>
            )}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isEditMode 
              ? 'مەزمۇنلارنى تەھرىرلەپ ساقلىسىڭىز، ئاپتوماتىك بۇلۇتقا ماسقەدەملىنىدۇ ۋە بارلىق ئۈسكۈنىلەردە كۈچكە ئىگە بولىدۇ.'
              : 'مەزمۇننى بىر تىلدا يازسىڭىزلا كۇپايە، سىستېما قالغان تىللارغا ئاپتوماتىك تەرجىمە قىلىپ بېرىدۇ.'}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-xs font-bold">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>3 تىللىق ئەقلىي تەرجىمە قوزغىتىلغان</span>
        </div>
      </div>

      {/* 1. Category Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[var(--text-primary)] block">
          {t('fieldCategory')} *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryKey)}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)] cursor-pointer"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.key} value={cat.key}>
              [{cat.code}] {cat.name[language] || cat.name.ug}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Single Title Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[var(--accent-primary)] block">
            سەرلەۋھە (ماۋزۇ) *
          </label>
          <span className="text-[10px] text-[var(--text-muted)]">
            بىر تىلدا يېزىلسا، ئەرەبچە ۋە ئىنگلىزچىغا ئاپتوماتىك ئايلىنىدۇ
          </span>
        </div>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مەسىلەن: ئەڭ يېڭى ھەربىي تەھلىل ياكى ئاخبارات ماۋزۇسىنى كىرگۈزۈڭ..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
        />
      </div>

      {/* 3. Single Summary Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--text-primary)] block">
          قىسقىچە چۈشەندۈرۈش
        </label>
        <textarea
          rows={2}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="خەۋەرنىڭ قىسقىچە ئاساسىي مەزمۇنى..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
        />
      </div>

      {/* 4. Single Full Content Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--text-primary)] block">
          تەپسىلىي مەزمۇن
        </label>
        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="تولۇق ئەسكىرىي خەۋەر، مەزمۇن ياكى تاكتىكىلىق بايان..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
        />
      </div>

      {/* 4.1 Source URL Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span>ئەسلى مەنبە ئۇلانمىسى (ئىختىيارىي)</span>
        </label>
        <input
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="مەسىلەن: https://t.me/... ياكى https://..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
        />
      </div>

      {/* 5. Rich Image Insertion Window (Upload / Gallery / URL) */}
      <div className="space-y-3 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
          <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>رەسىم قىستۇرۇش كۆزنىكى</span>
          </label>

          {/* Navigation Tabs for Image Source */}
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setImageTab('upload')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                imageTab === 'upload' 
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>كومپيۇتېردىن يۈكلەش</span>
            </button>

            <button
              type="button"
              onClick={() => setImageTab('gallery')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                imageTab === 'gallery' 
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>ئۈلگە رەسىملەر</span>
            </button>

            <button
              type="button"
              onClick={() => setImageTab('url')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                imageTab === 'url' 
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-main)] font-bold' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <LinkIcon className="w-3 h-3" />
              <span>ئۇلىنىش كىرگۈزۈش</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Local File Upload */}
        {imageTab === 'upload' && (
          <div className="space-y-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="p-6 border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent-primary)] rounded-xl text-center cursor-pointer transition-colors bg-[var(--bg-surface)]/50 group"
            >
              <Upload className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-[var(--text-primary)]">
                كومپيۇتېردىن رەسىم تاللاش ئۈچۈن بۇ يەرنى بېسىڭ
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1">
                PNG، JPG، WEBP فورماتىنى قوللايدۇ (ئەڭ چوڭ بولغاندا 5MB)
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Preset Military Gallery */}
        {imageTab === 'gallery' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {PRESET_MILITARY_IMAGES.map((preset, idx) => (
              <div
                key={idx}
                onClick={() => setImageUrl(preset.url)}
                className={`group relative rounded-lg overflow-hidden border cursor-pointer h-20 transition-all ${
                  imageUrl === preset.url
                    ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                    : 'border-[var(--border-color)] hover:border-[var(--border-highlight)] opacity-75 hover:opacity-100'
                }`}
              >
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-1 text-center">
                  <span className="text-[10px] text-white font-bold">{preset.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Direct URL */}
        {imageTab === 'url' && (
          <div className="space-y-1.5">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)]"
            />
          </div>
        )}

        {/* Current Image Preview */}
        {imageUrl && (
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-color)]">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-16 h-16 rounded-lg object-cover border border-[var(--border-color)] shrink-0 bg-black/30"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }} 
            />
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold text-emerald-400 block">
                ✓ قىستۇرۇلغان رەسىم كۈچكە ئىگە
              </span>
              <span className="text-[10px] text-[var(--text-muted)] truncate block mt-0.5 max-w-sm">
                {imageUrl.startsWith('data:') ? 'يەرلىك ھۆججەت (Base64)' : imageUrl}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
              title="رەسىمنى چىقىرىۋېتىش"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Submit Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
        {isEditMode ? (
          <>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>بىكار قىلىش</span>
              </button>
            )}

            <button
              type="button"
              disabled={isTranslating}
              onClick={(e) => handleSubmit(e, true)}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2 disabled:opacity-50"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>ساقلىنىۋاتىدۇ ۋە ماسقەدەملىنىۋاتىدۇ...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>ئۆزگەرتىشنى ساقلاش (Save)</span>
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={isTranslating}
              onClick={(e) => handleSubmit(e, false)}
              className="px-5 py-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] text-xs font-bold text-[var(--text-primary)] transition-all disabled:opacity-50"
            >
              {isTranslating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-primary)]" />
                  <span>تەرجىمە قىلىنىۋاتىدۇ...</span>
                </span>
              ) : (
                t('btnSubmitForApproval')
              )}
            </button>

            <button
              type="button"
              disabled={isTranslating}
              onClick={(e) => handleSubmit(e, true)}
              className="px-6 py-2.5 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-[var(--bg-main)] text-xs font-black transition-all shadow-[0_0_15px_var(--accent-glow)] flex items-center gap-2 disabled:opacity-50"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--bg-main)]" />
                  <span>3 تىلغا ئايلاندۇرۇلۇۋاتىدۇ...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t('btnPublishDirect')}</span>
                </>
              )}
            </button>
          </>
        )}
      </div>

    </form>
  );
};
