import { expect, test } from "@playwright/test";

const components = [
	{ name: "Button", path: "components-button--default" },
	{ name: "Badge", path: "components-badge--all-variants" },
	{ name: "Card", path: "components-card--default" },
	{ name: "Input", path: "components-input--with-label" },
	{ name: "Checkbox", path: "components-checkbox--with-label" },
	{ name: "Switch", path: "components-switch--with-label" },
	{ name: "Tabs", path: "components-tabs--default" },
	{ name: "ConfidenceIndicator", path: "pov-confidenceindicator--all-levels" },
	{ name: "ModelError", path: "pov-modelerror--with-retry" },
	{ name: "ComplianceBanner", path: "pov-compliancebanner--all-severities" },
	{ name: "Disclaimer", path: "pov-disclaimer--all-variants" },
];

for (const { name, path } of components) {
	test(`${name} matches snapshot`, async ({ page }) => {
		await page.goto(`/iframe.html?id=${path}&viewMode=story`);
		await page.waitForSelector("[data-story-rendered]", { timeout: 10000 }).catch(() => {});
		await page.waitForTimeout(500);
		await expect(page.locator("#storybook-root")).toHaveScreenshot(`${name}.png`);
	});
}
