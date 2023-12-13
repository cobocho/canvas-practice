import CanvasOption from './CanvasOption';
import Particle from './Particle';
import { hypotenuse, randomBetween } from './utils';
import './style.css';
import Tail from './Tail';
import Spark from './Spark';

class Canvas extends CanvasOption {
	particles: Particle[] = [];

	tails: Tail[] = [];

	sparks: Spark[] = [];

	constructor() {
		super();
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

	createTail() {
		const x = randomBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
		const vy = this.canvasHeight * randomBetween(0.015, 0.02) * -1;
		const colorDeg = randomBetween(0, 360);

		this.tails.push(new Tail(x, vy, colorDeg));
	}

	createParticles(x: number, y: number, color: number) {
		const PARTICLE_NUM = 1000;

		for (let i = 0; i < PARTICLE_NUM; i++) {
			const r = randomBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
			const angle = (Math.PI / 180) * randomBetween(0, 360);
			const vx = r * Math.cos(angle);
			const vy = r * Math.sin(angle);
			const opacity = randomBetween(0.6, 0.9);
			this.particles.push(new Particle(x, y, vx, vy, opacity, color));
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

			this.ctx.fillStyle = this.bgColor + '40';
			this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

			if (Math.random() < 0.03) {
				this.createTail();
			}

			this.tails = this.tails.filter((tail) => {
				tail.update();
				tail.draw();

				if (tail.vy < -1) {
					return true;
				}

				this.createParticles(tail.x, tail.y, tail.color);

				return false;
			});

			this.particles = this.particles.filter((particle) => {
				particle.update();
				particle.draw();

				if (Math.random() < 0.1) {
					this.sparks.push(new Spark(particle.x, particle.y, 0.3));
				}

				return particle.opacity > 0.01;
			});

			this.sparks = this.sparks.filter((spark) => {
				spark.update();
				spark.draw();

				return spark.opacity > 0.01;
			});

			then = now - (delta % this.INTERVAL);
		};
		requestAnimationFrame(frame);
	}
}

const canvas = new Canvas();

window.addEventListener('load', () => {
	console.log('load');
	canvas.init();
	canvas.render();
});

window.addEventListener('resize', () => {
	console.log('resize');
	canvas.render();
});
