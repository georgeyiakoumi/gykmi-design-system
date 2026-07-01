import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

afterEach(() => {
	cleanup();
});

describe("Avatar", () => {
	it("renders the fallback", () => {
		render(
			<Avatar>
				<AvatarImage src="invalid.jpg" alt="User" />
				<AvatarFallback>GY</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByText("GY")).toBeInTheDocument();
	});

	it("applies custom className", () => {
		render(
			<Avatar data-testid="avatar" className="h-16 w-16">
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>,
		);
		expect(screen.getByTestId("avatar").className).toContain("h-16");
	});
});

describe("Avatar a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<Avatar>
				<AvatarFallback>GY</AvatarFallback>
			</Avatar>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
