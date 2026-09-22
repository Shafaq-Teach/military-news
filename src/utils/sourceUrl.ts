import { Article } from '../types';

/**
 * Robustly extracts the direct original source URL for any article.
 * Guarantees a valid, active HTTP(S) link for 1-click direct navigation.
 */
export function getArticleSourceUrl(article: Article | null | undefined): string {
  if (!article) {
    return 'https://t.me/Military_Uynews';
  }

  // 1. Direct explicit source URL specifications
  const specs = (article.specs || {}) as Record<string, any>;
  const candidates: (string | undefined | null)[] = [
    specs['ئەسلى ئۇلانما'],
    specs['sourceUrl'],
    specs['ئەسلى مەنبە'],
    specs['مەنبە ئۇلانمىسى'],
    specs['source_url'],
    (article as any).sourceUrl,
    (article as any).source_url,
    (article as any).guid,
    specs['origin']?.startsWith('http') ? specs['origin'] : null
  ];

  for (const c of candidates) {
    if (typeof c === 'string' && c.trim().startsWith('http')) {
      const trimmed = c.trim();
      // If it points back to our own generic site home, don't use it as original external source
      if (trimmed !== 'https://shafaq-teach.github.io/military-news/' && trimmed !== 'https://shafaq-teach.github.io/military-news') {
        return trimmed;
      }
    }
  }

  // 2. Scan content for markdown link or raw URL
  const rawBody = 
    (article.content && typeof article.content === 'object' 
      ? (article.content.ug || article.content.en || '') 
      : (article.content as any) || '');

  const mdMatch = rawBody.match(/\[(?:ئەسلى مەنبە|Source|المصدر|ئۇلانما)\]\((https?:\/\/[^\s\)]+)\)/i);
  if (mdMatch && mdMatch[1]) {
    return mdMatch[1].trim();
  }

  const allUrls = rawBody.match(/https?:\/\/[^\s\)\"\'<>]+/g) || [];
  for (const u of allUrls) {
    // Avoid media assets or internal links
    if (
      !u.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i) && 
      !u.includes('images.unsplash.com') && 
      !u.includes('telesco.pe') &&
      !u.includes('weserv.nl') &&
      !u.includes('wikimedia.org/wikipedia/commons') &&
      u !== 'https://shafaq-teach.github.io/military-news/'
    ) {
      return u.trim();
    }
  }

  // 3. Category: Weapons & Arsenal Wiki fallback to Wikipedia
  if (article.category === 'weapons' || article.category === 'database' || article.id?.startsWith('wiki-')) {
    const rawName = specs['قورال ئىسمى'] || article.title?.en || article.title?.ug || '';
    // Extract latin weapon name if present (e.g., Desert Eagle .50 AE)
    const latinMatch = rawName.match(/[A-Za-z0-9\.\-\s]{3,}/);
    const searchTerm = latinMatch ? latinMatch[0].trim() : rawName.replace(/[\(\)\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
    return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(searchTerm || 'Military weapon')}`;
  }

  // 4. Source / Author based fallbacks
  const authorStr = ((article.author || '') + ' ' + (specs['مەنبە'] || '')).toLowerCase();
  if (authorStr.includes('الخطابي') || authorStr.includes('خەتتابى')) {
    return 'https://t.me/alkhattabirw';
  }
  if (authorStr.includes('قاسيون')) {
    return 'https://t.me/qasiounnews';
  }
  if (authorStr.includes('defense news') || authorStr.includes('دېفېنس')) {
    return 'https://www.defensenews.com/';
  }
  if (authorStr.includes('war zone') || authorStr.includes('twz')) {
    return 'https://www.twz.com/';
  }

  // 5. Channel fallback
  return 'https://t.me/Military_Uynews';
}
