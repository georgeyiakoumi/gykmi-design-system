import { expect, test } from "@playwright/test";

const components = [
	{ name: "Button", path: "components-button--all-variants" },
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
		await page.waitForTimeout(2000);
		const root = page.locator("#storybook-root");
		await expect(root).toHaveScreenshot(`${name}.png`, { timeout: 10000 });
	});
}
