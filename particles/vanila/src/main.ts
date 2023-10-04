import './style.css';
import dat from 'dat.gui';
import Particle from './Particle';

const canvas = document.querySelector('canvas')!;
const feGaussianBlur = document.querySelector('feGaussianBlur')!;
const feColorMatrix = document.querySelector('feColorMatrix')!;
const ctx = canvas.getContext('2d')!;

const FPS = 60;
const INTERVAL = 1000 / FPS;

let canvasWidth = 0;
let canvasHeight = 0;

let particles: Particle[] = [];

const setCanvasSize = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
) => {
	const dpr = window.devicePixelRatio;
	canvas.style.width = width + 'px';
	canvas.width = width * dpr;
	canvas.style.height = height + 'px';
	canvas.height = height * dpr;
	ctx.scale(dpr, dpr);
};

const setGUI = () => {
	const gui = new dat.GUI();
	const controls = {
		blurValue: 40,
		alphaChannel: 100,
		alphaOffset: -23,
		acc: 1.03,
	};
	const f1 = gui.addFolder('Gooey Effect');
	const f2 = gui.addFolder('acc');

	f1.add(controls, 'blurValue', 0, 100).onChange((value) => {
		feGaussianBlur.setAttribute('stdDeviation', value);
	});

	f1.add(controls, 'alphaChannel', 100, 500).onChange((value) => {
		feColorMatrix.setAttribute(
			'values',
			`
        1 0 0 0 0  
        0 1 0 0 0  
        0 0 1 0 0  
        0 0 0 ${value} ${controls.alphaOffset}
      `
		);
	});

	f1.add(controls, 'alphaOffset', -40, 40).onChange((value) => {
		feColorMatrix.setAttribute(
			'values',
			`
        1 0 0 0 0  
        0 1 0 0 0  
        0 0 1 0 0  
        0 0 0 ${controls.alphaChannel} ${value}
      `
		);
	});

	f2.add(controls, 'acc', 1, 1.4).onChange((value) => {
		particles.forEach((particle) => (particle.acc = value));
	});
};

const getIntervalData = (then: number) => {
	const now = Date.now();
	const delta = now - then;
	return {
		now,
		delta,
	};
};

const animate = (then: number = 0) => {
	window.requestAnimationFrame(animate.bind(then));
	const { now, delta } = getIntervalData(then);

	if (delta >= INTERVAL) {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		particles.forEach((particle) => {
			particle.update();
			particle.draw();
		});

		then = now - (delta % INTERVAL);
	}
};

const init = () => {
	canvasWidth = innerWidth;
	canvasHeight = innerHeight;
	setCanvasSize(canvas, ctx, canvasWidth, canvasHeight);

	const total = canvasWidth / 50;
	particles = Array.from({ length: total }, () => new Particle(ctx));
};

window.addEventListener('load', () => {
	init();
	setGUI();
	animate();
});

window.addEventListener('resize', () => {
	init();
});
