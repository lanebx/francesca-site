import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteLanguage } from '../../core/models/artwork.model';
import { AshAnimation } from './ash-animation';
import { HOME_COPY } from './home-content';
import { ScrollReveal } from './scroll-reveal';

const DARK_HEADER_SCROLL_RATIO = 0.82;

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

  readonly language = signal<SiteLanguage>('en');
  readonly menuOpen = signal(false);
  readonly headerDark = signal(false);

  readonly text = computed(() => HOME_COPY[this.language()]);

  private anchorFrame = 0;
  private ashAnimation?: AshAnimation;
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef)
    .nativeElement;
  private resizeFrame = 0;
  private scrollReveal?: ScrollReveal;
  private readonly onScroll = () => this.updateHeader();
  private readonly onResize = () => {
    cancelAnimationFrame(this.resizeFrame);
    this.resizeFrame = requestAnimationFrame(() => {
      this.ashAnimation?.resize();
      this.updateHeader();
      this.resizeFrame = 0;
    });
  };

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    this.ashAnimation = new AshAnimation(this.canvasRef.nativeElement);
    this.ashAnimation.resize();
    this.updateHeader();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    this.restoreInitialAnchor();
    this.scrollReveal = new ScrollReveal(
      this.hostElement,
      prefersReducedMotion,
    );
    this.scrollReveal.initialize();

    if (!prefersReducedMotion) {
      this.ashAnimation.start();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    cancelAnimationFrame(this.anchorFrame);
    cancelAnimationFrame(this.resizeFrame);
    this.ashAnimation?.destroy();
    this.scrollReveal?.destroy();
  }

  setLanguage(language: SiteLanguage): void {
    this.language.set(language);
    document.documentElement.lang = language;
  }

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private restoreInitialAnchor(): void {
    const anchor = window.location.hash.slice(1);

    if (!anchor || anchor === 'top') {
      return;
    }

    this.anchorFrame = requestAnimationFrame(() => {
      this.anchorFrame = requestAnimationFrame(() => {
        document.getElementById(anchor)?.scrollIntoView();
      });
    });
  }

  private updateHeader(): void {
    this.headerDark.set(
      window.scrollY > window.innerHeight * DARK_HEADER_SCROLL_RATIO,
    );
  }
}
