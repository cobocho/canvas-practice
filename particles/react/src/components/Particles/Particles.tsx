/** @jsxImportSource @emotion/react */
import Particle from './Particle';
import { css } from '@emotion/react';
import { useCanvas } from '../../hooks/useCanvas';
import { INTERVAL, getIntervalData } from '../../canvas/animate';
import { useEffect } from 'react';
import setupGUI from './setupGui';

interface Props {
	width: number;
	height: number;
}

const Particles = ({ width, height }: Props) => {
	const animate = (then = 0, ctx: CanvasRenderingContext2D) => {
		window.requestAnimationFrame(() => animate(then, ctx));
		const { now, delta } = getIntervalData(then);

		if (delta >= INTERVAL) {
			ctx.clearRect(0, 0, width, height);

			particles.forEach((particle) => {
				particle.update();
				particle.draw(ctx);
			});

			then = now - (delta % INTERVAL);
		}
	};

	const canvasRef = useCanvas(width, height, animate);
	const total = width / 50;
	const particles = Array.from({ length: total }, () => new Particle());

	useEffect(() => {
		setupGUI(particles);
	}, [particles]);

	return (
		<canvas
			ref={canvasRef}
			css={css`
				filter: url('#gooey');
			`}
		>
			<svg>
				<defs>
					<filter id="gooey">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="10"
							result="blur1"
						/>
						<feColorMatrix
							in="blur1"
							type="matrix"
							values="
								1 0 0 0 0  
								0 1 0 0 0  
								0 0 1 0 0  
								0 0 0 100 -23
							"
						/>
					</filter>
				</defs>
			</svg>
		</canvas>
	);
};

export default Particles;
