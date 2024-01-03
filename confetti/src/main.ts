import Particle from './Particle';

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const INTERVAL = 1000 / 60;

const particles: Particle[] = [];

const init = () => {
	console.log('init');
	canvasWidth = innerWidth;
	canvasHeight = innerHeight;
	canvas.style.width = canvasWidth + 'px';
	canvas.style.height = canvasHeight + 'px';
	canvas.width = canvasWidth * dpr;
	canvas.height = canvasHeight * dpr;
	ctx.scale(dpr, dpr);
};

const confetti = (x: number, y: number, count: number, degree: number = 0) => {
	for (let i = 0; i < count; i++) {
		particles.push(new Particle(x, y, degree));
	}
};

const render = () => {
	console.log('render');

	let now, delta;
	let then = Date.now();

	const frame = () => {
		requestAnimationFrame(frame);
		now = Date.now();
		delta = now - then;
		if (delta < INTERVAL) return;
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		for (let i = particles.length - 1; i >= 0; i--) {
			particles[i].update();
			particles[i].draw(ctx);
			if (particles[i].opacity < 0) particles.splice(i, 1);
		}

		then = now - (delta % INTERVAL);
	};

	requestAnimationFrame(frame);
};

window.addEventListener('load', () => {
	init();
	render();
});

window.addEventListener('click', () => {
	confetti(0, canvasHeight / 2, 10, -50);
});

window.addEventListener('resize', () => {
	init();
});
