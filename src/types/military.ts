export type Language = 'ug' | 'ar' | 'en';

export type ThemeId = 'cyber-teal' | 'black-ops' | 'combat-alert' | 'desert-recon';

export type DisplayMode = 'dark' | 'light';

export type CategoryKey = 
  | 'weapons'
  | 'drones'
  | 'projects'
  | 'ai_military'
  | 'intelligence'
  | 'geopolitics'
  | 'news'
  | 'database'
  | 'naval'
  | 'aviation'
  | (string & {});

export type ArticleStatus = 'published' | 'pending' | 'rejected';

export interface WeaponSpecs {
  speed: string;
  range: string;
  payload: string;
  origin: string;
  status: string;
  clearance: string;
  radarCrossSection?: string;
  ceiling?: string;
}

export interface MultilingualText {
  ug: string;
  ar: string;
  en: string;
}

export interface Article {
  id: string;
  category: CategoryKey;
  title: MultilingualText;
  summary: MultilingualText;
  content: MultilingualText;
  imageUrl: string;
  author: string;
  date: string;
  status: ArticleStatus;
  featured: boolean;
  specs: WeaponSpecs;
  tags: string[];
  views: number;
}

export interface CategoryInfo {
  key: CategoryKey;
  name: MultilingualText;
  description: MultilingualText;
  iconName: string;
  code: string;
}

export interface SiteSettings {
  siteName: MultilingualText;
  siteSlogan: MultilingualText;
  tickerText: MultilingualText;
  activeDefcon: number;
  contactEmail: string;
  classificationText: MultilingualText;
  autoApproveArticles: boolean;
}
