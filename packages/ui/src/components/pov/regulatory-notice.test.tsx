import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { RegulatoryNotice } from "./regulatory-notice";

afterEach(() => {
	cleanup();
});

describe("RegulatoryNotice", () => {
	it("renders with framework", () => {
		render(
			<RegulatoryNotice framework="FCA">
				This analysis is subject to FCA regulations.
			</RegulatoryNotice>,
		);
		expect(screen.getByText("FCA")).toBeInTheDocument();
	});

	it("has role contentinfo", () => {
		render(<RegulatoryNotice framework="MiFID II">Regulatory content.</RegulatoryNotice>);
		expect(screen.getByRole("contentinfo")).toBeInTheDocument();
	});
});

describe("RegulatoryNotice a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<RegulatoryNotice framework="SOX" reference="SOX-2025-001">
				Subject to Sarbanes-Oxley compliance requirements.
			</RegulatoryNotice>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
