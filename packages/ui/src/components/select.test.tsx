import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

afterEach(() => {
	cleanup();
});

describe("Select", () => {
	it("renders the trigger", () => {
		render(
			<Select>
				<SelectTrigger aria-label="Fruit">
					<SelectValue placeholder="Pick a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
				</SelectContent>
			</Select>,
		);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("displays placeholder text", () => {
		render(
			<Select>
				<SelectTrigger aria-label="Fruit">
					<SelectValue placeholder="Pick a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
				</SelectContent>
			</Select>,
		);
		expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
	});
});

describe("Select a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<Select>
				<SelectTrigger aria-label="Fruit">
					<SelectValue placeholder="Pick a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="apple">Apple</SelectItem>
				</SelectContent>
			</Select>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
