import App from './App';
import BoundingBox from './BoundingBox';

class Coin {
	img = document.querySelector('#coin-img') as HTMLImageElement;

	x: number;

	y: number;

	width = 50;

	height = 50;

	frameX = 0;

	count = 0;

	boundingBox;

	vx: number;

	constructor(x: number, y: number, vx: number) {
		this.x = x - this.width / 2;
		this.y = y - this.height / 2;
		this.vx = vx;
		this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
	}

	isOutSide() {
		return this.x < -this.width;
	}

	isColliding(target: BoundingBox) {
		return this.boundingBox.isColliding(target);
	}

	draw() {
		App.ctx.drawImage(
			this.img,
			(this.img.width / 10) * this.frameX,
			0,
			this.img.width / 10,
			this.img.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
		// this.boundingBox.draw();
	}

	update() {
		this.x += this.vx;
		if (++this.count % 5 === 0) {
			this.frameX = ++this.frameX % 10;
		}
		this.boundingBox.x = this.x;
	}
}

export default Coin;
