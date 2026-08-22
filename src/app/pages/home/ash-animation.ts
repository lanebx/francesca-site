interface AshParticle {
  alpha: number;
  drift: number;
  radius: number;
  speed: number;
  x: number;
  y: number;
}

const MAX_DEVICE_PIXEL_RATIO = 2;
const MAX_PARTICLES = 210;
const MIN_PARTICLES = 90;
const PIXELS_PER_PARTICLE = 7;
const PARTICLE_RESET_OFFSET = 4;

/** Owns the lifecycle and drawing state of the decorative hero canvas. */
export class AshAnimation {
  private animationFrame = 0;
  private particles: AshParticle[] = [];

  constructor(private readonly canvas: HTMLCanvasElement) {}

  start(): void {
    this.draw();
  }

  resize(): void {
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      MAX_DEVICE_PIXEL_RATIO,
    );
    const { innerHeight, innerWidth } = window;

    this.canvas.width = Math.floor(innerWidth * pixelRatio);
    this.canvas.height = Math.floor(innerHeight * pixelRatio);
    this.canvas.style.width = `${innerWidth}px`;
    this.canvas.style.height = `${innerHeight}px`;
    this.canvas
      .getContext('2d')
      ?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    this.particles = this.createParticles(innerWidth, innerHeight);
  }

  destroy(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  private createParticles(width: number, height: number): AshParticle[] {
    const particleCount = Math.min(
      MAX_PARTICLES,
      Math.max(MIN_PARTICLES, Math.floor(width / PIXELS_PER_PARTICLE)),
    );

    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.25,
      speed: Math.random() * 0.16 + 0.035,
      drift: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.4 + 0.08,
    }));
  }

  private draw(): void {
    const context = this.canvas.getContext('2d');

    if (!context) {
      return;
    }

    const { innerHeight, innerWidth } = window;
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (const particle of this.particles) {
      particle.y -= particle.speed;
      particle.x += particle.drift;

      if (particle.y < -PARTICLE_RESET_OFFSET) {
        particle.y = innerHeight + PARTICLE_RESET_OFFSET;
        particle.x = Math.random() * innerWidth;
      }

      context.beginPath();
      context.fillStyle = `rgba(235, 229, 217, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }

    this.animationFrame = requestAnimationFrame(() => this.draw());
  }
}
