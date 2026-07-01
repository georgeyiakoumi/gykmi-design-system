import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

afterEach(() => {
	cleanup();
});

describe("HoverCard", () => {
	it("renders the trigger", () => {
		render(
			<HoverCard>
				<HoverCardTrigger asChild>
					<a href="#profile">@george</a>
				</HoverCardTrigger>
				<HoverCardContent>Profile info</HoverCardContent>
			</HoverCard>,
		);
		expect(screen.getByText("@george")).toBeInTheDocument();
	});

	it("trigger is a link element", () => {
		render(
			<HoverCard>
				<HoverCardTrigger asChild>
					<a href="#profile">@george</a>
				</HoverCardTrigger>
				<HoverCardContent>Profile info</HoverCardContent>
			</HoverCard>,
		);
		expect(screen.getByRole("link", { name: "@george" })).toBeInTheDocument();
	});
});

describe("HoverCard a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<HoverCard>
				<HoverCardTrigger asChild>
					<a href="#profile">@george</a>
				</HoverCardTrigger>
				<HoverCardContent>Profile info</HoverCardContent>
			</HoverCard>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
