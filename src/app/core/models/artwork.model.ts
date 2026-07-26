export type ArtworkCategory =
  | 'ash-memory'
  | 'peace-hope'
  | 'twin-but-twin'
  | 'installations';

export type ArtworkPresentation = 'center' | 'left' | 'right' | 'wide';

export type SiteLanguage = 'en' | 'fr' | 'ko';

export type LocalizedText = Record<SiteLanguage, string>;

export interface ArtworkViews {
  artwork: string;
  detail?: string[];
  framed?: string;
  inSitu?: string;
}

export interface Artwork {
  category: ArtworkCategory;
  description: LocalizedText;
  dimensions: string;
  galleryMatte?: boolean;
  medium: LocalizedText;
  mobileGalleryCrop?: boolean;
  presentation: ArtworkPresentation;
  slug: string;
  title: string;
  views: ArtworkViews;
  year: string;
}

export interface ArtworkFilter {
  id: 'all' | ArtworkCategory;
  label: LocalizedText;
}
