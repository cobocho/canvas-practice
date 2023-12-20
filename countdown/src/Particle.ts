import CanvasOption from './CanvasOption';
import { randomBetween } from './utils';

class Particle extends CanvasOption {
	x: number;

	y: number;

	r: number;

	rAlpha = randomBetween(0, 5);

	rFriction = randomBetween(0.95, 1.01);

	angle: number;

	angleAlpha = randomBetween(1, 2);

	angleFriction = randomBetween(0.97, 0.99);

	opacity = randomBetween(0.2, 1);

	constructor() {
		super();
		this.r = innerHeight / 4;
		this.angle = randomBetween(0, 360);

		this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
		this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
		this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
		this.ctx.fill();
		this.ctx.closePath();
	}

	update() {
		this.rAlpha *= this.rFriction;
		this.r += this.rAlpha;

		this.angleAlpha *= this.angleFriction;
		this.angle += this.angleAlpha;

		this.opacity -= 0.01;

		this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
		this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
	}
}

export default Particle;
