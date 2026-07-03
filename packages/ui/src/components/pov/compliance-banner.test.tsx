import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ComplianceBanner } from "./compliance-banner";

afterEach(() => {
	cleanup();
});

describe("ComplianceBanner", () => {
	it("renders with severity", () => {
		render(<ComplianceBanner severity="critical" title="Data breach detected" />);
		expect(screen.getByText("Data breach detected")).toBeInTheDocument();
	});

	it("has role alert", () => {
		render(<ComplianceBanner severity="warning" title="Compliance warning" />);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});
});

describe("ComplianceBanner a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<div>
				<ComplianceBanner severity="info" title="Information" description="Details here." />
				<ComplianceBanner
					severity="warning"
					title="Warning"
					description="Action recommended but not urgent."
					dismissible
				/>
				<ComplianceBanner
					severity="critical"
					title="Critical"
					description="Immediate attention required."
				/>
			</div>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
