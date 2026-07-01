import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

afterEach(() => {
	cleanup();
});

describe("Dialog", () => {
	it("renders the trigger", () => {
		render(
			<Dialog>
				<DialogTrigger>Open dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Title</DialogTitle>
						<DialogDescription>Description</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>,
		);
		expect(screen.getByRole("button", { name: "Open dialog" })).toBeInTheDocument();
	});

	it("opens on trigger click", () => {
		render(
			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog title</DialogTitle>
						<DialogDescription>Dialog body</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Dialog title")).toBeInTheDocument();
	});
});

describe("Dialog a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<Dialog>
				<DialogTrigger>Open dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Title</DialogTitle>
						<DialogDescription>Description</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
