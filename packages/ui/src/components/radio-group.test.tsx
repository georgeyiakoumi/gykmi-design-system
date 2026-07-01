import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { RadioGroup, RadioGroupItem } from "./radio-group";

afterEach(() => {
	cleanup();
});

describe("RadioGroup", () => {
	it("renders radio items", () => {
		render(
			<RadioGroup aria-label="Colour">
				<RadioGroupItem value="red" aria-label="Red" />
				<RadioGroupItem value="blue" aria-label="Blue" />
			</RadioGroup>,
		);
		expect(screen.getAllByRole("radio")).toHaveLength(2);
	});

	it("selects an item on click", () => {
		render(
			<RadioGroup aria-label="Colour">
				<RadioGroupItem value="red" aria-label="Red" />
				<RadioGroupItem value="blue" aria-label="Blue" />
			</RadioGroup>,
		);
		const red = screen.getByRole("radio", { name: "Red" });
		fireEvent.click(red);
		expect(red).toBeChecked();
	});
});

describe("RadioGroup a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<RadioGroup aria-label="Colour">
				<RadioGroupItem value="red" aria-label="Red" />
				<RadioGroupItem value="blue" aria-label="Blue" />
			</RadioGroup>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
