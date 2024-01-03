import { randomBetween } from './utils';

const dpr = window.devicePixelRatio > 1 ? 2 : 1;

export default class Particle {
	x: number;

	y: number;

	degree: number;

	angle: number = (Math.PI / 180) * randomBetween(0, 360);

	radius = randomBetween(30, 100);

	vx: number;

	vy: number;

	width = 12;

	widthDelta = randomBetween(0, 360);

	height = 12;

	heightDelta = randomBetween(0, 360);

	rotation = randomBetween(0, 360);

	rotationDelta = randomBetween(-1, 1);

	friction = 0.89;

	gravity = 0.5;

	opacity = 1;

	constructor(x: number, y: number, degree: number = -30) {
		this.x = x;
		this.y = y;
		this.degree = degree;
		this.angle = (Math.PI / 180) * randomBetween(this.degree - 30, this.degree + 30);
		this.vx = this.radius * Math.cos(this.angle);
		this.vy = this.radius * Math.sin(this.angle);
	}

	update() {
		this.vy += this.gravity;

		this.vy *= this.friction;
		this.vx *= this.friction;

		this.x += this.vx;
		this.y += this.vy;

		this.opacity -= 0.005;

		this.widthDelta += 2;
		this.heightDelta += 2;

		this.rotation += this.rotationDelta;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.translate(this.x + this.width * 2, this.y + this.height * 2);
		ctx.rotate((Math.PI / 180) * this.rotation);
		ctx.translate(-this.x - this.width * 2, -this.y - this.height * 2);

		ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
		ctx.fillRect(
			this.x,
			this.y,
			this.width * Math.cos((Math.PI / 180) * this.widthDelta),
			this.height * Math.sin((Math.PI / 180) * this.heightDelta)
		);

		ctx.resetTransform();
		ctx.scale(dpr, dpr);
	}
}
