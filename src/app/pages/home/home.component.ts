import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

type Language = 'en' | 'fr' | 'ko';

interface AshParticle {
  alpha: number;
  drift: number;
  radius: number;
  speed: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ashCanvas', { static: true })
  private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly language = signal<Language>('en');
  readonly menuOpen = signal(false);
  readonly headerDark = signal(false);

  readonly copy = {
    en: {
      descriptor: 'Korean-born artist based in Avignon, France',
      menu: {
        works: 'Works',
        exhibitions: 'Exhibitions',
        biography: 'Biography',
        critics: 'Critics',
        publications: 'Publications',
        contact: 'Contact',
      },
      scroll: 'Scroll to enter',
      artworkLabel: 'Selected work · 2013',
      museum: {
        aout: {
          title: 'August',
          medium: 'Mixed media',
        },
        twin: {
          title: 'Twin but Twin V',
          medium: 'Ash & mixed media',
        },
        tears: {
          title: 'Tears in the Ocean and the Sky',
          medium: 'Ash & mixed media on canvas',
        },
      },
      statementEyebrow: 'The practice',
      statement:
        'Working with ash, memory and light, Francesca Cho transforms traces of loss into enduring images of hope.',
      viewWork: 'View work',
      viewAllWorks: 'View all works',
      exhibitionEyebrow: 'Latest exhibition',
      exhibitionTitle: 'Confluence',
      exhibitionDate: '04—18 July 2026',
      exhibitionPlace: 'Atelier Galerie FCW · Avignon',
      exhibitionBody:
        'Three artists brought Korean and French perspectives together during the Festival d’Avignon, marking 140 years of diplomatic relations between France and Korea.',
      explore: 'Explore exhibition',
      quote: 'Hope is the flame that will never be extinguished.',
      quoteBy: 'Tabish Khan · London art critic, 2025',
      biographyEyebrow: 'A life between places',
      biographyTitle:
        'From Korea to London, and from London to the light of southern France.',
      biographyBody:
        'Her practice has travelled through painting, site-specific installation and performance, while returning to a singular material language of ash, remembrance and peace.',
      biographyCta: 'Discover the biography',
      pressEyebrow: 'Selected institutions',
      contactEyebrow: 'Inquiries',
      contactTitle: 'Begin a conversation',
      contactBody:
        'For exhibitions, curatorial projects, press and enquiries about available works.',
      formName: 'Name',
      formEmail: 'Email',
      formSubject: 'Subject',
      formSubjectPlaceholder: 'Select an inquiry',
      formSubjectExhibition: 'Exhibition or curatorial project',
      formSubjectArtwork: 'Available works',
      formSubjectPress: 'Press',
      formSubjectOther: 'Other',
      formMessage: 'Message',
      formSubmit: 'Send inquiry',
      visitLabel: 'Visit the gallery',
      followLabel: 'Follow',
      directionsLabel: 'Get directions',
    },
    fr: {
      descriptor: 'Artiste d’origine coréenne basée à Avignon, France',
      menu: {
        works: 'Œuvres',
        exhibitions: 'Expositions',
        biography: 'Biographie',
        critics: 'Critiques',
        publications: 'Publications',
        contact: 'Contact',
      },
      scroll: 'Faire défiler pour entrer',
      artworkLabel: 'Œuvre sélectionnée · 2013',
      museum: {
        aout: {
          title: 'Août',
          medium: 'Techniques mixtes',
        },
        twin: {
          title: 'Jumeaux mais jumeaux V',
          medium: 'Cendre et techniques mixtes',
        },
        tears: {
          title: 'Larmes dans l’océan et le ciel',
          medium: 'Cendre et techniques mixtes sur toile',
        },
      },
      statementEyebrow: 'La pratique',
      statement:
        'À travers la cendre, la mémoire et la lumière, Francesca Cho transforme les traces de la perte en images durables d’espoir.',
      viewWork: 'Voir l’œuvre',
      viewAllWorks: 'Voir toutes les œuvres',
      exhibitionEyebrow: 'Dernière exposition',
      exhibitionTitle: 'Confluence',
      exhibitionDate: '04—18 juillet 2026',
      exhibitionPlace: 'Atelier Galerie FCW · Avignon',
      exhibitionBody:
        'Trois artistes ont réuni des regards coréens et français pendant le Festival d’Avignon, à l’occasion des 140 ans des relations diplomatiques entre la France et la Corée.',
      explore: 'Découvrir l’exposition',
      quote: 'L’espoir est la flamme qui ne s’éteindra jamais.',
      quoteBy: 'Tabish Khan · Critique d’art londonien, 2025',
      biographyEyebrow: 'Une vie entre plusieurs lieux',
      biographyTitle:
        'De la Corée à Londres, puis de Londres à la lumière du sud de la France.',
      biographyBody:
        'Sa pratique traverse la peinture, l’installation in situ et la performance, tout en revenant à un langage singulier fait de cendre, de mémoire et de paix.',
      biographyCta: 'Découvrir la biographie',
      pressEyebrow: 'Institutions sélectionnées',
      contactEyebrow: 'Demandes',
      contactTitle: 'Commencer une conversation',
      contactBody:
        'Pour les expositions, projets curatoriaux, la presse et les demandes concernant les œuvres disponibles.',
      formName: 'Nom',
      formEmail: 'E-mail',
      formSubject: 'Objet',
      formSubjectPlaceholder: 'Choisir une demande',
      formSubjectExhibition: 'Exposition ou projet curatorial',
      formSubjectArtwork: 'Œuvres disponibles',
      formSubjectPress: 'Presse',
      formSubjectOther: 'Autre',
      formMessage: 'Message',
      formSubmit: 'Envoyer',
      visitLabel: 'Visiter la galerie',
      followLabel: 'Suivre',
      directionsLabel: 'Itinéraire',
    },
    ko: {
      descriptor: '프랑스 아비뇽을 기반으로 활동하는 한국 출신 작가',
      menu: {
        works: '작품',
        exhibitions: '전시',
        biography: '작가 소개',
        critics: '비평',
        publications: '출판',
        contact: '문의',
      },
      scroll: '스크롤하여 들어가기',
      artworkLabel: '선정 작품 · 2013',
      museum: {
        aout: {
          title: '8월',
          medium: '혼합 매체',
        },
        twin: {
          title: '쌍둥이지만 쌍둥이 V',
          medium: '재와 혼합 매체',
        },
        tears: {
          title: '바다와 하늘의 눈물',
          medium: '캔버스에 재와 혼합 매체',
        },
      },
      statementEyebrow: '작업 세계',
      statement:
        '조 프란체스카는 재, 기억, 빛을 통해 상실의 흔적을 오래 지속되는 희망의 이미지로 변환합니다.',
      viewWork: '작품 보기',
      viewAllWorks: '모든 작품 보기',
      exhibitionEyebrow: '최근 전시',
      exhibitionTitle: 'Confluence',
      exhibitionDate: '2026년 7월 4일—18일',
      exhibitionPlace: 'Atelier Galerie FCW · Avignon',
      exhibitionBody:
        '프랑스와 한국의 수교 140주년을 기념하여 세 명의 작가가 아비뇽 페스티벌 기간 동안 한국과 프랑스의 시선을 한자리에 모았습니다.',
      explore: '전시 보기',
      quote: '희망은 결코 꺼지지 않는 불꽃이다.',
      quoteBy: 'Tabish Khan · 런던 미술 평론가, 2025',
      biographyEyebrow: '장소를 잇는 삶',
      biographyTitle:
        '한국에서 런던으로, 그리고 런던에서 프랑스 남부의 빛으로.',
      biographyBody:
        '그의 작업은 회화, 장소 특정적 설치, 퍼포먼스를 가로지르며 재와 기억, 평화라는 고유한 물질 언어로 되돌아옵니다.',
      biographyCta: '작가 소개 보기',
      pressEyebrow: '주요 기관',
      contactEyebrow: '문의',
      contactTitle: '대화를 시작하세요',
      contactBody:
        '전시, 큐레토리얼 프로젝트, 언론 및 작품 문의를 위한 연락처입니다.',
      formName: '이름',
      formEmail: '이메일',
      formSubject: '문의 유형',
      formSubjectPlaceholder: '문의 유형을 선택하세요',
      formSubjectExhibition: '전시 및 큐레이토리얼 프로젝트',
      formSubjectArtwork: '구매 가능한 작품',
      formSubjectPress: '언론',
      formSubjectOther: '기타',
      formMessage: '메시지',
      formSubmit: '문의 보내기',
      visitLabel: '갤러리 방문',
      followLabel: '팔로우',
      directionsLabel: '길찾기',
    },
  } as const;

