import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  EXHIBITIONS,
  FEATURED_EXHIBITIONS,
  exhibitionPlace,
  exhibitionTitle,
} from '../../core/data/exhibitions';
import { Exhibition } from '../../core/models/exhibition.model';
import { SiteLanguage } from '../../core/models/artwork.model';

@Component({
  selector: 'app-exhibitions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exhibitions.component.html',
  styleUrl: './exhibitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionsComponent implements AfterViewInit {
  @ViewChildren('scene', { read: ElementRef })
  private readonly scenes!: QueryList<ElementRef<HTMLElement>>;

  readonly exhibitionPlace = exhibitionPlace;
  readonly exhibitionTitle = exhibitionTitle;
  readonly exhibitions = EXHIBITIONS;
  readonly featuredExhibitions = FEATURED_EXHIBITIONS;
  readonly archiveYears = [...new Set(EXHIBITIONS.map((item) => item.year))];
  readonly language = signal<SiteLanguage>('en');
  readonly menuOpen = signal(false);

  readonly copy = {
    en: {
      biography: 'Biography',
      contact: 'Contact',
      count: 'exhibitions',
      critics: 'Critics',
      intro:
        'A researched chronology of exhibitions, performances, open studios and surviving archival documents from 1997 to the present.',
      archive: 'Complete archive',
      archiveLink: 'Browse the complete archive',
      archiveIntro:
        'Every record links to a dedicated page with the material currently available: photographs, programme pages, catalogues and source links.',
      open: 'View exhibition',
      publications: 'Publications',
      title: 'Exhibitions',
      works: 'Works',
    },
    fr: {
      biography: 'Biographie',
      contact: 'Contact',
      count: 'expositions',
      critics: 'Critiques',
      intro:
        'Une chronologie documentée des expositions, performances, ateliers ouverts et archives conservées depuis 1997.',
      archive: 'Archives complètes',
      archiveLink: 'Parcourir les archives complètes',
      archiveIntro:
        'Chaque notice mène à une page dédiée réunissant les éléments disponibles : photographies, pages de programme, catalogues et liens sources.',
      open: 'Voir l’exposition',
      publications: 'Publications',
      title: 'Expositions',
      works: 'Œuvres',
    },
    ko: {
      biography: '작가 소개',
      contact: '문의',
      count: '개의 전시',
      critics: '비평',
      intro: '전시, 퍼포먼스, 오픈 스튜디오를 시간의 흐름에 따라 천천히 걸어봅니다.',
      archive: '전체 아카이브',
      archiveLink: '전체 아카이브 보기',
      archiveIntro:
        '각 기록은 현재 확인 가능한 사진, 프로그램 페이지, 카탈로그, 출처 링크를 모은 상세 페이지로 이어집니다.',
      open: '전시 보기',
      publications: '출판물',
      title: '전시',
      works: '작품',
    },
  } as const;

  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private observer?: IntersectionObserver;

  constructor() {
    document.documentElement.classList.add('exhibitions-scroll');
    this.destroyRef.onDestroy(() =>
      document.documentElement.classList.remove('exhibitions-scroll'),
    );

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
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  layoutClass(index: number): string {
    return ['left', 'center', 'right'][index % 3];
  }

  exhibitionsForYear(year: string): Exhibition[] {
    return this.exhibitions.filter((item) => item.year === year);
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
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { rootMargin: '-16% 0px -18%', threshold: 0.18 },
    );

    this.scenes.forEach((scene) => this.observer?.observe(scene.nativeElement));
  }
}
