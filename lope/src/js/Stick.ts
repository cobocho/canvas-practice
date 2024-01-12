import Dot from './Dot';

class Stick {
	startPoint: Dot;

	endPoint: Dot;

	length: number;

	tension = 0.5;

	constructor(p1: Dot, p2: Dot) {
		this.startPoint = p1;
		this.endPoint = p2;
		this.length = this.startPoint.pos.dist(this.endPoint.pos);
	}

	update() {
		const dx = this.endPoint.pos.x - this.startPoint.pos.x;
		const dy = this.endPoint.pos.y - this.startPoint.pos.y;

		const dist = Math.sqrt(dx * dx + dy * dy);
		const diff = (dist - this.length) / dist;

		const offsetX = diff * dx * this.tension;
		const offsetY = diff * dy * this.tension;

		const m = this.startPoint.mass + this.endPoint.mass;
		const m1 = this.endPoint.mass / m;
		const m2 = this.startPoint.mass / m;

		if (!this.startPoint.pinned) {
			this.startPoint.pos.x += offsetX * m1;
			this.startPoint.pos.y += offsetY * m1;
		}

		if (!this.endPoint.pinned) {
			this.endPoint.pos.x -= offsetX * m2;
			this.endPoint.pos.y -= offsetY * m2;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 10;
		ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
		ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
		ctx.stroke();
		ctx.closePath();
	}
}

export default Stick;
