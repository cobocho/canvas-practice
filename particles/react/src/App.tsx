/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import Particles from './components/Particles/Particles';
import { css } from '@emotion/react';

function App() {
	const [width, setWidth] = useState(innerWidth);
	const [height, setHeight] = useState(innerHeight);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(innerWidth);
			setHeight(innerHeight);
		});
	});

	return (
		<div
			css={css`
				width: 100%;
				height: 100%;
				margin: 0;
				overflow: hidden;
			`}
		>
			<Particles
				width={width}
				height={height}
			/>
		</div>
	);
}

export default App;
