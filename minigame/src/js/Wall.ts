import App from './App';
import BoundingBox from './BoundingBox';
import { randomBetween } from './utils';

interface WallConfig {
	type: 'BIG' | 'SMALL';
}

class Wall {
	img = document.querySelector('#wall-img') as HTMLImageElement;

	type: WallConfig['type'];

	width: number;

	height = App.height;

	x = App.width;

	vx = -6;

	sx: number;

	sizeX: number;

	gapY = randomBetween(App.height * 0.2, App.height * 0.3);

	y1 = -this.height + randomBetween(30, App.height - this.gapY - 30);

	y2 = this.y1 + this.gapY + this.height;

	generatedNext = false;

	gapNextX = App.width * randomBetween(0.6, 0.75);

	boundingBox1: BoundingBox;

	boundingBox2: BoundingBox;

	constructor(config: WallConfig) {
		this.type = config.type;
		switch (this.type) {
			case 'BIG':
				this.sizeX = 18 / 30;
				this.sx = this.img.width * (9 / 30);
				break;
			case 'SMALL':
				this.sizeX = 9 / 30;
				this.sx = this.img.width * (0 / 30);
		}
		this.width = App.height * this.sizeX;
		this.boundingBox1 = new BoundingBox(this.x + 20, this.y1 - 20, this.width - 40, this.height);
		this.boundingBox2 = new BoundingBox(this.x + 20, this.y2 + 20, this.width - 40, this.height);
	}

	isColliding(target: BoundingBox) {
		return this.boundingBox1.isColliding(target) || this.boundingBox2.isColliding(target);
	}

	isOutSide() {
		return this.x < -this.width;
	}

	canGenerateNext() {
		return !this.generatedNext && this.x + this.width < this.gapNextX;
	}

	update() {
		this.x += this.vx;
		this.boundingBox1.x = this.x + 20;
		this.boundingBox2.x = this.x + 20;
	}

	draw() {
		App.ctx.drawImage(
			this.img,
			this.sx,
			0,
			this.sizeX * this.img.width,
			this.img.height,
			this.x,
			this.y1,
			this.width,
			this.height
		);

		App.ctx.drawImage(
			this.img,
			this.sx,
			0,
			this.sizeX * this.img.width,
			this.img.height,
			this.x,
			this.y2,
			this.width,
			this.height
		);

		// this.boundingBox1.draw();
		// this.boundingBox2.draw();
	}
}

export default Wall;
