import { getRandomNumber } from './utils';

export default class Particle {
	ctx;

	x;

	y;

	radius;

	vy;

	acc;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.x = getRandomNumber(0, innerWidth);
		this.y = getRandomNumber(0, innerHeight);
		this.vy = getRandomNumber(1, 5);
		this.radius = getRandomNumber(50, 100);
		this.acc = 1.03;
	}

	update() {
		this.vy *= this.acc;
		this.y += this.vy;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
		this.ctx.fillStyle = 'orange';
		this.ctx.fill();
		this.ctx.closePath();
		if (this.y - this.radius > innerHeight) {
			this.replace();
		}
	}

	replace() {
		if (this.y - this.radius > innerHeight) {
			this.x = getRandomNumber(0, innerWidth);
			this.vy = getRandomNumber(1, 5);
			this.radius = getRandomNumber(50, 100);
			this.y = -this.radius;
		}
	}
}
