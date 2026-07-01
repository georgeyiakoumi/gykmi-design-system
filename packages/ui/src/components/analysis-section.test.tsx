import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { AnalysisSection } from "./analysis-section";

afterEach(() => {
	cleanup();
});

describe("AnalysisSection", () => {
	it("renders with title", () => {
		render(<AnalysisSection title="Risk Summary">Content here</AnalysisSection>);
		expect(screen.getByText("Risk Summary")).toBeInTheDocument();
	});

	it("sets aria-label from title", () => {
		render(<AnalysisSection title="Findings">Details</AnalysisSection>);
		const section = screen.getByRole("region", { name: "Findings" });
		expect(section).toHaveAttribute("aria-label", "Findings");
	});
});

describe("AnalysisSection a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<AnalysisSection title="Test Section" confidence="high" confidenceScore={90}>
				Sample analysis content.
			</AnalysisSection>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
