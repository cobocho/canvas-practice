import dat from 'dat.gui';
import Particle from './Particle';

const setupGUI = (particles: Particle[]) => {
	const feGaussianBlur = document.querySelector('feGaussianBlur')!;
	const feColorMatrix = document.querySelector('feColorMatrix')!;
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

export default setupGUI;
