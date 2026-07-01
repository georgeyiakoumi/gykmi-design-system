import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Slider } from "./slider";

afterEach(() => {
	cleanup();
});

describe("Slider", () => {
	it("renders", () => {
		render(<Slider defaultValue={[50]} aria-label="Volume" />);
		expect(screen.getByRole("slider")).toBeInTheDocument();
	});

	it("reflects the default value", () => {
		render(<Slider defaultValue={[75]} aria-label="Brightness" />);
		const slider = screen.getByRole("slider");
		expect(slider).toHaveAttribute("aria-valuenow", "75");
	});
});

describe("Slider a11y", () => {
	it("has correct aria value attributes", () => {
		render(<Slider defaultValue={[50]} aria-label="Volume" />);
		const slider = screen.getByRole("slider");
		expect(slider).toHaveAttribute("aria-valuemin", "0");
		expect(slider).toHaveAttribute("aria-valuemax", "100");
		expect(slider).toHaveAttribute("aria-valuenow", "50");
	});
});
