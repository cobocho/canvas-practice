const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;
const dpr = window.devicePixelRatio;
const FPS = 60;
const INTERVAL = 1000 / FPS;

let now, delta;
let then = Date.now();

let canvasWidth, canvasHeight;

const init = () => {
	canvasWidth = innerWidth;
	canvasHeight = innerHeight;

	canvas.style.width = canvasWidth + 'px';
	canvas.style.height = canvasHeight + 'px';

	canvas.width = canvasWidth * dpr;
	canvas.height = canvasHeight * dpr;

	ctx.scale(dpr, dpr);
};

const render = () => {
	requestAnimationFrame(render);

	now = Date.now();
	delta = now - then;
	if (delta < INTERVAL) return;

	then = now - (delta % INTERVAL);
};

window.addEventListener('load', () => {
	init();
	render();
});

window.addEventListener('resize', () => {
	render();
});
