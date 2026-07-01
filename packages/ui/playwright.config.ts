import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	use: {
		baseURL: "http://localhost:6006",
	},
	webServer: {
		command: "pnpm --filter @gykmi/docs storybook --ci",
		port: 6006,
		reuseExistingServer: !process.env.CI,
		timeout: 60000,
	},
	expect: {
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01,
		},
	},
});
