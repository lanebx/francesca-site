import { LocalizedText } from './artwork.model';

export type ExhibitionMediaKind =
  | 'artwork'
  | 'installation'
  | 'poster'
  | 'press'
  | 'publication';

export interface ExhibitionMedia {
  alt: LocalizedText;
  caption?: LocalizedText;
  kind: ExhibitionMediaKind;
  src: string;
}

export interface ExhibitionPublication {
  date?: string;
  href: string;
  source: LocalizedText;
  title: LocalizedText;
  type: 'article' | 'catalogue' | 'pdf' | 'scan' | 'video' | 'website';
}

export interface Exhibition {
  city: LocalizedText;
  country: LocalizedText;
  dates: LocalizedText;
  description: LocalizedText;
  details?: LocalizedText[];
  featured?: boolean;
  media: ExhibitionMedia[];
  publications?: ExhibitionPublication[];
  slug: string;
  status?: LocalizedText;
  title: LocalizedText;
  type: LocalizedText;
  venue: LocalizedText;
  year: string;
}
