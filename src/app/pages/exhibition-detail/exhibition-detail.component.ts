import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  EXHIBITIONS,
  exhibitionPlace,
  exhibitionTitle,
} from '../../core/data/exhibitions';
import { SiteLanguage } from '../../core/models/artwork.model';

@Component({
  selector: 'app-exhibition-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exhibition-detail.component.html',
  styleUrl: './exhibition-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionDetailComponent {
  readonly exhibitionPlace = exhibitionPlace;
  readonly exhibitionTitle = exhibitionTitle;
  readonly exhibitionSlug = signal('');
  readonly language = signal<SiteLanguage>('en');
  readonly totalExhibitions = EXHIBITIONS.length;

  readonly exhibition = computed(
    () =>
      EXHIBITIONS.find((item) => item.slug === this.exhibitionSlug()) ?? null,
  );

  readonly exhibitionIndex = computed(() =>
    EXHIBITIONS.findIndex((item) => item.slug === this.exhibitionSlug()),
  );

  readonly previousExhibition = computed(() => {
    const index = this.exhibitionIndex();
    return index > 0
      ? EXHIBITIONS[index - 1]
      : EXHIBITIONS[EXHIBITIONS.length - 1];
  });

  readonly nextExhibition = computed(() => {
    const index = this.exhibitionIndex();
    return index >= 0 && index < EXHIBITIONS.length - 1
      ? EXHIBITIONS[index + 1]
      : EXHIBITIONS[0];
  });

  readonly copy = {
    en: {
      about: 'About the exhibition',
      back: 'All exhibitions',
      date: 'Dates',
      location: 'Location',
      media: 'Archive materials',
      next: 'Next exhibition',
      noImage: 'No surviving image located',
      previous: 'Previous exhibition',
      publications: 'Sources and publications',
      type: 'Format',
      unavailable: 'Exhibition not found',
      unavailableCta: 'Return to exhibitions',
      venue: 'Venue',
      viewDocument: 'View document',
    },
    fr: {
      about: 'À propos de l’exposition',
      back: 'Toutes les expositions',
      date: 'Dates',
      location: 'Lieu',
      media: 'Documents d’archive',
      next: 'Exposition suivante',
      noImage: 'Aucune image conservée retrouvée',
      previous: 'Exposition précédente',
      publications: 'Sources et publications',
      type: 'Format',
      unavailable: 'Exposition introuvable',
      unavailableCta: 'Retour aux expositions',
      venue: 'Espace',
      viewDocument: 'Voir le document',
    },
    ko: {
      about: '전시 소개',
      back: '모든 전시',
      date: '기간',
      location: '지역',
      media: '아카이브 자료',
      next: '다음 전시',
      noImage: '보존된 이미지를 찾지 못했습니다',
      previous: '이전 전시',
      publications: '출처 및 출판물',
      type: '형식',
      unavailable: '전시를 찾을 수 없습니다',
      unavailableCta: '전시 목록으로 돌아가기',
      venue: '장소',
      viewDocument: '문서 보기',
    },
  } as const;

  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.exhibitionSlug.set(params.get('slug') ?? '');
        window.scrollTo(0, 0);
      });

    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
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
}
