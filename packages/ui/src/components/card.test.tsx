import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

afterEach(() => {
	cleanup();
});

describe("Card", () => {
	it("renders a complete card composition", () => {
		render(
			<Card>
				<CardHeader>
					<CardTitle>Title</CardTitle>
				</CardHeader>
				<CardContent>Body content</CardContent>
				<CardFooter>Footer content</CardFooter>
			</Card>,
		);
		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Body content")).toBeInTheDocument();
		expect(screen.getByText("Footer content")).toBeInTheDocument();
	});

	it("renders CardTitle as an h3", () => {
		render(
			<Card>
				<CardHeader>
					<CardTitle>Heading</CardTitle>
				</CardHeader>
			</Card>,
		);
		expect(screen.getByText("Heading").tagName).toBe("H3");
	});
});

describe("Card a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Card>
				<CardHeader>
					<CardTitle>Accessible card</CardTitle>
				</CardHeader>
				<CardContent>Content here</CardContent>
			</Card>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
