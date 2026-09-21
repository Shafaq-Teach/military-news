import { CategoryInfo } from '../types/military';

export const CATEGORIES: CategoryInfo[] = [
  {
    key: 'weapons',
    code: 'SEC-01',
    iconName: 'Crosshair',
    name: {
      ug: 'ئەڭ يېڭى قوراللار',
      ar: 'أحدث الأسلحة والأنظمة',
      en: 'Advanced Weaponry'
    },
    description: {
      ug: 'يۇقىرى ئاۋاز تېزلىكىدىكى باشقۇرۇلىدىغان بومبا، لازېرلىق قورال ۋە ئېلېكتر ماگنىت زەمبىرەكلىرى',
      ar: 'صواريخ فرط صوتية، أسلحة طاقة موجهة ودروع متطورة',
      en: 'Hypersonic missiles, directed energy systems, and kinetic defense'
    }
  },
  {
    key: 'drones',
    code: 'SEC-02',
    iconName: 'Plane',
    name: {
      ug: 'دىرونلار ۋە ئۇچقۇچىسىز سىستېمىلار',
      ar: 'الطائرات المسيرة والدرونات',
      en: 'Drones & UAV Systems'
    },
    description: {
      ug: 'ئۆزلۈكىدىن جەڭ قىلغۇچى قوشۇن دىرونلار، ئىستىخبارات ۋە يىراق پەرۋاز قىلغۇچى ئاپپاراتلار',
      ar: 'أسراب طائرات مسيرة ذاتية التحكم ومنظومات المراقبة الجوية',
      en: 'Autonomous drone swarms, stealth UAVs and loitering munitions'
    }
  },
  {
    key: 'projects',
    code: 'SEC-03',
    iconName: 'Atom',
    name: {
      ug: 'تەتقىق قىلىۋاتقان تۈرلەر',
      ar: 'مشاريع سرية قيد التطوير',
      en: 'Defense R&D Projects'
    },
    description: {
      ug: 'كەلگۈسى ئۇرۇش تېخنىكىلىرى، كۋانت رادار، تاشقى سۆڭەك ساۋۇتلىرى ۋە مەخپىي پىلانلار',
      ar: 'مشاريع عسكرية مستقبلية، رادارات كمومية وهياكل خارجية مقاتلة',
      en: 'Black projects, quantum radar, exoskeleton combat suits and DARPA initiatives'
    }
  },
  {
    key: 'ai_military',
    code: 'SEC-04',
    iconName: 'Cpu',
    name: {
      ug: 'سۈنئىي ئىدراك ۋە ئەسكىرىي ساھە',
      ar: 'الذكاء الاصطناعي العسكري',
      en: 'AI & Military Tech'
    },
    description: {
      ug: 'سۈنئىي ئىدراك ئارقىلىق تاكتىكىلىق قوماندانلىق قىلىش (C4ISR) ۋە كىبېر مۇداپىئە سىستېمىسى',
      ar: 'أنظمة القيادة المؤتمتة، الرؤية الحاسوبية القتالية والدفاع السيبراني',
      en: 'Algorithmic warfare, neural targeting, C4ISR automation and cyber defenses'
    }
  },
  {
    key: 'intelligence',
    code: 'SEC-05',
    iconName: 'Radio',
    name: {
      ug: 'ئەسكىرىي ئىستىخبارات',
      ar: 'الاستخبارات العسكرية والتحليل',
      en: 'Military Intelligence'
    },
    description: {
      ug: 'سۈنئىي ھەمراھ كۆزىتىش كۆرسەتكۈچلىرى، ئېلېكترونلۇق جەڭ (EW) ۋە تاكتىكىلىق جاسۇسلۇق',
      ar: 'تحليل صور الأقمار الاصطناعية، الحرب الإلكترونية واعتراض الإشارات',
      en: 'Satellite reconnaissance, geospatial SIGINT, and electronic warfare'
    }
  },
  {
    key: 'geopolitics',
    code: 'SEC-06',
    iconName: 'Globe',
    name: {
      ug: 'سىياسىي تەھلىل',
      ar: 'التحليل الجيوسياسي والاستراتيجي',
      en: 'Geopolitical Analysis'
    },
    description: {
      ug: 'يەرشارى تەھدىت ۋە كرىزىس رايونلىرى، دېڭىز بوغۇزلىرى ۋە خەلقئارا كۈچ تەڭپۇڭلۇقى تەھلىلى',
      ar: 'تحليلات النزاعات الإقليمية، الممرات البحرية وتوازنات القوى العالمية',
      en: 'Strait security, maritime choke points, defense alliances and global conflict trends'
    }
  },
  {
    key: 'news',
    code: 'SEC-07',
    iconName: 'ShieldAlert',
    name: {
      ug: 'دۇنيا ھەربىي خەۋەرلىرى',
      ar: 'أخبار الدفاع والأمن الدولية',
      en: 'Global Defense News'
    },
    description: {
      ug: 'مۇداپىئە خامچوتى، قورال زاكاز كېلىشىملىرى ۋە كۆپ دۆلەت قوشما مانېۋىر ئۇچۇرلىرى',
      ar: 'صفقات التسلح، ميزانيات الجيوش والمناورات التكتيكية المشتركة',
      en: 'Arms acquisitions, defense procurement budgets and joint multinational drills'
    }
  },
  {
    key: 'database',
    code: 'SEC-08',
    iconName: 'Database',
    name: {
      ug: 'مەلۇمات ئامبىرى (Arsenal Wiki)',
      ar: 'قاعدة البيانات وموسوعة العتاد',
      en: 'Defense Knowledgebase'
    },
    description: {
      ug: '5-ئەۋلاد ئايروپىلانلار، فىلوتلار ۋە قورال سىستېمىلىرىنىڭ تەپسىلىي ئۆلچەم جەدۋىلى',
      ar: 'مواصفات تكتيكية تفصيلية للطائرات الشبحية، الغواصات والأنظمة الدفاعية',
      en: 'Standardized tactical specifications wiki for aircraft, naval assets, and armor'
    }
  },
  {
    key: 'naval',
    code: 'SEC-09',
    iconName: 'Compass',
    name: {
      ug: 'دېڭىز ئارمىيىسى ۋە سۇ ئاستى پاراخوتلىرى',
      ar: 'القوات البحرية والغواصات',
      en: 'Naval & Submarine Fleet'
    },
    description: {
      ug: 'سۇ ئاستى يادرو پاراخوتلىرى، ئاۋىئاماتكىلار ۋە دېڭىز ئۇرۇشى ئىستراتېگىيىسى',
      ar: 'الغواصات النووية، حاملات الطائرات واستراتيجيات الردع البحري',
      en: 'Nuclear attack submarines, aircraft carriers and naval warfare strategy'
    }
  },
  {
    key: 'aviation',
    code: 'SEC-10',
    iconName: 'Plane',
    name: {
      ug: 'ھەربىي ئاۋىئاتسىيە ۋە پەرۋاز سىستېمىلىرى',
      ar: 'الطيران الحربي وأنظمة القتال الجوي',
      en: 'Military Aviation & Air Supremacy'
    },
    description: {
      ug: '5-ئەۋلاد ۋە 6-ئەۋلاد جەڭچى ئايروپىلانلار، بومباردىمانچىلار ۋە ئېلېكترونلۇق جەڭ ئايروپىلانلىرى',
      ar: 'مقاتلات الجيل الخامس والسادس وقاذفات القنابل الاستراتيجية',
      en: 'Next-gen fighters, stealth bombers and air dominance platforms'
    }
  }
];
