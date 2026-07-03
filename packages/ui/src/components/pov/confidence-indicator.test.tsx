import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ConfidenceIndicator } from "./confidence-indicator";

afterEach(() => {
	cleanup();
});

describe("ConfidenceIndicator", () => {
	it("renders with level", () => {
		render(<ConfidenceIndicator level="high" />);
		expect(screen.getByText("High confidence")).toBeInTheDocument();
	});

	it("displays numeric score when provided", () => {
		render(<ConfidenceIndicator level="medium" score={72} />);
		expect(screen.getByText("72%")).toBeInTheDocument();
	});
});

describe("ConfidenceIndicator a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<div>
				<ConfidenceIndicator level="high" score={95} />
				<ConfidenceIndicator level="medium" />
				<ConfidenceIndicator level="low" />
				<ConfidenceIndicator level="uncertain" />
			</div>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
