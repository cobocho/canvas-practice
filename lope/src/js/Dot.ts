import Mouse from './Mouse';
import Vector from './Vector';

class Dot {
	pos: Vector;

	oldPos: Vector;

	gravity = new Vector(0, 1);

	friction = 0.97;

	pinned = false;

	mass = 1;

	constructor(x: number, y: number) {
		this.pos = new Vector(x, y);
		this.oldPos = new Vector(x, y);
	}

	update(mouse: Mouse) {
		if (this.pinned) return;

		let velocity = Vector.sub(this.pos, this.oldPos);
		this.oldPos.setXY(this.pos.x, this.pos.y);

		velocity.multi(this.friction);
		velocity.add(this.gravity);

		this.pos.add(velocity);

		let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);

		const dist = Math.sqrt(dx ** 2 + dy ** 2);

		if (dist > mouse.radius) return;

		const direction = new Vector(dx / dist, dy / dist);

		const force = (mouse.radius - dist) / mouse.radius;

		if (force > 0.6) {
			this.pos.setXY(mouse.pos.x, mouse.pos.y);
			return;
		}

		this.pos.add(direction.multi(force).multi(5));
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
}

export default Dot;
