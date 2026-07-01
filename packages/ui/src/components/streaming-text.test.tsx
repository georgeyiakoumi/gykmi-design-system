import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { StreamingText } from "./streaming-text";

afterEach(() => {
	cleanup();
});

describe("StreamingText", () => {
	it("renders with status", () => {
		render(<StreamingText status="idle">Hello world</StreamingText>);
		expect(screen.getByText("Hello world")).toBeInTheDocument();
	});

	it("sets aria-busy when streaming", () => {
		render(<StreamingText status="streaming">Loading…</StreamingText>);
		const el = screen.getByRole("status");
		expect(el).toHaveAttribute("aria-busy", "true");
	});
});

describe("StreamingText a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<StreamingText status="streaming">Generating analysis…</StreamingText>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
