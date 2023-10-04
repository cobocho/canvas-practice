const FPS = 60;

export const INTERVAL = 1000 / FPS;

export const getIntervalData = (then: number) => {
	const now = Date.now();
	const delta = now - then;
	return {
		now,
		delta,
	};
};
