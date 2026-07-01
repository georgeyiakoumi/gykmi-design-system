import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./menubar";

afterEach(() => {
	cleanup();
});

describe("Menubar", () => {
	it("renders the menubar with triggers", () => {
		render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>,
		);
		expect(screen.getByRole("menubar")).toBeInTheDocument();
		expect(screen.getByText("File")).toBeInTheDocument();
	});

	it("trigger has correct data-state", () => {
		render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>,
		);
		expect(screen.getByText("File")).toHaveAttribute("data-state", "closed");
	});
});

describe("Menubar a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
