import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

afterEach(() => {
	cleanup();
});

describe("Popover", () => {
	it("renders the trigger", () => {
		render(
			<Popover>
				<PopoverTrigger>Open popover</PopoverTrigger>
				<PopoverContent>Popover body</PopoverContent>
			</Popover>,
		);
		expect(screen.getByRole("button", { name: "Open popover" })).toBeInTheDocument();
	});

	it("opens on trigger click", () => {
		render(
			<Popover>
				<PopoverTrigger>Open</PopoverTrigger>
				<PopoverContent>Popover content</PopoverContent>
			</Popover>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByText("Popover content")).toBeInTheDocument();
	});
});

describe("Popover a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<Popover>
				<PopoverTrigger>Open popover</PopoverTrigger>
				<PopoverContent>Content</PopoverContent>
			</Popover>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
