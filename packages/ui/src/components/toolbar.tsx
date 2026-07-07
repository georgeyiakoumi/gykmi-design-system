"use client";

import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface ToolbarProps extends ComponentPropsWithRef<typeof ToolbarPrimitive.Root> {}

export const Toolbar = forwardRef<React.ComponentRef<typeof ToolbarPrimitive.Root>, ToolbarProps>(
	({ className, ...props }, ref) => {
		return (
			<ToolbarPrimitive.Root
				ref={ref}
				className={cn(
					"flex w-full min-w-max items-center gap-1 rounded-md border border-border-weak bg-surface-base p-1",
					className,
				)}
				{...props}
			/>
		);
	},
);

Toolbar.displayName = "Toolbar";

export const ToolbarButton = forwardRef<
	React.ComponentRef<typeof ToolbarPrimitive.Button>,
	ComponentPropsWithRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => {
	return (
		<ToolbarPrimitive.Button
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center rounded-sm px-2 py-1.5 text-sm font-medium text-text-strong",
				"hover:bg-fill-hover",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
				"disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
});

ToolbarButton.displayName = "ToolbarButton";

export const ToolbarSeparator = forwardRef<
	React.ComponentRef<typeof ToolbarPrimitive.Separator>,
	ComponentPropsWithRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => {
	return (
		<ToolbarPrimitive.Separator
			ref={ref}
			className={cn("mx-1 h-5 w-px bg-border", className)}
			{...props}
		/>
	);
});

ToolbarSeparator.displayName = "ToolbarSeparator";

export const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup;
export const ToolbarToggleItem = forwardRef<
	React.ComponentRef<typeof ToolbarPrimitive.ToggleItem>,
	ComponentPropsWithRef<typeof ToolbarPrimitive.ToggleItem>
>(({ className, ...props }, ref) => {
	return (
		<ToolbarPrimitive.ToggleItem
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center rounded-sm px-2 py-1.5 text-sm font-medium text-text-weak",
				"hover:bg-fill-hover hover:text-text-strong",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
				"data-[state=on]:bg-fill-press data-[state=on]:text-text-strong",
				"disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
});

ToolbarToggleItem.displayName = "ToolbarToggleItem";

export const ToolbarLink = forwardRef<
	React.ComponentRef<typeof ToolbarPrimitive.Link>,
	ComponentPropsWithRef<typeof ToolbarPrimitive.Link>
>(({ className, ...props }, ref) => {
	return (
		<ToolbarPrimitive.Link
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center px-2 py-1.5 text-sm text-text-weak underline-offset-4",
				"hover:text-text-strong hover:underline",
				className,
			)}
			{...props}
		/>
	);
});

ToolbarLink.displayName = "ToolbarLink";
