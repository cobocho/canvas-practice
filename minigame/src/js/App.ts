import Background from './Background';
import Coin from './Coin';
import Player from './Player';
import Score from './Score';
import Wall from './Wall';

class App {
	static canvas = document.querySelector('canvas')!;

	static ctx = App.canvas.getContext('2d')!;

	static dpr = window.devicePixelRatio > 1 ? 2 : 1;

	static width = 1024;

	static height = 768;

	static INTERVAL = 1000 / 60;

	backgrounds: Background[] = [];

	walls: Wall[] = [new Wall({ type: 'SMALL' })];

	player = new Player();

	coins: Coin[] = [];

	score = new Score();

	constructor() {
		window.addEventListener('resize', () => this.resize());
		this.backgrounds = [
			new Background({
				img: document.querySelector(`#bg3-img`) as HTMLImageElement,
				speed: -1,
			}),
			new Background({
				img: document.querySelector(`#bg2-img`) as HTMLImageElement,
				speed: -2,
			}),
			new Background({
				img: document.querySelector(`#bg1-img`) as HTMLImageElement,
				speed: -4,
			}),
		];
		this.render();
	}

	resize() {
		App.canvas.width = App.width * App.dpr;
		App.canvas.height = App.height * App.dpr;
		App.ctx.scale(App.dpr, App.dpr);

		const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
		App.canvas.style.width = `${width}px`;
		App.canvas.style.height = `${width * (3 / 4)}px`;
	}

	render() {
		let now, delta;
		let then = Date.now();

		const frame = () => {
			requestAnimationFrame(frame);
			now = Date.now();
			delta = now - then;
			if (delta < App.INTERVAL) return;

			App.ctx.clearRect(0, 0, App.width, App.height);

			this.backgrounds.forEach((background) => {
				background.update();
				background.draw();
			});

			for (let i = this.walls.length - 1; i >= 0; i--) {
				this.walls[i].update();
				this.walls[i].draw();

				if (this.walls[i].isOutSide()) {
					this.walls.splice(i, 1);
				}

				if (this.walls[i].canGenerateNext()) {
					this.walls[i].generatedNext = true;
					const newWall = new Wall({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' });

					this.walls.push(newWall);

					if (Math.random() < 1) {
						const x = newWall.x + newWall.width / 2;
						const y = newWall.y2 - newWall.gapY / 2;
						this.coins.push(new Coin(x, y, newWall.vx));
					}
				}
			}

			for (let i = this.coins.length - 1; i >= 0; i--) {
				this.coins[i].update();
				this.coins[i].draw();

				if (this.coins[i].isOutSide()) {
					this.coins.splice(i, 1);
				}

				if (this.coins[i].isColliding(this.player.boundingBox)) {
					this.score.coinCount++;
					this.coins.splice(i, 1);
				}
			}

			this.player.update();
			this.player.draw();

			this.score.update();
			this.score.draw();

			then = now - (delta % App.INTERVAL);
		};

		requestAnimationFrame(frame);
	}
}

export default App;
