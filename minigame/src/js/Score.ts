import App from './App';
import Coin from './Coin';

class Score {
	coin = new Coin(App.width - 50, 50, 0);

	distCount = 0;

	coinCount = 0;

	constructor() {
		this.coin.frameX = 9;
	}

	draw() {
		this.coin.draw();

		App.ctx.font = '55px Jua';
		App.ctx.fillStyle = '#f1f1f1';
		App.ctx.textAlign = 'right';
		App.ctx.fillText(`${this.coinCount}`, App.width - 80, 69);

		App.ctx.textAlign = 'left';
		App.ctx.fillText(`${this.distCount.toFixed()}m`, 25, 69);
	}

	update() {
		this.distCount += 0.015;
	}
}

export default Score;
