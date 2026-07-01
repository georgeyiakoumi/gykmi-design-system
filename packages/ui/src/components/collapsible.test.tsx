import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

afterEach(() => {
	cleanup();
});

describe("Collapsible", () => {
	it("renders the trigger", () => {
		render(
			<Collapsible>
				<CollapsibleTrigger>Toggle</CollapsibleTrigger>
				<CollapsibleContent>Hidden content</CollapsibleContent>
			</Collapsible>,
		);
		expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
	});

	it("expands content on trigger click", () => {
		render(
			<Collapsible>
				<CollapsibleTrigger>Toggle</CollapsibleTrigger>
				<CollapsibleContent>Hidden content</CollapsibleContent>
			</Collapsible>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Toggle" }));
		expect(screen.getByText("Hidden content")).toBeInTheDocument();
	});
});

describe("Collapsible a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Collapsible>
				<CollapsibleTrigger>Toggle</CollapsibleTrigger>
				<CollapsibleContent>Hidden content</CollapsibleContent>
			</Collapsible>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
