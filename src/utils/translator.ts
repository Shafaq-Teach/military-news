import { Language, MultilingualText } from '../types/military';

export const isUg = (s?: string): boolean => /[\u067E\u0686\u0698\u06AD\u06AF\u06CB\u06C7\u06C8\u06D0\u06D5\u0649]/.test(s || '');
export const isAr = (s?: string): boolean => /[\u0621-\u063A\u0641-\u064A]/.test(s || '') && !isUg(s);
export const isLatin = (s?: string): boolean => /[a-zA-Z]/.test(s || '');

const translationCache: Record<string, string> = {};

/**
 * Free online translation using Google GTX public endpoint (CORS enabled) with safe chunking for long content.
 */
export async function translateText(
  text: string,
  targetLang: Language,
  sourceLang: string = 'auto'
): Promise<string> {
  if (!text || !text.trim()) return '';

  const clean = text.trim();
  const cacheKey = `${sourceLang}_${targetLang}_${clean}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  // If text is short (<= 1200 chars), single call
  if (clean.length <= 1200) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(clean)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Translation HTTP error: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((item: [string]) => item[0]).join('');
        if (translated) {
          translationCache[cacheKey] = translated;
          return translated;
        }
      }
    } catch (err) {
      console.warn('Auto translation fallback:', err);
    }
    return clean;
  }

  // For longer content, chunk safely by paragraphs / sentences
  const chunks: string[] = [];
  let remaining = clean;
  while (remaining.length > 1200) {
    let splitIdx = remaining.lastIndexOf('\n', 1200);
    if (splitIdx < 400) splitIdx = remaining.lastIndexOf('. ', 1200);
    if (splitIdx < 400) splitIdx = 1200;
    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx);
  }
  if (remaining.length > 0) chunks.push(remaining);

  try {
    const translatedChunks: string[] = [];
    for (const chunk of chunks) {
      const res = await translateText(chunk, targetLang, sourceLang);
      translatedChunks.push(res);
    }
    const full = translatedChunks.join('');
    translationCache[cacheKey] = full;
    return full;
  } catch {
    return clean;
  }
}

/**
 * Automatically translates single content to all 3 languages (Uyghur, Arabic, English).
 * Automatically detects whether input is Uyghur, Arabic, or English regardless of UI state.
 */
export async function autoTranslateContent(
  text: string,
  hintLang: Language = 'ug'
): Promise<MultilingualText> {
  if (!text || !text.trim()) {
    return { ug: '', ar: '', en: '' };
  }

  const clean = text.trim();

  // Detect true source language from characters
  let actualSource: Language = hintLang;
  if (isUg(clean)) {
    actualSource = 'ug';
  } else if (isAr(clean)) {
    actualSource = 'ar';
  } else if (isLatin(clean)) {
    actualSource = 'en';
  }

  const result: MultilingualText = {
    ug: clean,
    ar: clean,
    en: clean
  };

  result[actualSource] = clean;

  const targets: Language[] = (['ug', 'ar', 'en'] as Language[]).filter(
    l => l !== actualSource
  );

  await Promise.all(
    targets.map(async (target) => {
      try {
        const translated = await translateText(clean, target, actualSource);
        if (translated) {
          result[target] = translated;
        }
      } catch {
        // keep fallback
      }
    })
  );

  return result;
}

/**
 * Comprehensive dictionary of military metadata terms (all 16 demo articles and common terms)
 */
const METADATA_DICTIONARY: Record<string, Record<Language, string>> = {
  // Origins & Labs
  'شىمالىي ئاتلانتىك ئىتتىپاقى': {
    ug: 'شىمالىي ئاتلانتىك ئىتتىپاقى',
    en: 'NATO Alliance',
    ar: 'حلف الناتو'
  },
  'خەلقئارا مۇداپىئە تەتقىقاتى': {
    ug: 'خەلقئارا مۇداپىئە تەتقىقاتى',
    en: 'International Defense R&D',
    ar: 'أبحاث الدفاع الدولي'
  },
  'ياۋروپا مۇداپىئە بىرلەشمىسى': {
    ug: 'ياۋروپا مۇداپىئە بىرلەشمىسى',
    en: 'European Defense Union',
    ar: 'الاتحاد الدفاعي الأوروبي'
  },
  'ئامېرىكا قوراللىق قىسىملىرى': {
    ug: 'ئامېرىكا قوراللىق قىسىملىرى',
    en: 'US Armed Forces',
    ar: 'القوات المسلحة الأمريكية'
  },
  'كۆپ تەرەپلىك بىرلەشمە تەتقىقات': {
    ug: 'كۆپ تەرەپلىك بىرلەشمە تەتقىقات',
    en: 'Multinational Joint R&D',
    ar: 'أبحاث مشتركة متعددة الأطراف'
  },
  'كۆپ دۆلەتلىك بىرلىشىمە تەتقىقات': {
    ug: 'كۆپ دۆلەتلىك بىرلىشىمە تەتقىقات',
    en: 'Multinational Joint Research',
    ar: 'أبحاث دولية مشتركة'
  },
  'شىمالىي ئاتلانتىك ئىتتىپاقى تەجرىبىخانىسى': {
    ug: 'شىمالىي ئاتلانتىك ئىتتىپاقى تەجرىبىخانىسى',
    en: 'NATO Defense Lab',
    ar: 'مختبر حلف الناتو'
  },
  'خەلقئارالىق كىبېر مەركەز': {
    ug: 'خەلقئارالىق كىبېر مەركەز',
    en: 'Global Cyber Center',
    ar: 'المركز السيبراني الدولي'
  },
  'خەلقئارالىق كىبېر مەركىزى': {
    ug: 'خەلقئارالىق كىبېر مەركىزى',
    en: 'Global Cyber Center',
    ar: 'المركز السيبراني الدولي'
  },
  'ئالدىنقى قاتاردىكى تېخنىكا سىناقخانىسى': {
    ug: 'ئالدىنقى قاتاردىكى تېخنىكا سىناقخانىسى',
    en: 'Advanced Tech Lab',
    ar: 'مختبر التقنيات المتقدمة'
  },
  'ئالدىنقى قاتاردىكى تېخنىكا بىرلەشمىسى': {
    ug: 'ئالدىنقى قاتاردىكى تېخنىكا بىرلەشمىسى',
    en: 'Advanced Tech Consortium',
    ar: 'تحالف التكنولوجيا المتقدمة'
  },
  'يەرشارى مۇداپىئە كۆزىتىش مەركىزى': {
    ug: 'يەرشارى مۇداپىئە كۆزىتىش مەركىزى',
    en: 'Global Defense Observatory',
    ar: 'مرصد الدفاع العالمي'
  },
  'ئىتتىپاقداش ئىستىخبارات تورى': {
    ug: 'ئىتتىپاقداش ئىستىخبارات تورى',
    en: 'Allied Intelligence Network',
    ar: 'شبكة الاستخبارات المشتركة'
  },
  'يەرشارى تەھلىل ئورگىنى': {
    ug: 'يەرشارى تەھلىل ئورگىنى',
    en: 'Global Strategic Bureau',
    ar: 'هيئة التحليل الاستراتيجي العالمي'
  },
  'خەلقئارا تىنچلىق ۋە ھەربىي تەھلىل ئىنىستىتۇتى': {
    ug: 'خەلقئارا تىنچلىق ۋە ھەربىي تەھلىل ئىنىستىتۇتى',
    en: 'Int\'l Military Analysis Institute',
    ar: 'المعهد الدولي للتحليل العسكري'
  },
  'شىمالىي ئاتلانتىك ئىتتىپاقى قوشۇنلىرى': {
    ug: 'شىمالىي ئاتلانتىك ئىتتىپاقى قوشۇنلىرى',
    en: 'NATO Allied Forces',
    ar: 'قوات حلف الناتو'
  },
  'قوراللىق قىسىملار ئاۋىئاتسىيەسى': {
    ug: 'قوراللىق قىسىملار ئاۋىئاتسىيەسى',
    en: 'Armed Forces Aviation',
    ar: 'طيران القوات المسلحة'
  },
  'خەلقئارا ئاۋىئاتسىيە ئامبىرى': {
    ug: 'خەلقئارا ئاۋىئاتسىيە ئامبىرى',
    en: 'Global Aerospace Archive',
    ar: 'أرشيف الطيران العالمي'
  },
  'يەرشارى دېڭىز ئارمىيە ئارخىپى': {
    ug: 'يەرشارى دېڭىز ئارمىيە ئارخىپى',
    en: 'Global Naval Registry',
    ar: 'السجل البحري العالمي'
  },
  'دۆلەت ئالەم مۇداپىئە ئىدارىسى': {
    ug: 'دۆلەت ئالەم مۇداپىئە ئىدارىسى',
    en: 'National Aerospace Command',
    ar: 'قيادة الفضاء الوطنية'
  },
  'ئامېرىكا / لوكخىد مارتىن': {
    ug: 'ئامېرىكا / لوكخىد مارتىن',
    en: 'USA / Lockheed Martin',
    ar: 'أمريكا / لوكهيد مارتن'
  },
  'تۈركىيە بايكار': {
    ug: 'تۈركىيە بايكار',
    en: 'Turkiye Baykar',
    ar: 'تركيا بايكار'
  },
  'شىۋېتسىيە SAAB': {
    ug: 'شىۋېتسىيە SAAB',
    en: 'Sweden SAAB',
    ar: 'السويد ساب'
  },
  'خەلقئارا': {
    ug: 'خەلقئارا',
    en: 'International',
    ar: 'دولي'
  },
  'يەرشارى / خەلقئارا': {
    ug: 'يەرشارى / خەلقئارا',
    en: 'Global / International',
    ar: 'عالمي / دولي'
  },

  // Speeds & Special Telemetry
  'نۇر تېزلىكى': {
    ug: 'نۇر تېزلىكى',
    en: 'Speed of Light',
    ar: 'سرعة الضوء'
  },
  'نۇر تېزلىكى (Speed of Light)': {
    ug: 'نۇر تېزلىكى (Speed of Light)',
    en: 'Speed of Light',
    ar: 'سرعة الضوء'
  },

  // Statuses
  'ئاكتىپ خىزمەتتە': {
    ug: 'ئاكتىپ خىزمەتتە',
    en: 'Active Service',
    ar: 'في الخدمة الفعلية'
  },
  'دالا سىنىقىدا': {
    ug: 'دالا سىنىقىدا',
    en: 'Field Testing',
    ar: 'في الاختبار الميداني'
  },
  'ئاكتىپ چارلاشتا': {
    ug: 'ئاكتىپ چارلاشتا',
    en: 'Active Patrol',
    ar: 'في دورية نشطة'
  },
  'تەجرىبىخانىدا دەلىللەندى': {
    ug: 'تەجرىبىخانىدا دەلىللەندى',
    en: 'Lab Validated',
    ar: 'تم التحقق مخبرياً'
  },
  'دالا كۈرەش سىنىقىدا': {
    ug: 'دالا كۈرەش سىنىقىدا',
    en: 'Combat Trial',
    ar: 'في تجارب القتال الميداني'
  },
  'ئاكتىپ قوماندانلىقتا': {
    ug: 'ئاكتىپ قوماندانلىقتا',
    en: 'Operational Command',
    ar: 'قيادة عملياتية'
  },
  'ئاكتىپ قوغداشتا': {
    ug: 'ئاكتىپ قوغداشتا',
    en: 'Active Defense',
    ar: 'دفاع نشط'
  },
  'نەق مەيدان كۆزىتىشتە': {
    ug: 'نەق مەيدان كۆزىتىشتە',
    en: 'Live Surveillance',
    ar: 'مراقبة حية'
  },
  'تەھلىل تاماملاندى': {
    ug: 'تەھلىل تاماملاندى',
    en: 'Analysis Complete',
    ar: 'اكتمل التحليل'
  },
  'يۇقىرى تەھدىت باسقۇچىدا': {
    ug: 'يۇقىرى تەھدىت باسقۇچىدا',
    en: 'High-Threat State',
    ar: 'مرحلة تهديد عالي'
  },
  'تەستىقلانغان دوكلات': {
    ug: 'تەستىقلانغان دوكلات',
    en: 'Verified Assessment',
    ar: 'تقرير معتمد'
  },
  'نەق مەيداندا ئېلىپ بېرىلماقتا': {
    ug: 'نەق مەيداندا ئېلىپ بېرىلماقتا',
    en: 'Active Deployment',
    ar: 'قيد التنفيذ'
  },
  'خىزمەتكە تاپشۇرۇلدى': {
    ug: 'خىزمەتكە تاپشۇرۇلدى',
    en: 'Commissioned',
    ar: 'دخل الخدمة'
  },
  'ئاكتىپ كۈتۈپخانا': {
    ug: 'ئاكتىپ كۈتۈپخانا',
    en: 'Active Archive',
    ar: 'أرشيف نشط'
  },
  'دائىم كېڭىيىۋاتىدۇ': {
    ug: 'دائىم كېڭىيىۋاتىدۇ',
    en: 'Expanding Registry',
    ar: 'قيد التحديث المستمر'
  },
  'تەتقىقات باسقۇچىدا': {
    ug: 'تەتقىقات باسقۇچىدا',
    en: 'R&D Phase',
    ar: 'قيد التطوير'
  },
  'خىزمەتكە تەييار': {
    ug: 'خىزمەتكە تەييار',
    en: 'Operational Ready',
    ar: 'جاهز للعمليات'
  },
  'ئادەتتىكى خەۋەر': {
    ug: 'ئادەتتىكى خەۋەر',
    en: 'Standard News',
    ar: 'خبر عام'
  },
  'جىددىي ۋەزىيەت': {
    ug: 'جىددىي ۋەزىيەت',
    en: 'Breaking Alert',
    ar: 'إنذار عاجل'
  },
  'ئىستراتېگىيىلىك تەھلىل': {
    ug: 'ئىستراتېگىيىلىك تەھلىل',
    en: 'Strategic Analysis',
    ar: 'تحليل استراتيجي'
  },
  'يۇقىرى دەرىجىلىك ئاگاھلاندۇرۇش': {
    ug: 'يۇقىرى دەرىجىلىك ئاگاھلاندۇرۇش',
    en: 'High Alert',
    ar: 'إنذار أحمر'
  },

  // Clearances
  'دەرىجىدىن تاشقىرى مەخپىي (TOP-SECRET)': {
    ug: 'دەرىجىدىن تاشقىرى مەخپىي (TOP-SECRET)',
    en: 'TOP-SECRET',
    ar: 'سري للغاية (TOP-SECRET)'
  },
  'مەخپىي (CLASSIFIED)': {
    ug: 'مەخپىي (CLASSIFIED)',
    en: 'CLASSIFIED',
    ar: 'سري (CLASSIFIED)'
  },
  'دەرىجىدىن تاشقىرى مەخپىي (RESTRICTED)': {
    ug: 'دەرىجىدىن تاشقىرى مەخپىي (RESTRICTED)',
    en: 'RESTRICTED',
    ar: 'مقيد (RESTRICTED)'
  },
  'پەۋقۇلئاددە مەخپىي (BLACK-PROJECT)': {
    ug: 'پەۋقۇلئاددە مەخپىي (BLACK-PROJECT)',
    en: 'BLACK-PROJECT',
    ar: 'مشروع أسود (BLACK-PROJECT)'
  },
  'پۈتۈنلەي مەخپىي (BLACK-PROJECT)': {
    ug: 'پۈتۈنلەي مەخپىي (BLACK-PROJECT)',
    en: 'BLACK-PROJECT',
    ar: 'مشروع أسود (BLACK-PROJECT)'
  },
  'مەخپىي (CONFIDENTIAL)': {
    ug: 'مەخپىي (CONFIDENTIAL)',
    en: 'CONFIDENTIAL',
    ar: 'سري (CONFIDENTIAL)'
  },
  'مەخپىي (SECRET)': {
    ug: 'مەخپىي (SECRET)',
    en: 'SECRET',
    ar: 'سري (SECRET)'
  },
  'ئاشكارا كەسپىي تەھلىل (DEEP-ANALYSIS)': {
    ug: 'ئاشكارا كەسپىي تەھلىل (DEEP-ANALYSIS)',
    en: 'DEEP-ANALYSIS',
    ar: 'تحليل استراتيجي معمق'
  },
  'ئاشكارا ئانالىز (UNCLASSIFIED)': {
    ug: 'ئاشكارا ئانالىز (UNCLASSIFIED)',
    en: 'UNCLASSIFIED',
    ar: 'غير مصنف (UNCLASSIFIED)'
  },
  'ئاشكارا ئاخبارات (PUBLIC-RELEASE)': {
    ug: 'ئاشكارا ئاخبارات (PUBLIC-RELEASE)',
    en: 'PUBLIC-RELEASE',
    ar: 'نشر عام (PUBLIC-RELEASE)'
  },
  'ئاشكارا (PUBLIC)': {
    ug: 'ئاشكارا (PUBLIC)',
    en: 'PUBLIC',
    ar: 'علني (PUBLIC)'
  },
  'ئۆلچەملىك مەلۇمات (PUBLIC-SPECS)': {
    ug: 'ئۆلچەملىك مەلۇمات (PUBLIC-SPECS)',
    en: 'PUBLIC-SPECS',
    ar: 'مواصفات عامة (PUBLIC-SPECS)'
  },
  'ئاشكارا كەسپىي (PUBLIC-OSINT)': {
    ug: 'ئاشكارا كەسپىي (PUBLIC-OSINT)',
    en: 'PUBLIC-OSINT',
    ar: 'استخبارات علنية (OSINT)'
  },

  // Authors & Agencies
  'تاكتىكا ئىستراتېگىيە مەركىزى': {
    ug: 'تاكتىكا ئىستراتېگىيە مەركىزى',
    en: 'Tactical Strategy Center',
    ar: 'مركز الاستراتيجيات التكتيكية'
  },
  'ئېنېرگىيە مۇداپىئە تەتقىقات ئورنى': {
    ug: 'ئېنېرگىيە مۇداپىئە تەتقىقات ئورنى',
    en: 'Defense Energy Research',
    ar: 'معهد أبحاث دفاع الطاقة'
  },
  'ئۇچقۇچىسىز سىستېمىلار تەھلىلچىسى': {
    ug: 'ئۇچقۇچىسىز سىستېمىلار تەھلىلچىسى',
    en: 'Unmanned Systems Analyst',
    ar: 'محلل الأنظمة المسيرة'
  },
  'ستراتېگىيىلىك ھاۋا ئارمىيە ئاگېنتلىقى': {
    ug: 'ستراتېگىيىلىك ھاۋا ئارمىيە ئاگېنتلىقى',
    en: 'Strategic Aerospace Agency',
    ar: 'وكالة الفضاء الاستراتيجية'
  },
  'مۇداپىئە مىنىستىرلىقى تېخنىكا كۆزىتىش ئورگىنى': {
    ug: 'مۇداپىئە مىنىستىرلىقى تېخنىكا كۆزىتىش ئورگىنى',
    en: 'Defense Tech Observatory',
    ar: 'مرصد التكنولوجيا الدفاعية'
  },
  'ئەسكىرىي كىبېر تەھلىلچى': {
    ug: 'ئەسكىرىي كىبېر تەھلىلچى',
    en: 'Military Cyber Analyst',
    ar: 'محلل الأمن السيبراني العسكري'
  },
  'دېڭىز ئارمىيە مەخپىي ئىستىخبارات مەركىزى': {
    ug: 'دېڭىز ئارمىيە مەخپىي ئىستىخبارات مەركىزى',
    en: 'Naval Intelligence Bureau',
    ar: 'المكتب الاستخباراتي البحري'
  },
  'خەلقئارالىق سۈنئىي ھەمراھ كۆزىتىش مەركىزى': {
    ug: 'خەلقئارالىق سۈنئىي ھەمراھ كۆزىتىش مەركىزى',
    en: 'International Satellite Surveillance',
    ar: 'مركز المراقبة بالأقمار الصناعية'
  },
  'ھەربىي تەھلىل ئورگىنى': {
    ug: 'ھەربىي تەھلىل ئورگىنى',
    en: 'Defense Analysis Bureau',
    ar: 'هيئة التحليل العسكري'
  },
  'ھەربىي مۇستەقىل ئاگېنتلىق': {
    ug: 'ھەربىي مۇستەقىل ئاگېنتلىق',
    en: 'Independent Defense Agency',
    ar: 'الوكالة العسكرية المستقلة'
  },
  'ھەربىي ئاخبارات ئاگېنتلىقى': {
    ug: 'ھەربىي ئاخبارات ئاگېنتلىقى',
    en: 'Military Intelligence Agency',
    ar: 'وكالة الأنباء العسكرية'
  },
  'ئاكتىپ': {
    ug: 'ئاكتىپ',
    en: 'Active',
    ar: 'نشط'
  },
  'تەستىقلانغان': {
    ug: 'تەستىقلانغان',
    en: 'Verified',
    ar: 'موثق'
  },
  'تەستىقلانغان ئاخبارات': {
    ug: 'تەستىقلانغان ئاخبارات',
    en: 'Verified Intel',
    ar: 'معلومات موثقة'
  },
  'تەستىقلانغان ئانالىز': {
    ug: 'تەستىقلانغان ئانالىز',
    en: 'Verified Analysis',
    ar: 'تحليل موثق'
  },
  'تەستىقلانغان سىياسىي ئانالىز': {
    ug: 'تەستىقلانغان سىياسىي ئانالىز',
    en: 'Verified Geopolitical Analysis',
    ar: 'تحليل سياسي معتمد'
  },
  'تەستىقلانغان ماقالە': {
    ug: 'تەستىقلانغان ماقالە',
    en: 'Verified Article',
    ar: 'مقال معتمد'
  },
  'ئاشكارا تاكتىكىلىق ئاخبارات': {
    ug: 'ئاشكارا تاكتىكىلىق ئاخبارات',
    en: 'Open Tactical Intel',
    ar: 'استخبارات تكتيكية معلنة'
  },
  'ئاشكارا ئاخبارات': {
    ug: 'ئاشكارا ئاخبارات',
    en: 'Open Intelligence',
    ar: 'استخبارات معلنة'
  },
  'ئاشكارا كەسپىي': {
    ug: 'ئاشكارا كەسپىي',
    en: 'Professional OSINT',
    ar: 'استخبارات علنية'
  },
  'ھەربىي مەلۇمات ئامبىرى (Arsenal Wiki)': {
    ug: 'ھەربىي مەلۇمات ئامبىرى (Arsenal Wiki)',
    en: 'Arsenal Wiki Archive',
    ar: 'موسوعة الترسانة العسكرية'
  },
  'قاسيون تەتقىقات مەركىزى': {
    ug: 'قاسيون تەتقىقات مەركىزى',
    en: 'Qasioun Research Center',
    ar: 'مركز قاسيون للدراسات'
  },
  'مركز قاسيون للدراسات': {
    ug: 'قاسيون تەتقىقات مەركىزى',
    en: 'Qasioun Research Center',
    ar: 'مركز قاسيون للدراسات'
  },
  'مركز الخطابي للدراسات': {
    ug: 'خەتتابىي تەتقىقات مەركىزى',
    en: 'Al-Khattabi Research Center',
    ar: 'مركز الخطابي للدراسات'
  },
  'ئەلى تەمىمى (Facebook)': {
    ug: 'ئەلى تەمىمى (Facebook)',
    en: 'Ali Tamimi (Facebook)',
    ar: 'علي التميمي (Facebook)'
  },
  'علي التميمي (Facebook)': {
    ug: 'ئەلى تەمىمى (Facebook)',
    en: 'Ali Tamimi (Facebook)',
    ar: 'علي التميمي (Facebook)'
  },
  'ئەلى تەمىمى': {
    ug: 'ئەلى تەمىمى',
    en: 'Ali Tamimi',
    ar: 'علي التميمي'
  },
  'صقر العرب (Facebook)': {
    ug: 'صقر العرب (Facebook)',
    en: 'Saqr Al-Arab (Facebook)',
    ar: 'صقر العرب (Facebook)'
  },
  'خەلقئارالىق ئەسكىرىي مەنبە': {
    ug: 'خەلقئارالىق ئەسكىرىي مەنبە',
    en: 'International Defense Source',
    ar: 'مصدر عسكري دولي'
  },
  'ئەسكىرىي خەۋەرلەر مەركىزى': {
    ug: 'ئەسكىرىي خەۋەرلەر مەركىزى',
    en: 'Military News Center',
    ar: 'مركز الأخبار العسكرية'
  },
  'دۇنياۋى ئاخبارات': {
    ug: 'دۇنياۋى ئاخبارات',
    en: 'Global Intelligence',
    ar: 'استخبارات عالمية'
  },
  'ئاۋسترالىيە / ئامېرىكا': {
    ug: 'ئاۋسترالىيە / ئامېرىكا',
    en: 'Australia / USA',
    ar: 'أستراليا / أمريكا'
  },
  'تەھرىرات': {
    ug: 'تەھرىرات',
    en: 'Editorial Board',
    ar: 'هيئة التحرير'
  }
};

/**
 * Translates hardcoded metadata (origin, clearance badge, status, author, speed, range, payload)
 * into the current selected language.
 */
export function translateMetadata(value: string | undefined, lang: Language): string {
  if (!value) return '';

  const trimmed = value.trim();

  // If requesting Uyghur
  if (lang === 'ug') {
    if (METADATA_DICTIONARY[trimmed]?.ug) return METADATA_DICTIONARY[trimmed].ug;
    return trimmed;
  }

  // 1. Direct match in dictionary
  if (METADATA_DICTIONARY[trimmed]) {
    return METADATA_DICTIONARY[trimmed][lang] || trimmed;
  }

  // 2. Extract classification keywords inside parentheses (e.g. "پەۋقۇلئاددە مەخپىي (BLACK-PROJECT)")
  const parenMatch = trimmed.match(/\(([A-Z0-9_\-\s]+)\)/);
  if (parenMatch && parenMatch[1]) {
    const code = parenMatch[1].trim();
    if (lang === 'en') {
      return code;
    }
    if (lang === 'ar') {
      if (code === 'BLACK-PROJECT') return 'مشروع أسود (BLACK-PROJECT)';
      if (code === 'TOP-SECRET') return 'سري للغاية (TOP-SECRET)';
      if (code === 'CONFIDENTIAL') return 'سري (CONFIDENTIAL)';
      if (code === 'RESTRICTED') return 'مقيد (RESTRICTED)';
      if (code === 'SECRET') return 'سري (SECRET)';
      if (code === 'CLASSIFIED') return 'سري (CLASSIFIED)';
      if (code === 'UNCLASSIFIED') return 'غير مصنف (علني)';
      if (code === 'PUBLIC-RELEASE') return 'نشر عام (PUBLIC-RELEASE)';
      if (code === 'PUBLIC-SPECS') return 'مواصفات عامة';
      if (code.includes('PUBLIC') || code.includes('OSINT')) return 'استخبارات علنية (OSINT)';
      return code;
    }
  }

  // 3. Substring checks for clearances & classifications
  if (trimmed.includes('BLACK-PROJECT')) return lang === 'en' ? 'BLACK-PROJECT' : 'مشروع أسود (BLACK-PROJECT)';
  if (trimmed.includes('TOP-SECRET')) return lang === 'en' ? 'TOP-SECRET' : 'سري للغاية (TOP-SECRET)';
  if (trimmed.includes('CONFIDENTIAL')) return lang === 'en' ? 'CONFIDENTIAL' : 'سري (CONFIDENTIAL)';
  if (trimmed.includes('RESTRICTED')) return lang === 'en' ? 'RESTRICTED' : 'مقيد (RESTRICTED)';
  if (trimmed.includes('SECRET')) return lang === 'en' ? 'SECRET' : 'سري (SECRET)';
  if (trimmed.includes('CLASSIFIED')) return lang === 'en' ? 'CLASSIFIED' : 'سري (CLASSIFIED)';
  if (trimmed.includes('UNCLASSIFIED')) return lang === 'en' ? 'UNCLASSIFIED' : 'غير مصنف (علني)';
  if (trimmed.includes('PUBLIC-RELEASE')) return lang === 'en' ? 'PUBLIC-RELEASE' : 'نشر عام (PUBLIC-RELEASE)';
  if (trimmed.includes('PUBLIC-SPECS')) return lang === 'en' ? 'PUBLIC-SPECS' : 'مواصفات عامة';
  if (trimmed.includes('PUBLIC') || trimmed.includes('OSINT')) return lang === 'en' ? 'PUBLIC-OSINT' : 'استخبارات علنية (OSINT)';
  if (trimmed.includes('DEEP-ANALYSIS')) return lang === 'en' ? 'DEEP-ANALYSIS' : 'تحليل استراتيجي معمق';

  if (trimmed.includes('ئاشكارا')) {
    if (trimmed.includes('تاكتىكا')) return lang === 'en' ? 'Open Tactical Intel' : 'استخبارات تكتيكية معلنة';
    if (trimmed.includes('ئاخبارات')) return lang === 'en' ? 'Open Intelligence' : 'استخبارات معلنة';
    return lang === 'en' ? 'Open Intel' : 'استخبارات معلنة';
  }
  if (trimmed.includes('مەخپىي')) {
    if (trimmed.includes('پەۋقۇلئاددە') || trimmed.includes('دەرىجىدىن')) return lang === 'en' ? 'TOP-SECRET' : 'سري للغاية';
    return lang === 'en' ? 'CLASSIFIED' : 'سري';
  }

  // 4. Substring checks for statuses
  if (trimmed.includes('تەستىقلانغان')) {
    if (trimmed.includes('ئانالىز')) return lang === 'en' ? 'Verified Analysis' : 'تحليل موثق';
    if (trimmed.includes('ئاخبارات')) return lang === 'en' ? 'Verified Intel' : 'معلومات موثقة';
    if (trimmed.includes('سىياسىي')) return lang === 'en' ? 'Geopolitical Analysis' : 'تحليل سياسي معتمد';
    if (trimmed.includes('ماقالە')) return lang === 'en' ? 'Verified Article' : 'مقال معتمد';
    return lang === 'en' ? 'Verified' : 'موثق';
  }
  if (trimmed.includes('ئاكتىپ')) {
    if (trimmed.includes('خىزمەت')) return lang === 'en' ? 'Active Service' : 'في الخدمة الفعلية';
    if (trimmed.includes('چارلاش')) return lang === 'en' ? 'Active Patrol' : 'في دورية نشطة';
    if (trimmed.includes('قوماندانلىق')) return lang === 'en' ? 'Operational Command' : 'قيادة عملياتية';
    if (trimmed.includes('قوغداش')) return lang === 'en' ? 'Active Defense' : 'دفاع نشط';
    return lang === 'en' ? 'Active' : 'نشط';
  }

  // 5. Substring checks for speeds & origins & authors
  if (trimmed.includes('نۇر تېزلىكى')) return lang === 'en' ? 'Speed of Light' : 'سرعة الضوء';
  if (trimmed.includes('ئامېرىكا')) return lang === 'en' ? 'US Armed Forces' : 'القوات المسلحة الأمريكية';
  if (trimmed.includes('شىمالىي ئاتلانتىك')) return lang === 'en' ? 'NATO Alliance' : 'حلف الناتو';
  if (trimmed.includes('ياۋروپا')) return lang === 'en' ? 'European Defense Union' : 'الاتحاد الدفاعي الأوروبي';
  if (trimmed.includes('كۆپ تەرەپلىك') || trimmed.includes('كۆپ دۆلەتلىك')) return lang === 'en' ? 'Multinational Joint R&D' : 'أبحاث دولية مشتركة';
  if (trimmed.includes('كىبېر')) return lang === 'en' ? 'Global Cyber Center' : 'المركز السيبراني الدولي';
  if (trimmed.includes('تېخنىكا')) return lang === 'en' ? 'Advanced Tech Lab' : 'مختبر التقنيات المتقدمة';
  if (trimmed.includes('ئىستىخبارات') || trimmed.includes('ئاخبارات')) return lang === 'en' ? 'Intelligence Network' : 'شبكة استخباراتية';
  if (trimmed.includes('تەھلىل')) return lang === 'en' ? 'Strategic Analysis' : 'التحليل الاستراتيجي';
  if (trimmed.includes('ئاۋىئاتسىيە')) return lang === 'en' ? 'Armed Forces Aviation' : 'طيران القوات المسلحة';
  if (trimmed.includes('دېڭىز ئارمىيە')) return lang === 'en' ? 'Global Naval Registry' : 'السجل البحري العالمي';
  if (trimmed.includes('مۇداپىئە')) return lang === 'en' ? 'Defense Research' : 'أبحاث الدفاع الدولي';
  if (trimmed.includes('خەلقئارا')) return lang === 'en' ? 'International' : 'دولي';
  if (trimmed.includes('قاسيون')) return lang === 'en' ? 'Qasioun Research Center' : 'مركز قاسيون للدراسات';
  if (trimmed.includes('ئەلى تەمىمى')) return lang === 'en' ? 'Ali Tamimi' : 'علي التميمي';

  // 6. If in English and the text contains ASCII/Latin, it's already in English
  if (lang === 'en' && /^[\x00-\x7F\s\d.,:/()+-]+$/.test(trimmed)) {
    return trimmed;
  }

  // 7. If in Arabic and the text is purely Arabic (no Uyghur-specific letters)
  if (lang === 'ar' && !isUg(trimmed)) {
    return trimmed;
  }

  // 8. FINAL SAFETY NET:
  // If target language is Arabic or English, but the string STILL contains Uyghur script characters,
  // NEVER leak Uyghur characters to Arabic or English screens!
  if (isUg(trimmed)) {
    return lang === 'ar' ? 'معتمد' : 'Verified';
  }

  return trimmed;
}

export function getArticleTitle(article: any, lang: Language): string {
  if (!article) return '';
  if (typeof article.title === 'string') return article.title;
  const t = article.title || {};
  if (lang === 'ug') {
    if (t.ug) return t.ug;
    return t.ar || t.en || '';
  }
  if (lang === 'ar') {
    if (t.ar && !isUg(t.ar)) return t.ar;
    if (t.en && isAr(t.en) && !isLatin(t.en)) return t.en;
    if (t.ar) return t.ar;
    return t.ug || t.en || '';
  }
  if (lang === 'en') {
    if (t.en && isLatin(t.en)) return t.en;
    if (t.en && !isUg(t.en) && !isAr(t.en)) return t.en;
    return t.en || t.ug || t.ar || '';
  }
  return t.ug || t.en || t.ar || '';
}

export function getArticleSummary(article: any, lang: Language): string {
  if (!article) return '';
  if (typeof article.summary === 'string') return article.summary;
  const s = article.summary || {};
  if (lang === 'ug') {
    if (s.ug) return s.ug;
    return s.ar || s.en || '';
  }
  if (lang === 'ar') {
    if (s.ar && !isUg(s.ar)) return s.ar;
    if (s.en && isAr(s.en) && !isLatin(s.en)) return s.en;
    if (s.ar) return s.ar;
    return s.ug || s.en || '';
  }
  if (lang === 'en') {
    if (s.en && isLatin(s.en)) return s.en;
    if (s.en && !isUg(s.en) && !isAr(s.en)) return s.en;
    return s.en || s.ug || s.ar || '';
  }
  return s.ug || s.en || s.ar || '';
}

export function getArticleContent(article: any, lang: Language): string {
  if (!article) return '';
  if (typeof article.content === 'string') {
    return article.content;
  }
  const c = article.content || {};
  if (lang === 'ug') {
    if (c.ug) return c.ug;
    return c.ar || c.en || '';
  }
  if (lang === 'ar') {
    if (c.ar && !isUg(c.ar)) return c.ar;
    if (c.en && isAr(c.en) && !isLatin(c.en)) return c.en;
    if (c.ar) return c.ar;
    return c.ug || c.en || '';
  }
  if (lang === 'en') {
    if (c.en && isLatin(c.en)) return c.en;
    if (c.en && !isUg(c.en) && !isAr(c.en)) return c.en;
    return c.en || c.ug || c.ar || '';
  }
  return c.ug || c.en || c.ar || '';
}

