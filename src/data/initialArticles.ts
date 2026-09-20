import { Article } from '../types/military';

export const INITIAL_ARTICLES: Article[] = [
  // 1. ئەڭ يېڭى قوراللار (Advanced Weaponry)
  {
    id: 'wp-01',
    category: 'weapons',
    title: {
      ug: 'Dark-Sword Mach 8+: يۇقىرى ئاۋاز تېزلىكىدىكى يېڭى باشقۇرۇلىدىغان بومبا سىستېمىسى',
      ar: 'سيف الظلام ماخ 8+: منظومة صواريخ فرط صوتية انزلاقية متطورة',
      en: 'Dark-Sword Mach 8+: Next-Generation Hypersonic Glide Vehicle System'
    },
    summary: {
      ug: 'ئەڭ يېڭى Scramjet ماتورى سەپلەنگەن بولۇپ، ھاۋا مۇداپىئە قالقانلىرىنى بۆسۈپ ئۆتۈش ۋە زەربە بېرىش ئىقتىدارى ئەڭ يۇقىرى پەللىگە يەتكۈزۈلگەن.',
      ar: 'مزود بمحرك سكرامجيت نفاث فائق، مصمم لاختراق كافة منظومات الدفاع الجوي وتوجيه ضربات جراحية دقيقة.',
      en: 'Powered by an advanced scramjet engine, engineered to penetrate layered missile defense shields with erratic maneuvering.'
    },
    content: {
      ug: 'بۇ سىستېما سۈنئىي ئىدراكلىق نىشان پەرقلەندۈرۈش كاللىسى بىلەن تەمىنلەنگەن بولۇپ، ئاتموسفېرانىڭ يۇقىرى قاتلىمىدا Mach 8.4 تېزلىكتە ئۆزلۈكىدىن يۆنىلىش ئۆزگەرتەلەيدۇ. ئەنئەنىۋى رادار ۋە پەش قىلىش ئۈسكۈنىلىرىنىڭ كۆرۈش دائىرىسىدىن قېچىش نىسبىتى %97 كە يېتىدۇ. نۆۋەتتە 3-باسقۇچلۇق سىناق تاماملىنىپ، سىستېما تولۇق جەڭ تەييارلىقى ھالىتىگە ئۆتكۈزۈلدى.',
      ar: 'تم تزويد المنظومة برأس حربي ذكي يعتمد على التوجيه الذاتي، قادر على المناورة الجانبية على ارتفاعات شاهقة بسرعة تصل إلى 8.4 ماخ. تصل دقة التخفي عن منظومات الرادار التقليدية إلى 97%. أتم النظام بنجاح المرحلة الثالثة من الاختبارات العملياتية.',
      en: 'The Dark-Sword system integrates a smart optical-seeker terminal guidance head capable of erratic high-g lateral evasions at Mach 8.4 in the upper atmosphere. Operational simulations demonstrate a 97% penetration rate through dense layered anti-ballistic missile nets.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1517976487502-53b6f041d8e1?auto=format&fit=crop&w=1200&q=80',
    author: 'تاكتىكا ئىستراتېگىيە مەركىزى',
    date: '2026-09-18',
    status: 'published',
    featured: true,
    views: 4230,
    tags: ['Hypersonic', 'Scramjet', 'Cruise Missile', 'Mach 8'],
    specs: {
      speed: 'Mach 8.4',
      range: '2,800 km',
      payload: '750 kg EMP/HE',
      origin: 'شىمالىي ئاتلانتىك ئىتتىپاقى',
      status: 'ئاكتىپ خىزمەتتە',
      clearance: 'دەرىجىدىن تاشقىرى مەخپىي (TOP-SECRET)',
      radarCrossSection: '< 0.005 m²',
      ceiling: '42,000 m'
    }
  },
  {
    id: 'wp-02',
    category: 'weapons',
    title: {
      ug: 'Aegis-Beam 100kW: تاكتىكىلىق يۇقىرى ئېنېرگىيىلىك لازېرلىق ھاۋا قالقىنى',
      ar: 'إيجيس-بيم 100 كيلوواط: درع الدفاع الجوي بالليزر التكتيكي عالي الطاقة',
      en: 'Aegis-Beam 100kW: Solid-State Tactical Directed Energy Interceptor'
    },
    summary: {
      ug: 'دىرون ئەترەتلىرى، راكېتا ۋە مىناميوت ئوقلىرىنى سېكۇنتقا يەتمىگەن ۋاقىتتا يوقىتىدىغان ئوپتىك تالالىق لازېر قورالى.',
      ar: 'سلاح ليزري من الألياف الضوئية قادر على تدمير أسراب الدرونات وقذائف الهاون والصواريخ في أجزاء من الثانية.',
      en: 'Fiber-laser tactical system engineered to neutralize drone swarms, mortar shells and anti-ship missiles at the speed of light.'
    },
    content: {
      ug: 'مەزكۇر ئېنېرگىيە قورالى دېڭىز پاراخوتلىرى ۋە قۇرۇقلۇق كۆچمە بازىلىرىغا قاچىلانغان بولۇپ، ھەربىر تېپىش تەننەرخى 5 دوللاردىن ئاشمايدۇ. ئاپتوماتىك كۆپ نىشان تۇتۇش ئىقتىدارى بىرلا ۋاقىتتا كەلگەن 12 دانە خەتەرلىك ئوبيېكتنى ئايرىم-ئايرىم قىزدۇرۇپ پارتلىتىش ئىقتىدارىغا ئىگە.',
      ar: 'تم تصميم هذا السلاح فائق القدرة للتثبيت على المدمرات البحرية والمنصات البرية المتنقلة، حيث لا تتجاوز تكلفة الإطلاق الواحدة 5 دولارات. يتميز بقدرة تعقب واعتراض متعددة الأهداف تدمر 12 هدفاً متزامناً في ثوانٍ معدودة.',
      en: 'Engineered for naval destroyers and mobile heavy-armor carriers, the Aegis-Beam operates with a marginal shot cost below $5. Features multi-aperture optics to track and melt up to 12 incoming micro-munitions or suicide drones simultaneously.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    author: 'ئېنېرگىيە مۇداپىئە تەتقىقات ئورنى',
    date: '2026-09-15',
    status: 'published',
    featured: false,
    views: 3120,
    tags: ['Laser DEW', 'Air Defense', 'Directed Energy'],
    specs: {
      speed: 'نۇر تېزلىكى (Speed of Light)',
      range: '12 km',
      payload: '100 kW Directed Energy',
      origin: 'خەلقئارا مۇداپىئە تەتقىقاتى',
      status: 'دالا سىنىقىدا',
      clearance: 'مەخپىي (CLASSIFIED)',
      radarCrossSection: 'N/A',
      ceiling: '15,000 m'
    }
  },

  // 2. دىرونلار (Drones & UAV Systems)
  {
    id: 'dr-01',
    category: 'drones',
    title: {
      ug: 'Raven-Swarm X: ئۆزلۈكىدىن جەڭ قىلىدىغان سۈنئىي ئىدراك دىرون قوشۇنى',
      ar: 'رافين-سوارم إكس: سرب درونات قتالية ذاتية التحكم والتعلم العميق',
      en: 'Raven-Swarm X: Autonomous Collaborative Combat UAV Swarm'
    },
    summary: {
      ug: 'ئۆزئارا تورلاشقان 60 تىن ئارتۇق مىكرو سىتېلس دىرون، ھېچقانداق سىرتتىن يېتەكلىمىسىز نىشاننى بېكىتىپ قورشاپ زەربە بېرىدۇ.',
      ar: 'شبكة تكتيكية تضم أكثر من 60 طائرة مسيرة صغيرة متخفية تتواصل ذاتياً لإغراق رادارات العدو وتدمير مراكز القيادة.',
      en: 'A decentralized mesh network of 60+ micro-stealth loitering drones that coordinate targeting and saturation strikes without human RF links.'
    },
    content: {
      ug: 'Raven سىستېمىسى سۈنئىي ئىدراك ئارقىلىق توپ-توپ بولۇپ ئۇچۇش پىرىنسىپىنى قوللانغان. ئەگەر قوشۇندىكى باشلامچى دىرون ئېتىپ چۈشۈرۈلسە، قالغان دىرونلار بىر مىللىسېكۇنت ئىچىدە يېڭى باشلامچىنى ئاپتوماتىك سايلاپ تاكتىكىنى ئۆزگەرتەلەيدۇ. رادىئو سىگنالىنى توسۇش ھۇجۇملىرىغا %100 بەرداشلىق بېرىدۇ.',
      ar: 'يعتمد نظام السرب على محاكاة أسراب الطيور والخوارزميات الجينية. في حال إسقاط الطائرة القائدة، تتولى الطائرات الأخرى القيادة آلياً في جزء من الألف من الثانية. النظام منيع بالكامل أمام التشويش الإلكتروني بفضل الملاحة البصرية.',
      en: 'The Raven-Swarm utilizes distributed bio-inspired swarm algorithms. If individual nodes or the leader are destroyed, the remaining drones automatically reallocate reconnaissance, jamming, and kinetic strike roles within milliseconds.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80',
    author: 'ئۇچقۇچىسىز سىستېمىلار تەھلىلچىسى',
    date: '2026-09-17',
    status: 'published',
    featured: true,
    views: 5410,
    tags: ['Drone Swarm', 'AI Warfare', 'Autonomous', 'Mesh Network'],
    specs: {
      speed: '420 km/h',
      range: '950 km',
      payload: '3.5 kg Shaped-Charge / Unit',
      origin: 'ياۋروپا مۇداپىئە بىرلەشمىسى',
      status: 'ئاكتىپ خىزمەتتە',
      clearance: 'دەرىجىدىن تاشقىرى مەخپىي (RESTRICTED)',
      radarCrossSection: '< 0.001 m²',
      ceiling: '8,500 m'
    }
  },
  {
    id: 'dr-02',
    category: 'drones',
    title: {
      ug: 'Phantom-Specter RQ-90: سىتېلس ئىستىخبارات ۋە چوڭقۇر پەرۋاز دىرونى',
      ar: 'فانتوم-سبيكتر RQ-90: طائرة استطلاع وتجسس شبحية للارتفاعات الشاهقة',
      en: 'Phantom-Specter RQ-90: High-Altitude Long-Endurance Stealth ISR Drone'
    },
    summary: {
      ug: '25,000 مېتىر ئېگىزلىكتە 48 سائەت ئۈزلۈكسىز پەرۋاز قىلىپ، رادار ۋە ئىسسىقلىق ئىزىنى نۆلگە چۈشۈرگەن ئايروپىلان.',
      ar: 'تحلق على ارتفاع 25 كم لمدة 48 ساعة متواصلة مع بصمة رادارية وحرارية تقترب من الصفر لكشف أعتى التحصينات.',
      en: 'Operates at 25,000m altitudes for 48 uninterrupted hours, providing quantum SAR imaging across vast strategic theaters.'
    },
    content: {
      ug: 'بۇ ئۇچقۇچىسىز ئايروپىلان بىرىكمە كۆمۈر تالالىق ماتېرىيال ۋە رادار دولقۇنىنى يۇتۇۋالىدىغان يېڭى سىر بىلەن قاپلانغان. ئاكتىپ ئېلېكترونلۇق رادار (AESA) ئارقىلىق بۇلۇت، تۇمان ۋە پۇختا ئىستىھكاملارنىڭ ئىچىنى ئېنىق سۈرەتكە ئالالايدۇ.',
      ar: 'مصنعة من مواد كربونية مركبة متقدمة مع طلاء نانوي يمتص الموجات الكهرومغناطيسية. تزود برادار مسح إلكتروني AESA قادر على اختراق التحصينات العميقة وكشف الأهداف الأرضية تحت أسوأ الظروف الجوية.',
      en: 'Constructed with radar-absorbent carbon bismaleimide composites and passive cryogenic sensor packages. It streams multi-spectral synthetic aperture radar telemetry directly to orbital comms links in hostile airspace.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    author: 'ئاۋىئاتسىيە ئاخبارات تەھرىراتى',
    date: '2026-09-12',
    status: 'published',
    featured: false,
    views: 2980,
    tags: ['HALE UAV', 'Stealth', 'Strategic Recon'],
    specs: {
      speed: 'Mach 0.82',
      range: '14,000 km',
      payload: '1,800 kg Sensors & SIGINT',
      origin: 'ئامېرىكا قوراللىق قىسىملىرى',
      status: 'ئاكتىپ چارلاشتا',
      clearance: 'دەرىجىدىن تاشقىرى مەخپىي (TOP-SECRET)',
      radarCrossSection: '< 0.0001 m²',
      ceiling: '25,000 m'
    }
  },

  // 3. تەتقىق قىلىۋاتقان تۈرلەر (R&D Defense Projects)
  {
    id: 'rd-01',
    category: 'projects',
    title: {
      ug: 'Quantum-Shield: سىتېلس ئايروپىلانلارنى پاش قىلغۇچى كۋانت رادار تەتقىقاتى',
      ar: 'كوانتوم-شيلد: منظومة الرادار الكمومي لإبطال التخفي الشبحي للجيل القادم',
      en: 'Quantum-Shield: Entangled-Photon Stealth Detection Radar Matrix'
    },
    summary: {
      ug: 'كۋانت گىرەلەشمە فوتونلىرى ئارقىلىق F-35 ۋە B-21 غا ئوخشاش ئەڭ ئىلغار سىتېلس نىشانلىرىنى پەرقلەندۈرۈش سىنىقى مۇۋەپپەقىيەتلىك بولدى.',
      ar: 'تجارب ناجحة لرصد الطائرات الشبحية الحديثة مثل B-21 و F-35 باستخدام فوتونات الضوء المتشابكة كمومياً التي لا تخضع للتشويش.',
      en: 'Breakthrough entangled-photon quantum radar tests successfully pinpoint and track low-RCS airframes in heavy radar clutter.'
    },
    content: {
      ug: 'ئەنئەنىۋى رادارلار دولقۇننى چىقىرىپ قايتقان نۇرنى ئۆلچەيدۇ. ئەمما كۋانت رادار ئىككىگە پارچىلانغان قوش فوتوننى ئىشلىتىدىغان بولۇپ، ھەرقانداق ئېلېكترونلۇق قارشىلىق كۆرسىتىش ياكى رادار دولقۇنىنى يۇتۇۋېلىش ماتېرىيالى بۇ سىگنالنى ئالدىيالمايدۇ. بۇ تۈر پۈتكەن كۈنى دۇنيادىكى بارلىق سىتېلس ئۇقۇمى ئۈزۈل-كېسىل ئۆزگىرىدۇ.',
      ar: 'على عكس الرادارات الكلاسيكية، يرسل الرادار الكمومي أحد الفوتونين المتشابكين نحو الفضاء ويحتفظ بالآخر في جهاز الرصد. أي جسم يمر عبر هذا المسار يغير الحالة الكمومية فوراً، مما يجعل التشويش والتخفي الكهرومغناطيسي بلا فائدة.',
      en: 'Quantum radar utilizes entangled photon pairs: one probe photon is beamed into the target sector while the idler is measured locally. Any interaction collapses quantum coherence, rendering all current radar-absorbent coatings completely transparent.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    author: 'كۋانت فىزىكا تەتقىقات گۇرۇپپىسى',
    date: '2026-09-14',
    status: 'published',
    featured: true,
    views: 3870,
    tags: ['Quantum Radar', 'Anti-Stealth', 'Black Project', 'R&D'],
    specs: {
      speed: 'نۇر تېزلىكى',
      range: '450 km',
      payload: 'Cryogenic Detection Chamber',
      origin: 'كۆپ تەرەپلىك بىرلەشمە تەتقىقات',
      status: 'تەجرىبىخانىدا دەلىللەندى',
      clearance: 'پەۋقۇلئاددە مەخپىي (BLACK-PROJECT)',
      radarCrossSection: 'N/A',
      ceiling: '100,000 m (Orbital)'
    }
  },
  {
    id: 'rd-02',
    category: 'projects',
    title: {
      ug: 'Titan-Titanium Exoskeleton: كەلگۈسى تاكتىكىلىق بىر گەۋدە جەڭچى ساۋۇتى',
      ar: 'تيتان-إكسوسكيليتون: الهيكل الخارجي التكتيكي لمقاتلي المشاة المستقبليين',
      en: 'Titan-Titanium Exoskeleton: Next-Gen Powered Infantry Combat Armor'
    },
    summary: {
      ug: 'ئەسكەرلەرنىڭ 90 كىلوگرام ئېغىرلىقتىكى قورال-ياراغنى چارچىماي 40 كىلومېتىر پىيادە ئېلىپ مېڭىشىغا شارائىت يارىتىپ بېرىدۇ.',
      ar: 'هيكل ميكانيكي هيدروليكي مدعوم بالذكاء الاصطناعي يمكن الجندي من حمل 90 كغ لمسافة 40 كم دون أدنى إجهاد.',
      en: 'AI-assisted powered titanium-graphene exoskeleton enabling soldiers to sprint with 90kg of ordnance and ballistic shields.'
    },
    content: {
      ug: 'بۇ ساۋۇت تىتان ۋە گىرافېن بىرىكمىسىدىن ياسالغان بولۇپ، ئاپتوماتىك بىئولوگىيىلىك سېنزورلار ئارقىلىق جەڭچىنىڭ ئېغىرلىق كۈچىنى %80 ئازايتىپ بېرىدۇ. ئىچىگە كىچىك تىپتىكى ھاۋا تەڭشىگۈچ، قاراڭغۇدا كۆرۈش ئېكرانى ۋە زەھەرلىك گازدىن مۇداپىئەلىنىش كاپسۇلى ئورنىتىلغان.',
      ar: 'صنع الهيكل من سبائك التيتانيوم المقواة بالجرافين، ويحتوي على بطاريات صلبة تدوم لـ 72 ساعة متواصلة. يوفر خوذة متطورة بواجهة واقع معزز (HUD) تعرض خريطة تكتيكية ثلاثية الأبعاد للميدان ومواقع النيران الصديقة والمعادية.',
      en: 'Fabricated from carbon nanotube matrices and titanium alloy joints. Delivers 72 hours of continuous combat operation, featuring an augmented reality HUD with biometric telemetry, friend-or-foe targeting brackets, and NBC environmental filtration.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    author: 'مۇداپىئە بىئوتېخنىكا بۆلۈمى',
    date: '2026-09-09',
    status: 'published',
    featured: false,
    views: 2430,
    tags: ['Exoskeleton', 'Future Soldier', 'Titanium Armor'],
    specs: {
      speed: '28 km/h (Sprint)',
      range: '72 Hours Endurance',
      payload: '90 kg Combat Gear',
      origin: 'شىمالىي ئاتلانتىك ئىتتىپاقى تەجرىبىخانىسى',
      status: 'دالا كۈرەش سىنىقىدا',
      clearance: 'مەخپىي (CONFIDENTIAL)',
      radarCrossSection: 'N/A',
      ceiling: 'N/A'
    }
  },

  // 4. سۈنئىي ئىدراك ۋە ئەسكىرىي ساھە (AI & Military Sector)
  {
    id: 'ai-01',
    category: 'ai_military',
    title: {
      ug: 'Aegis-Mind C4ISR: ئۇرۇش مەيدانىنى ئاپتوماتىك باشقۇرىدىغان AI نېرۋا تورى',
      ar: 'إيجيس-مايند C4ISR: الشبكة العصبية المستقلة لإدارة وتوجيه المعارك الميدانية',
      en: 'Aegis-Mind C4ISR: Autonomous Battle-Management & Targeting AI Matrix'
    },
    summary: {
      ug: 'مىڭلىغان سېنزور، سۈنئىي ھەمراھ ۋە راداردىن كەلگەن ئۇچۇرلارنى بىر مىللىسېكۇنتتا تەھلىل قىلىپ قوماندانلىق تەدبىرى بېرىدۇ.',
      ar: 'تحلل مصفوفة الذكاء الاصطناعي ملايين البيانات الميدانية والأقمار الاصطناعية لتقدم خطط الهجوم والدفاع للقيادة التكتيكية فوراً.',
      en: 'Fuses telemetry from multi-domain radars, satellites, and frontline units to produce optimal tactical firing solutions within milliseconds.'
    },
    content: {
      ug: 'مەزكۇر سىستېما سۈنئىي ئىدراك مودېلى ئارقىلىق دۈشمەننىڭ قورال ئورۇنلاشتۇرۇشىنى مۆلچەرلەپ، ئەڭ ئاز زىيان بىلەن زەربە بېرىش نىشانىنى تەۋسىيە قىلىدۇ. ئىنسان قوماندانلارنىڭ ئىنكاس قايتۇرۇش سۈرئىتىنى 12 ھەسسە ئاشۇرۇپ، ئۇرۇش مەيدانىدىكى تەدبىر كېچىكىشىنى پۈتۈنلەي تۈگەتكەن.',
      ar: 'يعتمد النظام على خوارزميات التعلم المعزز للتنبؤ بمسارات نيران العدو وإعادة توزيع طاقات الدفاع الجوي واستهداف الدبابات والطائرات المعادية ذاتياً. أظهرت الاختبارات تقليص زمن اتخاذ القرار التكتيكي بنسبة 90%.',
      en: 'The Aegis-Mind architecture parses multi-spectral battlefield data feeds to deliver predictive threat vectors and weapon-target pairings. In red-team wargames, it accelerated command-and-control response cycles by a factor of 12.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: 'كىبېر ئۇرۇش ۋە سۈنئىي ئىدراك مەركىزى',
    date: '2026-09-16',
    status: 'published',
    featured: true,
    views: 4920,
    tags: ['C4ISR', 'Military AI', 'Battle Management', 'Neural Matrix'],
    specs: {
      speed: '0.4 ms Inference',
      range: 'Global Cloud Mesh',
      payload: '100,000 Concurrent Sensor Feeds',
      origin: 'خەلقئارالىق كىبېر مەركەز',
      status: 'ئاكتىپ قوماندانلىقتا',
      clearance: 'دەرىجىدىن تاشقىرى مەخپىي (TOP-SECRET)',
      radarCrossSection: 'N/A',
      ceiling: 'N/A'
    }
  },
  {
    id: 'ai-02',
    category: 'ai_military',
    title: {
      ug: 'Cyber-Sentinel 4.0: دۆلەت مۇداپىئە تورىنى قوغدايدىغان ئەقلىي كىبېر قالقان',
      ar: 'سايبر-سنتينل 4.0: المنظومة الدفاعية ذاتية التكيف لصد الهجمات الإلكترونية العسكرية',
      en: 'Cyber-Sentinel 4.0: Self-Healing Neural Infrastructure Defense Shield'
    },
    summary: {
      ug: 'ھەربىي ساندانلار ۋە مۇداپىئە سىستېمىلىرىغا قىلىنغان يۇقىرى دەرىجىلىك ھۇجۇملارنى ئۆزلۈكىدىن قايتۇرىدىغان ئەقلىي يۇمشاق دېتال.',
      ar: 'منظومة ذكاء اصطناعي سيبرانية تحيد هجمات الفيروسات المتقدمة وبرمجيات الفدية وتصلح الثغرات البرمجية في الأنظمة الدفاعية تلقائياً.',
      en: 'Autonomous defensive cyber agent capable of detecting zero-day exploits and hot-patching critical military networks under hostile fire.'
    },
    content: {
      ug: 'Cyber-Sentinel پۈتكۈل ھەربىي سانلىق مەلۇمات لىنىيىسىدىكى ئادەتتىن تاشقىرى سىگناللارنى دەل ۋاقتىدا كۆزىتىپ تۇرىدۇ. ئەگەر سىستېمىغا مەخپىي كود كىرسە، ئۇنى ئايرىپ قويۇپ 3 سېكۇنت ئىچىدە كودنى ئۆزگەرتىپ قايتا ياماقلايدۇ.',
      ar: 'تراقب المنظومة ملايين حزم البيانات المتبادلة في القيادات العسكرية وتكتشف السلوكيات الشاذة في غضون ميكروثانية. تمتلك القدرة على عزل البرمجيات الخبيثة وتوليد ترقيعات برمجية دفاعية تلقائية دون إيقاف تشغيل الخوادم.',
      en: 'Monitoring critical command networks, Cyber-Sentinel detects subtle zero-day telemetry anomalies at wire speed. It dynamically isolates corrupted nodes and synthesizes micro-patches within 3 seconds without operational downtime.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    author: 'ئەسكىرىي كىبېر تەھلىلچى',
    date: '2026-09-11',
    status: 'published',
    featured: false,
    views: 2840,
    tags: ['Cyber Defense', 'Zero-Day', 'AI Sentinel'],
    specs: {
      speed: '400 Gbps Deep Inspection',
      range: 'Global Defense Grid',
      payload: 'Autonomous Zero-Day Mitigation',
      origin: 'ئالدىنقى قاتاردىكى تېخنىكا بىرلەشمىسى',
      status: 'ئاكتىپ قوغداشتا',
      clearance: 'مەخپىي (SECRET)',
      radarCrossSection: 'N/A',
      ceiling: 'N/A'
    }
  },

  // 5. ئەسكىرىي ئىستىخبارات (Military Intelligence)
  {
    id: 'in-01',
    category: 'intelligence',
    title: {
      ug: 'سۈنئىي ھەمراھ كۆزىتىش دوكلاتى: دېڭىز بوغۇزلىرىدىكى فىلوت تەقسىماتى',
      ar: 'تقرير الاستخبارات الفضائية: رصد تحركات الأساطيل البحرية في المضائق الحيوية',
      en: 'Orbital Recon Dossier: Strategic Carrier Strike Group Deployments'
    },
    summary: {
      ug: 'ئېگىز بوشلۇقتىكى ئوپتىكىلىق ۋە رادارلىق سۈنئىي ھەمراھلار تەمىنلىگەن ئەڭ يېڭى دېڭىز قاتنىشى ۋە كۈچ ئورۇنلاشتۇرۇش تەھلىلى.',
      ar: 'تحليل دقيق للصور الملتقطة بالأقمار الاصطناعية ذات الدقة العالية يرصد تموضع حاملات الطائرات والغواصات في الممرات المائية الحيوية.',
      en: 'High-resolution synthetic aperture satellite imagery reveals realignment of aircraft carrier battle groups across critical maritime chokepoints.'
    },
    content: {
      ug: 'سۈنئىي ھەمراھ سۈرەتلىرى شۇنى كۆرسەتمەكتەكى، ئىستراتېگىيىلىك دېڭىز ئۆتكىلىدە 2 چوڭ ئاۋىئاماتكا زەربە بېرىش گۇرۇپپىسى ۋە 4 يادرو سۇئاستى پاراخوتى ئورۇنلاشتۇرۇلغان. قورال كۈچىنىڭ مەركەزلىشىش كۆرسەتكۈچى ئۆتكەن ئايدىكىدىن %40 ئاشقان بولۇپ، ئېلېكترونلۇق رادار ئاكتىپلىقى يۇقىرى چەككە يەتكەن.',
      ar: 'تظهر البيانات الفضائية إعادة انتشار لواءين بحريين مدعومين بغواصات نووية وفرقاطات صواريخ موجهة بالقرب من الممرات الاستراتيجية. ارتفع مؤشر التكثيف القتالي بنسبة 40% مقارنة بالشهر المنصرم، مع نشاط مكثف لأنظمة الرادار البحرية.',
      en: 'Satellite tracking identifies two nuclear carrier strike groups repositioned into defensive maritime escort lanes, supported by 4 fast-attack attack submarines. Electronic signal intercepts correlate with an emergency 40% surge in fleet alert posture.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    author: 'ئالەم ئىستىخبارات مەركىزى',
    date: '2026-09-18',
    status: 'published',
    featured: true,
    views: 3950,
    tags: ['Satellite Imagery', 'SIGINT', 'Naval Fleet', 'Intelligence'],
    specs: {
      speed: '7.8 km/s Orbital Velocity',
      range: 'Global Coverage',
      payload: '0.15m Optical Resolution',
      origin: 'يەرشارى مۇداپىئە كۆزىتىش مەركىزى',
      status: 'نەق مەيدان كۆزىتىشتە',
      clearance: 'دەرىجىدىن تاشقىرى مەخپىي (TOP-SECRET)',
      radarCrossSection: 'N/A',
      ceiling: '520 km (LEO)'
    }
  },
  {
    id: 'in-02',
    category: 'intelligence',
    title: {
      ug: 'ئېلېكترونلۇق ئۇرۇش (EW) سىگنال دوكلاتى: رادىئو كاشىلىلىرى ۋە كۈرەشچان ھالەت',
      ar: 'تقرير الحرب الإلكترونية: اعتراض وتحليل إشارات التشويش الراداري على الجبهات',
      en: 'Electronic Warfare SIGINT: Frontier Radar Jamming & Spectrum Dominance'
    },
    summary: {
      ug: 'شەرق رايونىدا كۆزىتىلگەن كەڭ بەلباغلىق GPS ۋە رادار كاشىلىلىرىنىڭ قەيەردىن كەلگەنلىكى ئېنىقلاندى.',
      ar: 'رصد تشويش إلكتروني واسع النطاق على أنظمة الملاحة وتحديد المواقع في المناطق الساحلية وتحديد مصادر الانبعاثات التكتيكية.',
      en: 'High-altitude electronic surveillance identifies multi-emitter wideband GPS denial transmitters disrupting military frequency bands.'
    },
    content: {
      ug: 'مەزكۇر ئىستىخبارات ھۆججىتىدە كۆرسىتىلىشىچە، يېقىنقى 48 سائەتتە چېگرا بويىدىكى كۆچمە ئېلېكترونلۇق ئۇرۇش ماشىنىلىرى 1.2 GHz تىن 5.8 GHz ئارىلىقىدىكى بارلىق خەۋەرلىشىش قاناللىرىنى تۇتۇش ۋە توسۇش مانېۋىرى ئېلىپ بارغان. مۇداپىئە قىسىملىرى ئوپتىك تالا ۋە سۈنئىي ھەمراھ كۋانت خەۋەرلىشىش لىنىيىسىگە كۆچكەن.',
      ar: 'يوضح التقرير تشغيل منظومات تشويش إلكتروني أرضية ثقيلة تسببت في حجب إشارات الأقمار الاصطناعية على نطاقات متعددة. تم توجيه القوات للتحول فوراً إلى قنوات الاتصال الليزري والألياف الأرضية المشفرة لمواجهة الاختراق.',
      en: 'Surveillance monitors localized heavy electronic denial complexes blanketing tactical frequencies. Friendly strike formations successfully transitioned to direct quantum optical links to circumvent localized spectrum degradation.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: 'ئېلېكترونلۇق جەڭ مەركىزى',
    date: '2026-09-13',
    status: 'published',
    featured: false,
    views: 2190,
    tags: ['SIGINT', 'Electronic Warfare', 'GPS Jamming'],
    specs: {
      speed: 'Real-time Signal Capture',
      range: '800 km Emitter Radius',
      payload: 'Wideband RF Interceptor Array',
      origin: 'ئىتتىپاقداش ئىستىخبارات تورى',
      status: 'تەھلىل تاماملاندى',
      clearance: 'مەخپىي (SECRET)',
      radarCrossSection: 'N/A',
      ceiling: 'N/A'
    }
  },

  // 6. سىياسىي تەھلىل (Geopolitical & Political Analysis)
  {
    id: 'geo-01',
    category: 'geopolitics',
    title: {
      ug: 'دۇنيا ئېنېرگىيە بوغۇزلىرىدىكى ھەربىي تەھدىت ۋە خەلقئارا كۈچ تىركىشىشى',
      ar: 'التوازن العسكري في المضائق البحرية: صراع القوى العظمى على ممرات الطاقة العالمية',
      en: 'Maritime Chokepoint Geopolitics: Great Power Rivalry & Sea Lane Defense'
    },
    summary: {
      ug: 'ھورمۇز، مالاككا ۋە بابۇلمەندەب بوغۇزلىرىدىكى ئەسكىرىي تەڭپۇڭلۇقنىڭ يەرشارى ئىقتىسادى ۋە دۇنيا بىخەتەرلىكىگە بولغان تەسىرى تەھلىل قىلىندى.',
      ar: 'قراءة استراتيجية في التوترات العسكرية بمضيق هرمز وباب المندب ومضيق ملقا وتأثيرها على منظومة الردع الدولية.',
      en: 'A deep strategic assessment of fleet posture across Hormuz, Malacca, and Bab el-Mandeb and its macroeconomic defense implications.'
    },
    content: {
      ug: 'دۇنيا نېفىتى ۋە تۈركۈملەپ يۆتكىلىدىغان ماللارنىڭ %60 ى ئۆتىدىغان بىر نەچچە تار دېڭىز بوغۇزى ھازىر چوڭ دۆلەتلەرنىڭ باشقۇرۇلىدىغان بومبا ۋە دېڭىز مىنالىرىنىڭ بىۋاسىتە زەربە دائىرىسى ئىچىگە كىرىپ قالدى. بۇ جايلاردىكى كىچىك بىر توقۇنۇشمۇ يەرشارى ئېنېرگىيە زەنجىرىنى پالەچ ھالەتكە چۈشۈرۈپ قويۇشى مۇمكىن. يېڭى ئىتتىپاقداشلىق كېلىشىملىرى پۈتۈن رايوننى كۆپ قۇتۇپلۇق مۇداپىئە ھالىتىگە مەجبۇرلىماقتا.',
      ar: 'يمر أكثر من 60% من إمدادات الطاقة العالمية عبر مضائق بحرية ضيقة باتت تقع بالكامل تحت مدى الصواريخ المضادة للسفن والطائرات المسيرة الانتحارية. أي احتكاك عسكري غير محسوب قد يؤدي إلى شلل سلاسل الإمداد العالمية. تتجه الدول الكبرى لتشكيل تحالفات أمن بحرية جديدة لإعادة فرض توازن الردع.',
      en: 'Over 60% of international hydrocarbon cargo transits through narrow maritime defiles now within overlapping anti-ship cruise missile arcs. A tactical escalation could destabilize global trade lifelines overnight, accelerating the formation of integrated littoral strike alliances.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    author: 'ئىستراتېگىيە ۋە خەلقئارا تەتقىقات تەھلىلچىسى',
    date: '2026-09-19',
    status: 'published',
    featured: true,
    views: 4560,
    tags: ['Geopolitics', 'Maritime Security', 'Straits', 'Global Strategy'],
    specs: {
      speed: 'Strategic Horizon 2026-2035',
      range: 'Global Maritime Chokepoints',
      payload: 'Macro Geopolitical Impact',
      origin: 'يەرشارى تەھلىل ئورگىنى',
      status: 'يۇقىرى تەھدىت باسقۇچىدا',
      clearance: 'ئاشكارا كەسپىي تەھلىل (DEEP-ANALYSIS)',
      radarCrossSection: 'N/A',
      ceiling: 'N/A'
    }
  },
  {
    id: 'geo-02',
    category: 'geopolitics',
    title: {
      ug: 'كۆپ قۇتۇپلۇق دۇنيا ۋە كەلگۈسى قوراللىنىش بەيگىسى: يېڭى مۇداپىئە مۆلچەرلىرى',
      ar: 'عصر التعددية القطبية وسباق التسلح الحديث: موازين القوى وإعادة رسم التحالفات',
      en: 'Multipolar Order & The New Arms Race: Projections for Global Defense Posture'
    },
    summary: {
      ug: 'دۇنيا دۆلەتلىرىنىڭ مۇداپىئە خامچوتىنىڭ تارىختىكى ئەڭ يۇقىرى چەككە يېتىشى ۋە ئەنئەنىۋى توختام تۈزۈملىرىنىڭ ئاجىزلىشىشى.',
      ar: 'دراسة جيوسياسية توثق تجاوز الإنفاق العسكري العالمي حاجز التريليونات دولار وانهيار معاهدات الحد من التسلح التقليدية.',
      en: 'A strategic study on worldwide military expenditures hitting all-time highs as cold-war non-proliferation frameworks dissolve.'
    },
    content: {
      ug: 'ئەڭ يېڭى خەلقئارا ئىستاتىستىكىلارغا قارىغاندا، 2026-يىلى يەرشارى ئومۇمىي ھەربىي چىقىمى 2.8 تىرىليون دوللاردىن ئېشىپ كەتكەن. ياۋروپا ۋە ئاسىيا دۆلەتلىرى قورال-ياراق سېتىۋېلىش ۋە سۈنئىي ئىدراكلىق ھەربىي سىستېمىلارنى قۇرۇشقا ئەڭ كۆپ خىراجەت ئاجراتماقتا. بۇ يېڭى قوراللىنىش بەيگىسى دۇنيانى تېخىمۇ جىددىي ۋەزىيەتكە سۆرەپ كىرمەكتە.',
      ar: 'تشير البيانات الدولية الموثقة إلى تخطي الإنفاق العسكري حاجز 2.8 تريليون دولار، مع تركيز الدول الكبرى على الاستثمار في أسلحة الذكاء الاصطناعي والصواريخ الانزلاقية والأنظمة غير المأهولة، مما يعيد تشكيل خارطة التحالفات العسكرية عالمياً.',
      en: 'Verified defense accounting registers international defense procurement expenditures topping $2.8 trillion. Major expenditures are heavily concentrating in autonomous swarms, counter-space capabilities, and autonomous tactical networks.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    author: 'خەلقئارا مۇداپىئە سىياسىتى تەتقىقاتچىسى',
    date: '2026-09-14',
    status: 'published',
    featured: false,
    views: 3180,
    tags: ['Defense Spending', 'Multipolarity', 'Arms Race', 'Strategy'],
    specs: {
      speed: 'Quarterly Re-evaluation',
      range: 'Worldwide Strategic Theaters',
      payload: '$2.8T Total Expenditure',
      origin: 'خەلقئارا تىنچلىق ۋە ھەربىي تەھلىل ئىنىستىتۇتى',
      status: 'تەستىقلانغان دوكلات',
      clearance: 'ئاشكارا ئانالىز (UNCLASSIFIED)',
      radarCrossSection: 'N/A',
      ceiling: 'N/A'
    }
  },

  // 7. خەۋەرلەر (Global Defense News)
  {
    id: 'nw-01',
    category: 'news',
    title: {
      ug: 'كۆپ دۆلەت ھاۋا ۋە دېڭىز قوشما مانېۋىرى: 300 ئايروپىلان بىر ۋاقىتتا پەرۋاز قىلدى',
      ar: 'مناورات درع الشمال المشتركة: تحليق متزامن لأكثر من 300 مقاتلة وقاذفة قنابل',
      en: 'Joint Allied Operation "Iron Shield": 300 Combat Aircraft Take Flight'
    },
    summary: {
      ug: 'دېڭىز ئۈستى ۋە ھاۋا جەڭلىرىنى تەقلىد قىلىپ ئېلىپ بېرىلغان بۇ يىلقى ئەڭ چوڭ كۆلەملىك تاكتىكىلىق بىر گەۋدە سىناق ھەرىكىتى.',
      ar: 'أضخم تمرين عسكري تكتيكي يحاكي التصدي لهجمات صاروخية واختراق دفاعات جوية معادية بمشاركة 14 دولة حليفة.',
      en: 'The largest multinational live-fire exercise of the year simulating contested air superiority and counter-hypersonic intercepts.'
    },
    content: {
      ug: 'بۈگۈن باشلانغان بىرلەشمە مانېۋىردا 5-ئەۋلاد سىتېلس كۈرەشچى ئايروپىلانلىرى، ئېلېكترونلۇق ئۇرۇش ئايروپىلانلىرى ۋە ھاۋادا ماي قاچىلاش سىستېمىلىرى بىر كۈن ئىچىدە 1200 دىن ئارتۇق تاكتىكىلىق ھۇجۇم نىشانىنى يوقىتىش سىنىقى ئېلىپ باردى. سىستېمىلارنىڭ سانلىق مەلۇمات ئۇلىنىشى سۈنئىي ئىدراك ئارقىلىق دەل ۋاقتىدا ماسلاشتۇرۇلدى.',
      ar: 'انطلقت اليوم أوسع مناورات عسكرية مشتركة تشهد مشاركة مقاتلات الجيل الخامس وطائرات التشويش الإلكتروني والفرقاطات الصاروخية، حيث نفذت أكثر من 1200 طلعة قتالية تدريبية على إصابة أهداف ساحلية متحركة بدقة متناهية.',
      en: 'Exercise Iron Shield mobilized 14 partner nations in coordinated multi-domain strike simulations. Over 1,200 sorties tested dynamic target handoffs between stealth fighters, autonomous loyal wingmen, and naval AEGIS missile batteries.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f0?auto=format&fit=crop&w=1200&q=80',
    author: 'ھەربىي خەۋەرلەر مەركىزىي ئاگېنتلىقى',
    date: '2026-09-20',
    status: 'published',
    featured: true,
    views: 6120,
    tags: ['Military Drill', 'Air Combat', 'Joint Exercise', 'Live Fire'],
    specs: {
      speed: 'Joint Exercise Speed',
      range: '2,500 km Exercise Theater',
      payload: '300 Combat Airframes',
      origin: 'شىمالىي ئاتلانتىك ئىتتىپاقى قوشۇنلىرى',
      status: 'نەق مەيداندا ئېلىپ بېرىلماقتا',
      clearance: 'ئاشكارا ئاخبارات (PUBLIC-RELEASE)',
      radarCrossSection: 'N/A',
      ceiling: '18,000 m'
    }
  },
  {
    id: 'nw-02',
    category: 'news',
    title: {
      ug: 'يېڭى بىر ئەۋلاد تىك ئۇچار ئايروپىلان FLRAA تۇنجى قېتىم خىزمەتكە تاپشۇرۇلدى',
      ar: 'تسليم أول دفعة من مروحيات الهجوم السريع FLRAA ذات المراوح المائلة للجيش',
      en: 'First Operational Squadron of FLRAA Tilt-Rotor Assault Craft Delivered'
    },
    summary: {
      ug: 'سائىتىگە 520 كىلومېتىر ئۇچىدىغان ۋە ئەنئەنىۋى تىك ئۇچارلاردىن ئىككى ھەسسە تېز ھەرىكەتلىنىدىغان تېلېۋىزيون ئايروپىلانى.',
      ar: 'تتميز بسرعة تتجاوز 520 كم/ساعة ومدى عملياتي مضاعف مقارنة بطائرات الهليكوبتر التقليدية لنقل القوات الخاصة.',
      en: 'Operating at cruise speeds exceeding 520 km/h with twice the combat radius of legacy utility helicopters for rapid insertion.'
    },
    content: {
      ug: 'FLRAA تىپلىق يانتۇ قاناتلىق تىك ئۇچارلار ئەنئەنىۋى Black Hawk قىسىملىرىنىڭ ئورنىنى ئېلىش ئۈچۈن لايىھىلەنگەن. پۈتۈنلەي رەقەملىك كابىنكا، سۈنئىي ئىدراكلىق ئۇچۇش ياردەمچىسى ۋە زەربىگە چىداملىق ساۋۇت سەپلەنگەن.',
      ar: 'صممت المروحية الجديدة لتحل محل أساطيل المروحيات السابقة، حيث تجمع بين الإقلاع العمودي والسرعة الفائقة للطائرات النفاثة. مزودة بمقصورة قيادة رقمية بالكامل ودروع باليستية خفيفة الوزن ومقاعد تمتص الصدمات.',
      en: 'The Future Long-Range Assault Aircraft (FLRAA) introduces next-gen tiltrotor aerodynamics, delivering frontline assault forces directly into hot drop zones at twice the speed and operational radius of legacy helicopters.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    author: 'مۇداپىئە سانائەت خەۋەرچىسى',
    date: '2026-09-17',
    status: 'published',
    featured: false,
    views: 3410,
    tags: ['FLRAA', 'Tilt-Rotor', 'Helicopter', 'Aviation'],
    specs: {
      speed: '520 km/h Cruise',
      range: '4,500 km Ferry Range',
      payload: '14 Fully-Equipped Troops',
      origin: 'قوراللىق قىسىملار ئاۋىئاتسىيەسى',
      status: 'خىزمەتكە تاپشۇرۇلدى',
      clearance: 'ئاشكارا (PUBLIC)',
      radarCrossSection: '0.8 m²',
      ceiling: '7,600 m'
    }
  },

  // 8. مەلۇمات ئامبىرى (Arsenal Wiki & Specs Database)
  {
    id: 'db-01',
    category: 'database',
    title: {
      ug: '5-ئەۋلاد ۋە 6-ئەۋلاد سىتېلس كۈرەشچى ئايروپىلانلار ئۆلچەم كۈتۈپخانىسى',
      ar: 'موسوعة مقاتلات الجيل الخامس والسادس الشبحية: المواصفات والقدرات القتالية',
      en: 'Next-Gen Stealth Fighter Matrix: 5th & 6th Generation Technical Database'
    },
    summary: {
      ug: 'F-22, F-35, J-20, Su-57 ۋە NGAD سىستېمىلىرىنىڭ رادار ئەكس ئېتىش كۆرسەتكۈچى (RCS)، يۈك سىغىمى ۋە تېزلىك ئۆلچەملىرى.',
      ar: 'مقارنة تكتيكية شاملة بين مقاتلات التفوق الجوي العالمية تشمل البصمة الرادارية، المدى القتالي وأنظمة الرادار.',
      en: 'Standardized performance matrix compiling verified RCS signatures, internal payload fractions, and thrust-to-weight ratios.'
    },
    content: {
      ug: 'بۇ مەلۇمات ئامبىرىدا زامانىۋى كۈرەشچى ئايروپىلانلارنىڭ بارلىق تېخنىكىلىق پارامېتىرلىرى ئۆلچەملەشتۈرۈلگەن. رادار كېسىشمە يۈزى (RCS)، دەرىجىدىن تاشقىرى ئاۋاز تېزلىكىدە پەرۋاز قىلىش (Supercruise) ئىقتىدارى، ئىچكى بومبا بۆلۈمى سىغىمى ۋە تورلاشقان جەڭ سىستېمىسى تەپسىلىي باھالانغان.',
      ar: 'توفر هذه الموسوعة مرجعاً معيارياً لجميع الخصائص التقنية للمقاتلات الحديثة، من مساحات المقطع الراداري، وقدرة الطيران الفائق دون حراقات لاحقة، وسعة غرف الأسلحة الداخلية، وتوافق الاتصال التكتيكي المشترك.',
      en: 'A rigorously maintained technical database outlining verified engineering benchmarks across air-dominance platforms. Includes internal weapon bay loadouts, IRST optical engagement envelopes, and low-probability-of-intercept datalinks.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    author: 'ئاۋىئاتسىيە ئۆلچەم كومىتېتى',
    date: '2026-09-19',
    status: 'published',
    featured: true,
    views: 7420,
    tags: ['Fighter Jets', 'Stealth RCS', 'Arsenal Wiki', 'Database'],
    specs: {
      speed: 'Mach 2.25 Supercruise',
      range: '3,200 km Ferry',
      payload: '8 Internal Air-to-Air Missiles',
      origin: 'خەلقئارا ئاۋىئاتسىيە ئامبىرى',
      status: 'ئاكتىپ كۈتۈپخانا',
      clearance: 'ئۆلچەملىك مەلۇمات (PUBLIC-SPECS)',
      radarCrossSection: '0.0001 m²',
      ceiling: '20,000 m'
    }
  },
  {
    id: 'db-02',
    category: 'database',
    title: {
      ug: 'يادرو سۇئاستى پاراخوتلىرى ۋە ئاتوم ئاۋىئاماتكىلىرى تېخنىكىلىق جەدۋىلى',
      ar: 'قاعدة بيانات الغواصات النووية الهجومية وحاملات الطائرات الاستراتيجية',
      en: 'Nuclear Attack Submarine & Supercarrier Naval Specs Index'
    },
    summary: {
      ug: 'ئوكيان فىلوتلىرىنىڭ سۇ ئاستى چوڭقۇرلۇقى، يادرو رېئاكتورى قۇۋۋىتى ۋە بومبا سىستېمىلىرىنىڭ ئۆلچەم ئۇچۇرلىرى.',
      ar: 'سجل تكتيكي مفصل لمواصفات الغواصات النووية من فئات كولومبيا وفرجينيا وياسين وحاملات الطائرات من فئة فورد.',
      en: 'Technical encyclopedia indexing acoustic quieting decibel levels, nuclear core lifespan, and vertical launch cell capacities.'
    },
    content: {
      ug: 'دېڭىز ئاستى ئىستراتېگىيىلىك قوراللىرىنىڭ ئاۋاز چىقىرىش دەرىجىسى (Decibels)، سۇ ئاستىدا تۇرۇش ۋاقتى ۋە سۇ كۆتۈرۈش ئېغىرلىقىنى تەپسىلىي ئىزدەش سىستېمىسى. فىلوت مۇداپىئە قالقانلىرى ۋە سۇئاستى رادار (Sonar) سېنزورلىرىنىڭ سەپلەنمىسى تولۇق كىرگۈزۈلگەن.',
      ar: 'دليل تكتيكي يغطي مستويات الهدوء الصوتي تحت الماء، والمفاعلات النووية التي تعمل لعقود دون إعادة تزويد بالوقود، وأنظمة السونار المجرورة، وخلايا الإطلاق العمودي للصواريخ المجنحة والباليستية.',
      en: 'The definitive naval encyclopedia cross-referencing acoustic signature reduction metrics, electromagnetic aircraft launch systems (EMALS), and submerged displacement tonnages for modern global blue-water navies.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    author: 'دېڭىز ئارمىيە ئۆلچەم تەھرىراتى',
    date: '2026-09-15',
    status: 'published',
    featured: false,
    views: 4890,
    tags: ['Submarine', 'Supercarrier', 'Naval Specs', 'Nuclear'],
    specs: {
      speed: '33+ Knots Submerged',
      range: 'Unlimited (30-Year Reactor)',
      payload: '154 Tomahawk VLS Cells',
      origin: 'يەرشارى دېڭىز ئارمىيە ئارخىپى',
      status: 'دائىم كېڭىيىۋاتىدۇ',
      clearance: 'ئۆلچەملىك مەلۇمات (PUBLIC-SPECS)',
      radarCrossSection: 'N/A (Submerged)',
      ceiling: 'Test Depth > 450 m'
    }
  }
];
