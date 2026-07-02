import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { BulletChart } from "./bullet-chart";

afterEach(() => {
	cleanup();
});

describe("BulletChart", () => {
	it("renders with values", () => {
		render(<BulletChart actual={78} target={90} ranges={[60, 80, 100]} title="Revenue Target" />);
		expect(screen.getByLabelText("Revenue Target: actual 78, target 90")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(
			<BulletChart actual={0} target={0} ranges={[60, 80, 100]} title="Revenue Target" loading />,
		);
		expect(screen.getByLabelText("Revenue Target loading")).toBeInTheDocument();
	});
});

describe("BulletChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<BulletChart actual={78} target={90} ranges={[60, 80, 100]} title="Revenue Target" />,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(
			<BulletChart actual={0} target={0} ranges={[60, 80, 100]} title="Revenue Target" loading />,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
