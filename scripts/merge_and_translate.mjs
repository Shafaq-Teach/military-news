import { execSync } from 'child_process';
import fs from 'fs';

const isUg = (s) => /[\u067E\u0686\u0698\u06AD\u06AF\u06CB\u06C7\u06C8\u06D0\u06D5\u0649]/.test(s || '');
const isAr = (s) => /[\u0621-\u063A\u0641-\u064A]/.test(s || '') && !isUg(s);
const isLatin = (s) => /[a-zA-Z]/.test(s || '');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateChunk(text, targetLang, sourceLang = 'auto') {
  if (!text || !text.trim()) return '';
  const clean = text.trim();
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(clean)}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        return data[0].map(x => x[0]).join('');
      }
    } catch (e) {
      await sleep(300 * (attempt + 1));
    }
  }
  return text;
}

async function translateText(text, targetLang, sourceLang = 'auto') {
  if (!text || !text.trim()) return '';
  if (text.length <= 1500) {
    return translateChunk(text, targetLang, sourceLang);
  }
  const chunks = [];
  let remaining = text;
  while (remaining.length > 1500) {
    let splitIdx = remaining.lastIndexOf('\n', 1500);
    if (splitIdx < 500) splitIdx = remaining.lastIndexOf('. ', 1500);
    if (splitIdx < 500) splitIdx = 1500;
    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx);
  }
  if (remaining.length > 0) chunks.push(remaining);

  const results = [];
  for (const chunk of chunks) {
    results.push(await translateChunk(chunk, targetLang, sourceLang));
    await sleep(60);
  }
  return results.join('');
}

async function main() {
  const remoteRaw = execSync('git show FETCH_HEAD:public/news.json', { maxBuffer: 50*1024*1024, encoding: 'utf8' });
  const remoteArticles = JSON.parse(remoteRaw);
  const localArticles = JSON.parse(fs.readFileSync('./public/news.json', 'utf8'));

  const localMap = new Map(localArticles.map(a => [a.id, a]));

  const merged = remoteArticles.map(rem => {
    const loc = localMap.get(rem.id);
    if (loc && loc.title && isAr(loc.title.ar) && isLatin(loc.title.en)) {
      return loc;
    }
    return rem;
  });

  console.log(`Merged ${merged.length} articles. Now translating any remaining missing items...`);

  for (let i = 0; i < merged.length; i++) {
    const a = merged[i];

    if (typeof a.title === 'string') a.title = { ug: a.title, ar: '', en: '' };
    if (typeof a.summary === 'string') a.summary = { ug: a.summary, ar: '', en: '' };
    if (typeof a.content === 'string') a.content = { ug: a.content, ar: '', en: '' };

    const ugTitle = a.title.ug || '';
    let arTitle = a.title.ar || '';
    let enTitle = a.title.en || '';

    // Fix ar title
    if (!arTitle || !isAr(arTitle) || isUg(arTitle)) {
      if (isAr(enTitle)) {
        arTitle = enTitle;
        enTitle = '';
      } else {
        arTitle = await translateText(ugTitle, 'ar', 'ug');
        await sleep(50);
      }
      a.title.ar = arTitle;
    }

    // Fix en title
    if (!enTitle || !isLatin(enTitle)) {
      enTitle = await translateText(arTitle || ugTitle, 'en', isAr(arTitle) ? 'ar' : 'ug');
      await sleep(50);
      a.title.en = enTitle;
    }

    // Fix summary
    const ugSum = a.summary.ug || '';
    if (!a.summary.ar || isUg(a.summary.ar)) {
      a.summary.ar = await translateText(ugSum, 'ar', 'ug');
      await sleep(50);
    }
    if (!a.summary.en || !isLatin(a.summary.en)) {
      a.summary.en = await translateText(a.summary.ar || ugSum, 'en', isAr(a.summary.ar) ? 'ar' : 'ug');
      await sleep(50);
    }

    // Fix content
    if (a.content && typeof a.content === 'object') {
      const ugContent = a.content.ug || '';
      if (!a.content.ar || isUg(a.content.ar)) {
        console.log(`Translating content.ar for ${a.id}`);
        a.content.ar = await translateText(ugContent, 'ar', 'ug');
        await sleep(60);
      }
      if (!a.content.en || !isLatin(a.content.en)) {
        console.log(`Translating content.en for ${a.id}`);
        a.content.en = await translateText(a.content.ar || ugContent, 'en', isAr(a.content.ar) ? 'ar' : 'ug');
        await sleep(60);
      }
    }
  }

  fs.writeFileSync('./public/news.json', JSON.stringify(merged, null, 2), 'utf8');
  console.log(`Successfully updated public/news.json with ${merged.length} fully translated articles.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
