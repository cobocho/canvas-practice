import { useRef, useEffect } from 'react';

export const useCanvas = (
	width: number,
	height: number,
	animate: (then: number, ctx: CanvasRenderingContext2D) => void
) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const resizeCanvas = () => {
		const dpr = window.devicePixelRatio;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');

		if (canvas && ctx) {
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
			canvas.width = width * devicePixelRatio;
			canvas.height = height * devicePixelRatio;

			ctx.scale(dpr, dpr);
			animate(0, ctx);
		}
	};

	useEffect(() => {
		resizeCanvas();
	}, [height, width]);

	return canvasRef;
};
