import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "./toolbar";

afterEach(() => {
	cleanup();
});

describe("Toolbar", () => {
	it("renders the toolbar with buttons", () => {
		render(
			<Toolbar aria-label="Formatting">
				<ToolbarButton>Bold</ToolbarButton>
				<ToolbarSeparator />
				<ToolbarButton>Italic</ToolbarButton>
			</Toolbar>,
		);
		expect(screen.getByRole("toolbar")).toBeInTheDocument();
		expect(screen.getByText("Bold")).toBeInTheDocument();
		expect(screen.getByText("Italic")).toBeInTheDocument();
	});

	it("toolbar buttons are clickable", () => {
		render(
			<Toolbar aria-label="Actions">
				<ToolbarButton>Save</ToolbarButton>
			</Toolbar>,
		);
		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});
});

describe("Toolbar a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Toolbar aria-label="Formatting">
				<ToolbarButton>Bold</ToolbarButton>
				<ToolbarButton>Italic</ToolbarButton>
			</Toolbar>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
