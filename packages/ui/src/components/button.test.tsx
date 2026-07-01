import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "./button";

afterEach(() => {
	cleanup();
});

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = { current: null as HTMLButtonElement | null };
		render(<Button ref={ref}>Ref test</Button>);
		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});

	it("calls onClick when clicked", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click</Button>);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledOnce();
	});

	it("does not call onClick when disabled", () => {
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("sets aria-disabled when disabled", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
	});

	it("sets aria-busy when loading", () => {
		render(<Button loading>Loading</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
	});

	it("is disabled when loading", () => {
		render(<Button loading>Loading</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("renders as child element with asChild", () => {
		render(
			<Button asChild>
				<a href="/test">View test page</a>
			</Button>,
		);
		const link = screen.getByRole("link", { name: "View test page" });
		expect(link).toBeInTheDocument();
		expect(link.tagName).toBe("A");
	});

	it("applies variant classes", () => {
		const { rerender } = render(<Button variant="default">Default</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("bg-action");

		rerender(<Button variant="danger">Danger</Button>);
		expect(screen.getByRole("button").className).toContain("bg-danger");
	});

	it("applies size classes", () => {
		render(<Button size="sm">Small</Button>);
		expect(screen.getByRole("button").className).toContain("h-8");
	});
});

describe("Button a11y", () => {
	it("has no axe violations (primary)", async () => {
		const { container } = render(<Button>Accessible</Button>);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations (disabled)", async () => {
		const { container } = render(<Button disabled>Disabled</Button>);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});

	it("has no axe violations (all variants)", async () => {
		const { container } = render(
			<div>
				<Button variant="default">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="danger">Danger</Button>
				<Button variant="ghost">Ghost</Button>
			</div>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
