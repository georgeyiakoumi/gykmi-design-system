import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

afterEach(() => {
	cleanup();
});

describe("Tabs", () => {
	it("renders tabs with triggers and content", () => {
		render(
			<Tabs defaultValue="one">
				<TabsList>
					<TabsTrigger value="one">Tab one</TabsTrigger>
					<TabsTrigger value="two">Tab two</TabsTrigger>
				</TabsList>
				<TabsContent value="one">Content one</TabsContent>
				<TabsContent value="two">Content two</TabsContent>
			</Tabs>,
		);
		expect(screen.getByRole("tab", { name: "Tab one" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Tab two" })).toBeInTheDocument();
		expect(screen.getByText("Content one")).toBeInTheDocument();
	});

	it("marks the default tab as active", () => {
		render(
			<Tabs defaultValue="one">
				<TabsList>
					<TabsTrigger value="one">Tab one</TabsTrigger>
					<TabsTrigger value="two">Tab two</TabsTrigger>
				</TabsList>
				<TabsContent value="one">Content one</TabsContent>
				<TabsContent value="two">Content two</TabsContent>
			</Tabs>,
		);
		expect(screen.getByRole("tab", { name: "Tab one" })).toHaveAttribute("aria-selected", "true");
		expect(screen.getByRole("tab", { name: "Tab two" })).toHaveAttribute("aria-selected", "false");
	});
});

describe("Tabs a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Tabs defaultValue="one">
				<TabsList>
					<TabsTrigger value="one">Tab one</TabsTrigger>
					<TabsTrigger value="two">Tab two</TabsTrigger>
				</TabsList>
				<TabsContent value="one">Content one</TabsContent>
				<TabsContent value="two">Content two</TabsContent>
			</Tabs>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
