import Vector from './Vector';

class Mouse {
	pos = new Vector(-1000, -1000);

	radius = 100;

	constructor(canvas: HTMLCanvasElement) {
		canvas.onmousemove = (e) => {
			this.pos.setXY(e.clientX, e.clientY);
		};
		canvas.ontouchmove = (e) => {
			this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
		};
	}
}

export default Mouse;
