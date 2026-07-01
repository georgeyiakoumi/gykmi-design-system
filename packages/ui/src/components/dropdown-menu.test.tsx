import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

afterEach(() => {
	cleanup();
});

describe("DropdownMenu", () => {
	it("renders the trigger", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);
		expect(screen.getByRole("button", { name: "Actions" })).toBeInTheDocument();
	});

	it("has correct aria attributes on trigger", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);
		const trigger = screen.getByRole("button", { name: "Actions" });
		expect(trigger).toHaveAttribute("aria-haspopup", "menu");
	});
});

describe("DropdownMenu a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<DropdownMenu>
				<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Edit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
