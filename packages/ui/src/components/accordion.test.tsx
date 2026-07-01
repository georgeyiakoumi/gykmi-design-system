import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

afterEach(() => {
	cleanup();
});

describe("Accordion", () => {
	it("renders accordion with triggers", () => {
		render(
			<Accordion type="single" collapsible>
				<AccordionItem value="one">
					<AccordionTrigger>Section one</AccordionTrigger>
					<AccordionContent>Content one</AccordionContent>
				</AccordionItem>
			</Accordion>,
		);
		expect(screen.getByRole("button", { name: /Section one/i })).toBeInTheDocument();
	});

	it("expands content on trigger click", () => {
		render(
			<Accordion type="single" collapsible>
				<AccordionItem value="one">
					<AccordionTrigger>Section one</AccordionTrigger>
					<AccordionContent>Content one</AccordionContent>
				</AccordionItem>
			</Accordion>,
		);
		fireEvent.click(screen.getByRole("button", { name: /Section one/i }));
		expect(screen.getByText("Content one")).toBeInTheDocument();
	});
});

describe("Accordion a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Accordion type="single" collapsible>
				<AccordionItem value="one">
					<AccordionTrigger>Section one</AccordionTrigger>
					<AccordionContent>Content one</AccordionContent>
				</AccordionItem>
			</Accordion>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
