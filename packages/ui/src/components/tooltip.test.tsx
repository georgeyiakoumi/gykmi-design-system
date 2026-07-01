import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

afterEach(() => {
	cleanup();
});

describe("Tooltip", () => {
	it("renders the trigger", () => {
		render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tooltip text</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
	});
});

describe("Tooltip a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tooltip text</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
