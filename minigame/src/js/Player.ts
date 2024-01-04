import App from './App';
import BoundingBox from './BoundingBox';

class Player {
	img = document.querySelector('#bird-img') as HTMLImageElement;

	x = App.width * 0.1;

	frameX = 0;

	y = App.height * 0.5;

	vy = -10;

	gravity = 0.3;

	width = 130;

	height = this.width * (96 / 140);

	counter = 0;

	boundingBox = new BoundingBox(this.x, this.y + 20, this.width, this.height - 20);

	constructor() {
		App.canvas.addEventListener('click', () => {
			this.vy = -5;
		});
	}

	update() {
		this.counter++;

		if (this.counter % 2 === 0) {
			this.frameX = ++this.frameX % 15;
		}

		this.vy += this.gravity;
		this.y += this.vy;
		this.boundingBox.y = this.y + 20;
	}

	draw() {
		App.ctx.drawImage(
			this.img,
			(this.img.width / 15) * this.frameX,
			0,
			this.img.width / 15,
			this.img.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
		// this.boundingBox.draw();
	}
}

export default Player;
