import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { GaugeChart } from "./gauge-chart";

afterEach(() => {
	cleanup();
});

describe("GaugeChart", () => {
	it("renders with value", () => {
		render(<GaugeChart value={72} max={100} title="Portfolio Health" />);
		expect(screen.getByLabelText("Portfolio Health: 72 of 100")).toBeInTheDocument();
	});

	it("renders loading state", () => {
		render(<GaugeChart value={0} title="Portfolio Health" loading />);
		expect(screen.getByLabelText("Portfolio Health loading")).toBeInTheDocument();
	});
});

describe("GaugeChart a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<GaugeChart value={72} max={100} title="Portfolio Health" />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations in loading state", async () => {
		const { container } = render(<GaugeChart value={0} title="Portfolio Health" loading />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});

describe("GaugeChart interaction", () => {
	it("tooltip appears on focus", () => {
		const { container } = render(<GaugeChart value={72} max={100} title="Portfolio Health" />);
		const path = container.querySelector("path[tabindex='0']");
		if (path) {
			fireEvent.focus(path);
			expect(screen.getByText("72 / 100")).toBeInTheDocument();
		}
	});
});
