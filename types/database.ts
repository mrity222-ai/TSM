export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  key_takeaways: string[];
  content: string;
  category_id: string | null;
  author_name: string;
  author_role?: string | null;
  is_featured?: boolean;
  featured_image: string | null;
  image_alt: string | null;
  entity_tags?: string[];
  source_citation: string | null;
  direct_answer?: string | null;
  faqs: FaqItem[];
  focus_keyword?: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url?: string | null;
  affiliate_title?: string | null;
  affiliate_url?: string | null;
  affiliate_cta?: string | null;
  status: 'draft' | 'published';
  views: number;
  published_at: string | null;
  updated_at: string;
  created_at: string;
  categories?: Category;
}

export interface AdSlot {
  id: string;
  slot_key: string;
  slot_label: string;
  ad_type: 'adsense' | 'inhouse_banner' | 'affiliate_card';
  ad_size?: string;
  code_or_title: string | null;
  description: string | null;
  bullet_points?: string[];
  image_url: string | null;
  target_url: string | null;
  cta_text: string;
  is_active: boolean;
}

export interface NavItem {
  id: string;
  section_type: 'navbar' | 'tools';
  label: string;
  href: string;
  badge_text?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}
