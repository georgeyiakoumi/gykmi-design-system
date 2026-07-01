import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement ResizeObserver (needed by Radix Slider)
global.ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
};
