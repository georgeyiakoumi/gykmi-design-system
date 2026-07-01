import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Disclaimer } from "./disclaimer";

afterEach(() => {
	cleanup();
});

describe("Disclaimer", () => {
	it("renders with variant", () => {
		render(
			<Disclaimer variant="warning" title="Caution">
				Handle with care.
			</Disclaimer>,
		);
		expect(screen.getByText("Caution")).toBeInTheDocument();
	});

	it("has role note", () => {
		render(<Disclaimer>General disclaimer text.</Disclaimer>);
		expect(screen.getByRole("note")).toBeInTheDocument();
	});
});

describe("Disclaimer a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<div>
				<Disclaimer variant="info" title="Info">
					Informational.
				</Disclaimer>
				<Disclaimer variant="warning" title="Warning">
					Warning text.
				</Disclaimer>
				<Disclaimer variant="regulatory" title="Regulatory">
					Regulatory text.
				</Disclaimer>
			</div>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
