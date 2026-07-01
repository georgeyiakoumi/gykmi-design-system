import { expect, test } from "@playwright/test";

test.describe("Financial Dashboard", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("renders the dashboard header", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Financial Dashboard" })).toBeVisible();
		await expect(page.getByText("Portfolio overview and AI-generated analysis")).toBeVisible();
	});

	test("shows compliance warning banner", async ({ page }) => {
		await expect(page.getByText("Stale data detected")).toBeVisible();
	});

	test("displays summary cards", async ({ page }) => {
		await expect(page.getByText("$142.8M")).toBeVisible();
		await expect(page.getByRole("heading", { name: "847" })).toBeVisible();
		await expect(page.getByText("+$2.4M")).toBeVisible();
	});

	test("shows AI analysis section with confidence", async ({ page }) => {
		await expect(page.getByText("Q3 2026 Revenue Forecast")).toBeVisible();
		await expect(page.getByText("92%").first()).toBeVisible();
	});

	test("navigates to transactions tab", async ({ page }) => {
		await page.getByRole("tab", { name: "Transactions" }).click();
		await expect(page.getByRole("heading", { name: "Recent Transactions" })).toBeVisible();
		await expect(page.getByText("Citadel Securities")).toBeVisible();
	});

	test("navigates to audit trail tab", async ({ page }) => {
		await page.getByRole("tab", { name: "Audit Trail" }).click();
		await expect(page.getByText("Generated Q3 forecast")).toBeVisible();
	});

	test("shows regulatory notice at the bottom", async ({ page }) => {
		await expect(page.getByText("FRN-123456")).toBeVisible();
		await expect(page.getByText("Financial Conduct Authority")).toBeVisible();
	});

	test("toggles between light and dark theme", async ({ page }) => {
		const html = page.locator("html");
		await expect(html).toHaveAttribute("data-theme", "light");

		await page.getByRole("button", { name: /dark/i }).click();
		await expect(html).toHaveAttribute("data-theme", "dark");

		await page.getByRole("button", { name: /light/i }).click();
		await expect(html).toHaveAttribute("data-theme", "light");
	});
});
