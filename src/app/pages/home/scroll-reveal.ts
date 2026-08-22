const VIEWPORT_BOUNDARY_RATIO = 0.08;

/** Coordinates the one-time reveal animation for elements on the home page. */
export class ScrollReveal {
  private readyFrame = 0;
  private observer?: IntersectionObserver;

  constructor(
    private readonly host: HTMLElement,
    private readonly prefersReducedMotion: boolean,
  ) {}

  initialize(): void {
    const elements = Array.from(
      this.host.querySelectorAll<HTMLElement>('.scroll-reveal'),
    );

    if (this.prefersReducedMotion || !('IntersectionObserver' in window)) {
      for (const element of elements) {
        this.show(element);
      }
      return;
    }

    this.showElementsAlreadyInViewport(elements);
    this.observe(elements);
    this.prepareRevealStyles();
  }

  destroy(): void {
    cancelAnimationFrame(this.readyFrame);
    this.observer?.disconnect();
    this.host.classList.remove('reveal-initializing', 'reveal-ready');
  }

  private showElementsAlreadyInViewport(elements: HTMLElement[]): void {
    const upperBoundary = window.innerHeight * VIEWPORT_BOUNDARY_RATIO;
    const lowerBoundary =
      window.innerHeight * (1 - VIEWPORT_BOUNDARY_RATIO);

    for (const element of elements) {
      const bounds = element.getBoundingClientRect();

      if (bounds.top < lowerBoundary && bounds.bottom > upperBoundary) {
        this.show(element);
      }
    }
  }

  private observe(elements: HTMLElement[]): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const element = entry.target as HTMLElement;
          this.show(element);
          this.observer?.unobserve(element);
        }
      },
      {
        rootMargin: '-8% 0px -8%',
        threshold: 0.12,
      },
    );

    for (const element of elements) {
      this.observer.observe(element);
    }
  }

  private prepareRevealStyles(): void {
    this.host.classList.add('reveal-initializing', 'reveal-ready');
    this.readyFrame = requestAnimationFrame(() => {
      this.readyFrame = requestAnimationFrame(() => {
        this.host.classList.remove('reveal-initializing');
      });
    });
  }

  private show(element: HTMLElement): void {
    element.classList.add('is-visible');
  }
}
