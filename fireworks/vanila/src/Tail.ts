import CanvasOption from './CanvasOption';
import { randomBetween } from './utils';

class Tail extends CanvasOption {
	y = this.canvasHeight;

	x: number;

	color: number;

	vy: number;

	friction = 0.98;

	opacity = randomBetween(0, 2);

	angle = 0;

	constructor(x: number, vy: number, color: number) {
		super();
		this.x = x;
		this.vy = vy;
		this.color = color;
	}

	update() {
		this.vy *= this.friction;
		this.y += this.vy;

		this.angle += 1;
		this.x += Math.cos(this.angle) * this.vy * 0.2;

		this.opacity = -this.vy * 0.1;
	}

	draw() {
		this.ctx.fillStyle = `hsla(${this.color}, 100%, 65%, ${this.opacity})`;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export default Tail;
