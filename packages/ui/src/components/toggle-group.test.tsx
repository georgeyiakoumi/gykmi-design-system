import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

afterEach(() => {
	cleanup();
});

describe("ToggleGroup", () => {
	it("renders group with items", () => {
		render(
			<ToggleGroup type="single" aria-label="Text alignment">
				<ToggleGroupItem value="left" aria-label="Left">
					L
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Centre">
					C
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Right">
					R
				</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByText("L")).toBeInTheDocument();
		expect(screen.getByText("C")).toBeInTheDocument();
		expect(screen.getByText("R")).toBeInTheDocument();
	});

	it("selects an item on click", () => {
		render(
			<ToggleGroup type="single" aria-label="Text alignment">
				<ToggleGroupItem value="left" aria-label="Left">
					L
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Centre">
					C
				</ToggleGroupItem>
			</ToggleGroup>,
		);
		const left = screen.getByText("L");
		expect(left).toHaveAttribute("data-state", "off");
		fireEvent.click(left);
		expect(left).toHaveAttribute("data-state", "on");
	});
});

describe("ToggleGroup a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<ToggleGroup type="single" aria-label="Text alignment">
				<ToggleGroupItem value="left" aria-label="Left">
					L
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Centre">
					C
				</ToggleGroupItem>
			</ToggleGroup>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