  private ashFrame = 0;
  private readonly hostRef: ElementRef<HTMLElement> = inject(ElementRef);
  private particles: AshParticle[] = [];
  private reduceMotion = false;
  private revealReadyFrame = 0;
  private revealObserver?: IntersectionObserver;
  private readonly onScroll = () => this.updateHeader();
  private readonly onResize = () => {
    this.resizeCanvas();
    this.createParticles();
    this.updateHeader();
  };

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    this.resizeCanvas();
    this.createParticles();
    this.updateHeader();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.restoreInitialAnchor();
    this.setupScrollReveals();

    if (!this.reduceMotion) {
      this.drawAsh();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    cancelAnimationFrame(this.ashFrame);
    cancelAnimationFrame(this.revealReadyFrame);
    this.revealObserver?.disconnect();
    this.hostRef.nativeElement.classList.remove(
      'reveal-initializing',
      'reveal-ready',
    );
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    document.documentElement.lang = language;
  }

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  openSubjectPicker(event: MouseEvent, select: HTMLSelectElement): void {
    if (event.target === select) {
      return;
    }

    event.preventDefault();
    select.focus();

    if ('showPicker' in select) {
      try {
        select.showPicker();
        return;
      } catch {
        // Fall back to a regular click for browsers without picker support.
      }
    }

    select.click();
  }

