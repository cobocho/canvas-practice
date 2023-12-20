import CanvasOption from './CanvasOption';
import Particle from './Particle';

class Canvas extends CanvasOption {
	particles: Particle[] = [];

	constructor() {
		super();
		this.init();
	}

	public init() {
		this.canvasWidth = innerWidth;
		this.canvasHeight = innerHeight;

		this.canvas.width = this.canvasWidth * this.dpr;
		this.canvas.height = this.canvasHeight * this.dpr;

		this.ctx.scale(this.dpr, this.dpr);

		this.canvas.style.width = this.canvasWidth + 'px';
		this.canvas.style.height = this.canvasHeight + 'px';
	}

	createRing() {
		const QUANTITY = 800;

		for (let i = 0; i < QUANTITY; i++) {
			this.particles.push(new Particle());
		}
	}

	public render() {
		let now, delta;
		let then = Date.now();

		const frame = () => {
			requestAnimationFrame(frame);

			now = Date.now();
			delta = now - then;

			if (delta < this.INTERVAL) return;

			this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

			this.particles = this.particles.filter((particle) => {
				particle.draw();
				particle.update();

				return particle.opacity > 0;
			});

			then = now - (delta % this.INTERVAL);
		};

		requestAnimationFrame(frame.bind(this));
	}
}

const canvas = new Canvas();

window.addEventListener('load', () => {
	canvas.init();
	canvas.render();

	const texts = Array.from(document.querySelectorAll('span'));
	const ring = document.querySelector('#ring') as HTMLImageElement;

	texts.forEach((text, idx) => {
		text.style.animationName = 'count';
		text.style.animationDuration = '1s';
		text.style.animationDelay = `${idx}s`;
	});

	setTimeout(() => {
		ring.style.opacity = '0';
		canvas.createRing();
	}, 3000);
});

window.addEventListener('resize', () => {
	canvas.render();
});
