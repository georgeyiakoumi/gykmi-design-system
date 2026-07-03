import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { DataProvenance } from "./data-provenance";

afterEach(() => {
	cleanup();
});

describe("DataProvenance", () => {
	it("renders with sources", () => {
		const sources = [
			{ name: "Bloomberg Terminal", version: "3.1", verified: true },
			{ name: "Reuters Feed", verified: false },
		];
		render(<DataProvenance sources={sources} />);
		expect(screen.getByText("Bloomberg Terminal")).toBeInTheDocument();
		expect(screen.getByText("Reuters Feed")).toBeInTheDocument();
	});

	it("uses aria-label for section label", () => {
		const sources = [{ name: "Source A" }];
		render(<DataProvenance sources={sources} label="Custom sources" />);
		const list = screen.getByRole("list", { name: "Custom sources" });
		expect(list).toHaveAttribute("aria-label", "Custom sources");
	});
});

describe("DataProvenance a11y", () => {
	it("has no axe violations", async () => {
		const sources = [
			{ name: "Bloomberg Terminal", version: "3.1", verified: true },
			{ name: "Reuters Feed", lastUpdated: "2025-06-01", verified: false },
		];
		const { container } = render(<DataProvenance sources={sources} />);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
