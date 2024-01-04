import App from './App';

class BoundingBox {
	x: number;

	y: number;

	width: number;

	height: number;

	color = 'rgba(255, 0, 0, 0.3)';

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw() {
		App.ctx.fillStyle = this.color;
		App.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	isColliding(target: BoundingBox) {
		return (
			target.x + target.width >= this.x &&
			target.x <= this.x + this.width &&
			target.y + target.height >= this.y &&
			target.y <= this.y + this.height
		);
	}
}

export default BoundingBox;
