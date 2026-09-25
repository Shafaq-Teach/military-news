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

async function run() {
  const filePath = './public/news.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Loaded ${data.length} articles from ${filePath}`);

  let changed = 0;

  for (let i = 0; i < data.length; i++) {
    const a = data[i];
    console.log(`[${i + 1}/${data.length}] Processing article: ${a.id}`);

    // Normalize title
    if (typeof a.title === 'string') {
      a.title = { ug: a.title, ar: '', en: '' };
    }
    a.title = a.title || {};
    
    // Check if title.en is actually Arabic
    if (a.title.en && !isLatin(a.title.en) && isAr(a.title.en) && !a.title.ar) {
      a.title.ar = a.title.en;
      a.title.en = '';
    }
    // Check if title.ar is actually Uyghur
    if (a.title.ar && isUg(a.title.ar) && !a.title.ug) {
      a.title.ug = a.title.ar;
      a.title.ar = '';
    } else if (a.title.ar && isUg(a.title.ar) && a.title.ug) {
      a.title.ar = ''; // force re-translation to proper Arabic
    }

    const baseTitle = a.title.ug || a.title.en || a.title.ar || '';
    const srcLangForTitle = a.title.ug ? 'ug' : a.title.en ? 'en' : 'ar';

    if (!a.title.ug && baseTitle) {
      a.title.ug = await translateText(baseTitle, 'ug', srcLangForTitle);
      await sleep(60);
    }
    if ((!a.title.ar || isUg(a.title.ar)) && baseTitle) {
      a.title.ar = await translateText(a.title.ug || baseTitle, 'ar', a.title.ug ? 'ug' : srcLangForTitle);
      await sleep(60);
    }
    if ((!a.title.en || !isLatin(a.title.en)) && baseTitle) {
      a.title.en = await translateText(a.title.ug || baseTitle, 'en', a.title.ug ? 'ug' : srcLangForTitle);
      await sleep(60);
    }

    // Normalize summary
    if (typeof a.summary === 'string') {
      a.summary = { ug: a.summary, ar: '', en: '' };
    }
    a.summary = a.summary || {};

    if (a.summary.en && !isLatin(a.summary.en) && isAr(a.summary.en) && !a.summary.ar) {
      a.summary.ar = a.summary.en;
      a.summary.en = '';
    }
    if (a.summary.ar && isUg(a.summary.ar) && !a.summary.ug) {
      a.summary.ug = a.summary.ar;
      a.summary.ar = '';
    } else if (a.summary.ar && isUg(a.summary.ar) && a.summary.ug) {
      a.summary.ar = '';
    }

    const baseSummary = a.summary.ug || a.summary.en || a.summary.ar || a.title.ug;
    const srcLangForSummary = a.summary.ug ? 'ug' : a.summary.en ? 'en' : 'ar';

    if (!a.summary.ug && baseSummary) {
      a.summary.ug = await translateText(baseSummary, 'ug', srcLangForSummary);
      await sleep(60);
    }
    if ((!a.summary.ar || isUg(a.summary.ar)) && baseSummary) {
      a.summary.ar = await translateText(a.summary.ug || baseSummary, 'ar', a.summary.ug ? 'ug' : srcLangForSummary);
      await sleep(60);
    }
    if ((!a.summary.en || !isLatin(a.summary.en)) && baseSummary) {
      a.summary.en = await translateText(a.summary.ug || baseSummary, 'en', a.summary.ug ? 'ug' : srcLangForSummary);
      await sleep(60);
    }

    // Normalize content
    if (typeof a.content === 'string') {
      a.content = { ug: a.content, ar: '', en: '' };
    }
    a.content = a.content || {};

    if (a.content.en && !isLatin(a.content.en) && isAr(a.content.en) && !a.content.ar) {
      a.content.ar = a.content.en;
      a.content.en = '';
    }
    if (a.content.ar && isUg(a.content.ar) && !a.content.ug) {
      a.content.ug = a.content.ar;
      a.content.ar = '';
    } else if (a.content.ar && isUg(a.content.ar) && a.content.ug) {
      a.content.ar = '';
    }

    const baseContent = a.content.ug || a.content.en || a.content.ar || a.summary.ug || a.title.ug;
    const srcLangForContent = a.content.ug ? 'ug' : a.content.en ? 'en' : 'ar';

    if (!a.content.ug && baseContent) {
      a.content.ug = await translateText(baseContent, 'ug', srcLangForContent);
      await sleep(80);
    }
    if ((!a.content.ar || isUg(a.content.ar)) && baseContent) {
      a.content.ar = await translateText(a.content.ug || baseContent, 'ar', a.content.ug ? 'ug' : srcLangForContent);
      await sleep(80);
    }
    if ((!a.content.en || !isLatin(a.content.en)) && baseContent) {
      a.content.en = await translateText(a.content.ug || baseContent, 'en', a.content.ug ? 'ug' : srcLangForContent);
      await sleep(80);
    }

    changed++;
    // Save checkpoint every 10 articles
    if (i % 10 === 0 || i === data.length - 1) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Saved checkpoint at article ${i + 1}`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Finished processing all ${data.length} articles!`);
}

run().catch(console.error);
