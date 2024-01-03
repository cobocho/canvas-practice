export const randomBetween = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

export const hypotenuse = (x: number, y: number) => {
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
