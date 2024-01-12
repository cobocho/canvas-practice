import Dot from './Dot';
import Mouse from './Mouse';
import Stick from './Stick';

class App {
	static width = innerWidth;

	static height = innerHeight;

	static dpr = window.devicePixelRatio > 1 ? 2 : 1;

	static INTERVAL = 1000 / 60;

	canvas = document.querySelector('canvas')!;

	ctx = this.canvas.getContext('2d')!;

	dots: Dot[] = [new Dot(400, 50), new Dot(500, 100), new Dot(600, 50), new Dot(800, 50)];

	sticks: Stick[] = [
		new Stick(this.dots[0], this.dots[1]),
		new Stick(this.dots[1], this.dots[2]),
		new Stick(this.dots[2], this.dots[3]),
	];

	mouse = new Mouse(this.canvas);

	constructor() {
		this.render();
	}

	resize() {
		this.canvas.width = App.width * App.dpr;
		this.canvas.height = App.height * App.dpr;

		this.canvas.style.width = `${App.width}px`;
		this.canvas.style.height = `${App.height}px`;

		this.ctx.scale(App.dpr, App.dpr);
	}

	render() {
		let now, delta;
		let then = Date.now();

		this.dots[0].pinned = true;

		const frame = () => {
			requestAnimationFrame(frame);
			now = Date.now();
			delta = now - then;
			if (delta < App.INTERVAL) return;

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.animate();

			then = now - (delta % App.INTERVAL);
		};

		requestAnimationFrame(frame);
	}

	animate() {
		this.dots.forEach((dot) => {
			dot.update(this.mouse);
		});

		this.sticks.forEach((stick) => {
			stick.update();
		});

		this.dots.forEach((dot) => {
			dot.draw(this.ctx);
		});

		this.sticks.forEach((stick) => {
			stick.draw(this.ctx);
		});
	}
}

export default App;
