import { getRandomNumber } from '../../utils/getRandomNumber';

export default class Particle {
	x = getRandomNumber(0, innerWidth);

	y = getRandomNumber(0, innerHeight);

	vy = getRandomNumber(1, 5);

	radius = getRandomNumber(50, 100);

	acc = 1.03;

	update() {
		this.vy *= this.acc;
		this.y += this.vy;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
		ctx.fillStyle = 'orange';
		ctx.fill();
		ctx.closePath();
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
