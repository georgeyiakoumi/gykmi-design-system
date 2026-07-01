import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./alert-dialog";

afterEach(() => {
	cleanup();
});

describe("AlertDialog", () => {
	it("renders the trigger", () => {
		render(
			<AlertDialog>
				<AlertDialogTrigger>Delete</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Confirm</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>,
		);
		expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
	});

	it("trigger has correct aria attributes", () => {
		render(
			<AlertDialog>
				<AlertDialogTrigger>Delete</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
					</AlertDialogHeader>
				</AlertDialogContent>
			</AlertDialog>,
		);
		const trigger = screen.getByRole("button", { name: "Delete" });
		expect(trigger).toHaveAttribute("data-state", "closed");
	});
});

describe("AlertDialog a11y", () => {
	it("has no axe violations on trigger", async () => {
		const { container } = render(
			<AlertDialog>
				<AlertDialogTrigger>Delete</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
					</AlertDialogHeader>
				</AlertDialogContent>
			</AlertDialog>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
