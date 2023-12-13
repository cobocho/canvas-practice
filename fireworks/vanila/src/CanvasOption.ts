class CanvasOption {
	protected readonly canvas = document.querySelector('canvas')!;

	protected readonly ctx = this.canvas.getContext('2d')!;

	protected readonly dpr = window.devicePixelRatio;

	protected readonly FPS = 60;

	protected readonly INTERVAL = 1000 / this.FPS;

	protected canvasWidth = innerWidth;

	protected canvasHeight = innerHeight;

	bgColor = '#000000';
}

export default CanvasOption;
