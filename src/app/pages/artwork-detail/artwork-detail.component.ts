import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ARTWORKS, artworkTitle } from '../../core/data/artworks';
import { SiteLanguage } from '../../core/models/artwork.model';

interface ArtworkView {
  label: 'Artwork' | 'Detail' | 'Framed' | 'In situ';
  src: string;
}

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './artwork-detail.component.html',
  styleUrl: './artwork-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtworkDetailComponent {
  readonly artworkTitle = artworkTitle;
  readonly activeView = signal(0);
  readonly artworkSlug = signal('');
  readonly fromHome = signal(false);
  readonly language = signal<SiteLanguage>('en');
  readonly totalWorks = ARTWORKS.length;

  readonly artwork = computed(
    () => ARTWORKS.find((item) => item.slug === this.artworkSlug()) ?? null,
  );

  readonly artworkIndex = computed(() =>
    ARTWORKS.findIndex((item) => item.slug === this.artworkSlug()),
  );

  readonly previousArtwork = computed(() => {
    const index = this.artworkIndex();
    return index > 0 ? ARTWORKS[index - 1] : ARTWORKS[ARTWORKS.length - 1];
  });

  readonly nextArtwork = computed(() => {
    const index = this.artworkIndex();
    return index >= 0 && index < ARTWORKS.length - 1
      ? ARTWORKS[index + 1]
      : ARTWORKS[0];
  });

  readonly views = computed<ArtworkView[]>(() => {
    const artwork = this.artwork();
    if (!artwork) {
      return [];
    }

    const result: ArtworkView[] = [
      { label: 'Artwork', src: artwork.views.artwork },
    ];

    if (artwork.views.framed) {
      result.push({ label: 'Framed', src: artwork.views.framed });
    }

    if (artwork.views.inSitu) {
      result.push({ label: 'In situ', src: artwork.views.inSitu });
    }

    artwork.views.detail?.forEach((src) =>
      result.push({ label: 'Detail', src }),
    );

    return result;
  });

  readonly copy = {
    en: {
      about: 'About this work',
      back: 'All works',
      backHome: 'Back to home',
      category: 'Series',
      detail: 'Detail',
      inquire: 'Inquire about this work',
      medium: 'Medium',
      next: 'Next',
      previous: 'Previous',
      unavailable: 'Artwork not found',
      unavailableCta: 'Return to works',
      year: 'Year',
    },
    fr: {
      about: 'À propos de cette œuvre',
      back: 'Toutes les œuvres',
      backHome: 'Retour à l’accueil',
      category: 'Série',
      detail: 'Détail',
      inquire: 'Demander des informations',
      medium: 'Technique',
      next: 'Suivante',
      previous: 'Précédente',
      unavailable: 'Œuvre introuvable',
      unavailableCta: 'Retour aux œuvres',
      year: 'Année',
    },
    ko: {
      about: '작품 소개',
      back: '모든 작품',
      backHome: '홈으로 돌아가기',
      category: '연작',
      detail: '세부',
      inquire: '작품 문의',
      medium: '재료',
      next: '다음',
      previous: '이전',
      unavailable: '작품을 찾을 수 없습니다',
      unavailableCta: '작품으로 돌아가기',
      year: '연도',
    },
  } as const;

  private readonly destroyRef = inject(DestroyRef);
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);
  private pointerStart = 0;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.artworkSlug.set(params.get('slug') ?? '');
        this.activeView.set(0);
        window.scrollTo(0, 0);
      });

    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.fromHome.set(params.get('from') === 'home');
        const language = params.get('lang');
        if (language === 'en' || language === 'fr' || language === 'ko') {
          this.setLanguage(language);
        }
      });
  }

  setLanguage(language: SiteLanguage): void {
    this.language.set(language);
    document.documentElement.lang = language;
  }

  returnToHome(): void {
    this.location.back();
  }

  setView(index: number): void {
    if (index >= 0 && index < this.views().length) {
      this.activeView.set(index);
    }
  }

  previousView(): void {
    const count = this.views().length;
    if (count > 1) {
      this.activeView.update((index) => (index - 1 + count) % count);
    }
  }

  nextView(): void {
    const count = this.views().length;
    if (count > 1) {
      this.activeView.update((index) => (index + 1) % count);
    }
  }

  onPointerDown(event: PointerEvent): void {
    this.pointerStart = event.clientX;
  }

  onPointerUp(event: PointerEvent): void {
    const movement = event.clientX - this.pointerStart;
    if (Math.abs(movement) < 44) {
      return;
    }

    movement < 0 ? this.nextView() : this.previousView();
  }

  categoryLabel(category: string): string {
    const labels = {
      'ash-memory': {
        en: 'Ash & Memory',
        fr: 'Cendre & Mémoire',
        ko: '재와 기억',
      },
      'peace-hope': {
        en: 'Peace & Hope',
        fr: 'Paix & Espoir',
        ko: '평화와 희망',
      },
      'twin-but-twin': {
        en: 'Twin but Twin',
        fr: 'Twin but Twin',
        ko: 'Twin but Twin',
      },
      installations: {
        en: 'Installations',
        fr: 'Installations',
        ko: '설치',
      },
    } as const;

    return (
      labels[category as keyof typeof labels]?.[this.language()] ?? category
    );
  }
}
