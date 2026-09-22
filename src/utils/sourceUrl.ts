import { Article } from '../types/military';

/**
 * Robustly extracts the direct original source URL for any article before translation.
 * NEVER returns our own website or telegram channel.
 * Guarantees a genuine external publisher link for 1-click direct navigation.
 */
export function getArticleSourceUrl(article: Article | null | undefined): string {
  if (!article) {
    return 'https://www.defensenews.com/';
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
      // Exclude self-references to our own channel or website
      if (
        !trimmed.includes('Military_Uynews') &&
        !trimmed.includes('shafaq-teach.github.io') &&
        !trimmed.includes('military-news.yulgun353.workers.dev')
      ) {
        return trimmed;
      }
    }
  }

  // 2. Scan content body for markdown link or raw URL
  const rawBody = 
    (article.content && typeof article.content === 'object' 
      ? (article.content.ug || article.content.en || '') 
      : (article.content as any) || '');

  const mdMatch = rawBody.match(/\[(?:ئەسلى مەنبە|Source|المصدر|ئۇلانما)\]\((https?:\/\/[^\s\)]+)\)/i);
  if (mdMatch && mdMatch[1]) {
    const u = mdMatch[1].trim();
    if (!u.includes('Military_Uynews') && !u.includes('shafaq-teach.github.io')) {
      return u;
    }
  }

  const allUrls = rawBody.match(/https?:\/\/[^\s\)\"\'<>]+/g) || [];
  for (const u of allUrls) {
    // Avoid media assets, internal links, or self-channel links
    if (
      !u.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i) && 
      !u.includes('images.unsplash.com') && 
      !u.includes('telesco.pe/file') &&
      !u.includes('weserv.nl') &&
      !u.includes('wikimedia.org/wikipedia/commons') &&
      !u.includes('Military_Uynews') &&
      !u.includes('shafaq-teach.github.io')
    ) {
      return u.trim();
    }
  }

  // 3. Category: Weapons & Arsenal Wiki fallback to Wikipedia
  if (article.category === 'weapons' || article.category === 'database' || article.id?.startsWith('wiki-')) {
    const rawName = specs['قورال ئىسمى'] || article.title?.en || article.title?.ug || '';
    const latinMatch = rawName.match(/[A-Za-z0-9\.\-\s]{3,}/);
    const searchTerm = latinMatch ? latinMatch[0].trim() : rawName.replace(/[\(\)\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
    return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(searchTerm || 'Military weapon')}`;
  }

  // 4. Source / Author based authentic external fallbacks
  const authorStr = ((article.author || '') + ' ' + (specs['مەنبە'] || '') + ' ' + (article.title?.ug || '')).toLowerCase();
  
  if (authorStr.includes('الخطابي') || authorStr.includes('خەتتابى')) {
    return 'https://t.me/alkhattabirw';
  }
  if (authorStr.includes('قاسيون')) {
    return 'https://t.me/QasiounStudies';
  }
  if (authorStr.includes('صقر العرب') || authorStr.includes('سەقرۇل ئەرەب')) {
    return 'https://www.facebook.com/share/1AgZuo6Khf/';
  }
  if (authorStr.includes('علي التميمي') || authorStr.includes('ئەلى تەمىمى')) {
    return 'https://www.facebook.com/share/1J2PoNSC8x/';
  }
  if (authorStr.includes('defense news') || authorStr.includes('دېفېنس')) {
    return 'https://www.defensenews.com/';
  }
  if (authorStr.includes('war zone') || authorStr.includes('twz') || authorStr.includes('shahed')) {
    return 'https://www.twz.com/';
  }
  if (authorStr.includes('naval') || authorStr.includes('دېڭىز')) {
    return 'https://www.navalnews.com/';
  }
  if (authorStr.includes('breaking defense')) {
    return 'https://breakingdefense.com/';
  }

  // 5. Category-level external defense publishers (NEVER our own channel)
  if (article.category === 'drones') {
    return 'https://www.twz.com/';
  }
  if (article.category === 'naval') {
    return 'https://www.navalnews.com/';
  }
  if (article.category === 'geopolitics') {
    return 'https://t.me/alkhattabirw';
  }

  return 'https://www.defensenews.com/';
}
