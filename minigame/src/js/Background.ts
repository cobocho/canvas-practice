import App from './App';

interface BackgroundConfig {
	img: HTMLImageElement;
	speed: number;
}

class Background {
	img: HTMLImageElement;

	height = App.height;

	width: number;

	leftPos = {
		x: 0,
		y: 0,
	};

	rightPos: { x: number; y: number };

	speed: number;

	constructor(config: BackgroundConfig) {
		this.img = config.img;
		this.speed = config.speed;
		this.width = App.height * (this.img.width / this.img.height);
		this.rightPos = {
			x: this.width - 4,
			y: 0,
		};
	}

	draw() {
		App.ctx.drawImage(this.img, this.leftPos.x, this.leftPos.y, this.width, this.height);
		App.ctx.drawImage(this.img, this.rightPos.x, this.rightPos.y, this.width, this.height);
	}

	update() {
		if (this.leftPos.x + this.width < 0) {
			this.leftPos.x = this.rightPos.x + this.width - 4;
		}
		if (this.rightPos.x + this.width < 0) {
			this.rightPos.x = this.leftPos.x + this.width - 4;
		}

		this.leftPos.x += this.speed;
		this.rightPos.x += this.speed;
	}
}

export default Background;
