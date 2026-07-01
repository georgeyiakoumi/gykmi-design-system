import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "./context-menu";

afterEach(() => {
	cleanup();
});

describe("ContextMenu", () => {
	it("renders the trigger", () => {
		render(
			<ContextMenu>
				<ContextMenuTrigger>
					<span>Right click me</span>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Edit</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>,
		);
		expect(screen.getByText("Right click me")).toBeInTheDocument();
	});

	it("trigger has data-state attribute", () => {
		render(
			<ContextMenu>
				<ContextMenuTrigger data-testid="ctx-trigger">
					<span>Right click me</span>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Edit</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>,
		);
		expect(screen.getByTestId("ctx-trigger")).toHaveAttribute("data-state", "closed");
	});
});

describe("ContextMenu a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<ContextMenu>
				<ContextMenuTrigger>
					<span>Right click me</span>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Edit</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
