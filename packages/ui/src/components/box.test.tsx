import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Box } from "./box";

afterEach(() => {
	cleanup();
});

describe("Box", () => {
	it("renders children", () => {
		render(<Box>Content</Box>);
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("renders as a div by default", () => {
		render(<Box data-testid="box">Content</Box>);
		expect(screen.getByTestId("box").tagName).toBe("DIV");
	});

	it("renders as child element with asChild", () => {
		render(
			<Box asChild>
				<section>Section content</section>
			</Box>,
		);
		expect(screen.getByText("Section content").tagName).toBe("SECTION");
	});
});

describe("Box a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(<Box>Accessible content</Box>);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
