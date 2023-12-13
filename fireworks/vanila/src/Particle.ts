import CanvasOption from './CanvasOption';

class Particle extends CanvasOption {
	x: number;

	y: number;

	vx: number;

	vy: number;

	opacity: number;

	gravity = 0.12;

	friction = 0.93;

	color: number;

	constructor(x: number, y: number, vx: number, vy: number, opacity: number, color: number) {
		super();
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.opacity = opacity;
		this.color = color;
	}

	update() {
		this.opacity -= 0.01;

		this.vy += this.gravity;

		this.vx *= this.friction;
		this.vy *= this.friction;

		this.x += this.vx;
		this.y += this.vy;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = `hsla(${this.color}, 100%, 65%, ${this.opacity})`;
		this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export default Particle;