  private restoreInitialAnchor(): void {
    const anchor = window.location.hash.slice(1);

    if (!anchor || anchor === 'top') {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(anchor)?.scrollIntoView();
      });
    });
  }

  private setupScrollReveals(): void {
    const host = this.hostRef.nativeElement;
    const elements = Array.from(
      host.querySelectorAll<HTMLElement>('.scroll-reveal'),
    );

    if (this.reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const upperBoundary = window.innerHeight * 0.08;
    const lowerBoundary = window.innerHeight * 0.92;

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();

      if (bounds.top < lowerBoundary && bounds.bottom > upperBoundary) {
        element.classList.add('is-visible');
      }
    });

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            this.revealObserver?.unobserve(element);
          }
        });
      },
      {
        rootMargin: '-8% 0px -8%',
        threshold: 0.12,
      },
    );

    elements.forEach((element) => this.revealObserver?.observe(element));
    host.classList.add('reveal-initializing', 'reveal-ready');
    this.revealReadyFrame = requestAnimationFrame(() => {
      this.revealReadyFrame = requestAnimationFrame(() => {
        host.classList.remove('reveal-initializing');
      });
    });
  }

  private updateHeader(): void {
    this.headerDark.set(window.scrollY > window.innerHeight * 0.82);
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  private createParticles(): void {
    const count = Math.min(
      210,
      Math.max(90, Math.floor(window.innerWidth / 7)),
    );
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.8 + 0.25,
      speed: Math.random() * 0.16 + 0.035,
      drift: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.4 + 0.08,
    }));
  }

  private drawAsh(): void {
    const context = this.canvasRef.nativeElement.getContext('2d');

    if (!context) {
      return;
    }

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += particle.drift;

      if (particle.y < -4) {
        particle.y = window.innerHeight + 4;
        particle.x = Math.random() * window.innerWidth;
      }

      context.beginPath();
      context.fillStyle = `rgba(235, 229, 217, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    this.ashFrame = requestAnimationFrame(() => this.drawAsh());
  }

}
