class Vector {
	x: number;

	y: number;

	constructor(x: number, y: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	static add(v1: Vector, v2: Vector) {
		return new Vector(v1.x + v2.x, v1.y + v2.y);
	}

	static sub(v1: Vector, v2: Vector) {
		return new Vector(v1.x - v2.x, v1.y - v2.y);
	}

	add(x: Vector | number, y?: number) {
		if (x instanceof Vector) {
			this.x += x.x;
			this.y += x.y;
		} else if (y) {
			this.x += x;
			this.y += y;
		}

		return this;
	}

	sub(x: Vector | number, y?: number) {
		if (x instanceof Vector) {
			this.x -= x.x;
			this.y -= x.y;
		} else if (y) {
			this.x -= x;
			this.y -= y;
		}

		return this;
	}

	multi(v: Vector | number) {
		if (v instanceof Vector) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;
		}

		return this;
	}

	setXY(x: number, y: number) {
		this.x = x;
		this.y = y;

		return this;
	}

	dist(v: Vector) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;

		return Math.sqrt(dx ** 2 + dy ** 2);
	}
}

export default Vector;
