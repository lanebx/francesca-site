import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  QueryList,
  ViewChildren,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  ARTWORK_FILTERS,
  ARTWORKS,
  artworkTitle,
} from '../../core/data/artworks';
import {
  Artwork,
  ArtworkCategory,
  SiteLanguage,
} from '../../core/models/artwork.model';

type FilterId = 'all' | ArtworkCategory;

interface GalleryItem {
  artwork: Artwork;
  index: number;
}

interface GalleryBlock {
  id: string;
  items: GalleryItem[];
  kind: 'pair' | 'solo';
  variant: number;
}

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksComponent implements AfterViewInit {
  readonly artworkTitle = artworkTitle;
  @ViewChildren('scene', { read: ElementRef })
  private readonly scenes!: QueryList<ElementRef<HTMLElement>>;

  readonly activeFilter = signal<FilterId>('all');
  readonly filtering = signal(false);
  readonly filters = ARTWORK_FILTERS;
  readonly language = signal<SiteLanguage>('en');
  readonly menuOpen = signal(false);
  readonly works = ARTWORKS;

  readonly filteredWorks = computed(() => {
    const filter = this.activeFilter();

    return filter === 'all'
      ? this.works
      : this.works.filter((artwork) => artwork.category === filter);
  });

  readonly galleryBlocks = computed<GalleryBlock[]>(() => {
    const works = this.filteredWorks();
    const blockSizes = [1, 2, 2, 1];
    const blocks: GalleryBlock[] = [];
    let artworkIndex = 0;
    let blockIndex = 0;

    while (artworkIndex < works.length) {
      const size = blockSizes[blockIndex % blockSizes.length];
      const items = works
        .slice(artworkIndex, artworkIndex + size)
        .map((artwork, offset) => ({
          artwork,
          index: artworkIndex + offset,
        }));

      blocks.push({
        id: items.map((item) => item.artwork.slug).join('--'),
        items,
        kind: items.length === 1 ? 'solo' : 'pair',
        variant: blockIndex % blockSizes.length,
      });

      artworkIndex += items.length;
      blockIndex += 1;
    }

    return blocks;
  });

  readonly copy = {
    en: {
      back: 'Francesca Cho',
      biography: 'Biography',
      contact: 'Contact',
      count: 'works in view',
      critics: 'Critics',
      exhibitions: 'Exhibitions',
      intro:
        'A slow encounter with painting, ash and memory. Scroll without hurry.',
      open: 'View work',
      publications: 'Publications',
      title: 'Works',
    },
    fr: {
      back: 'Francesca Cho',
      biography: 'Biographie',
      contact: 'Contact',
      count: 'œuvres affichées',
      critics: 'Critiques',
      exhibitions: 'Expositions',
      intro:
        'Une rencontre lente avec la peinture, la cendre et la mémoire. Prenez le temps de regarder.',
      open: 'Voir l’œuvre',
      publications: 'Publications',
      title: 'Œuvres',
    },
    ko: {
      back: '조 프란체스카',
      biography: '작가 소개',
      contact: '문의',
      count: '개의 작품',
      critics: '비평',
      exhibitions: '전시',
      intro:
        '회화와 재, 기억을 천천히 마주하는 시간입니다. 서두르지 말고 감상하세요.',
      open: '작품 보기',
      publications: '출판물',
      title: '작품',
    },
  } as const;

  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private observer?: IntersectionObserver;
  private filterTimer?: number;

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const language = params.get('lang');
        if (language === 'en' || language === 'fr' || language === 'ko') {
          this.setLanguage(language);
        }
      });
  }

  ngAfterViewInit(): void {
    this.observeScenes();
    this.scenes.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.observeScenes());

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
      if (this.filterTimer) {
        window.clearTimeout(this.filterTimer);
      }
    });
  }

  setFilter(filter: FilterId): void {
    if (filter === this.activeFilter() || this.filtering()) {
      return;
    }

    this.filtering.set(true);
    this.filterTimer = window.setTimeout(() => {
      this.activeFilter.set(filter);
      const gallery = document.querySelector<HTMLElement>('.works-gallery');
      window.scrollTo({
        top: Math.max((gallery?.offsetTop ?? 0) - 132, 0),
        behavior: 'smooth',
      });

      requestAnimationFrame(() => this.filtering.set(false));
    }, 220);
  }

  setLanguage(language: SiteLanguage): void {
    this.language.set(language);
    document.documentElement.lang = language;
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private observeScenes(): void {
    this.observer?.disconnect();

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.scenes.forEach((scene) =>
        scene.nativeElement.classList.add('is-visible'),
      );
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '-8% 0px -12%',
        threshold: 0.18,
      },
    );

    this.scenes.forEach((scene) => this.observer?.observe(scene.nativeElement));
  }
}
