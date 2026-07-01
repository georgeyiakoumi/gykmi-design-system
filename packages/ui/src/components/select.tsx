"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps extends ComponentPropsWithRef<typeof SelectPrimitive.Trigger> {}

export const SelectTrigger = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Trigger>,
	SelectTriggerProps
>(({ className, children, ...props }, ref) => {
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex h-10 w-full items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm text-text",
				"placeholder:text-text-muted",
				"focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					className="opacity-50"
					aria-hidden="true"
				>
					<title>chevron</title>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
});

SelectTrigger.displayName = "SelectTrigger";

export interface SelectContentProps extends ComponentPropsWithRef<typeof SelectPrimitive.Content> {}

export const SelectContent = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Content>,
	SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				position={position}
				className={cn(
					"relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					position === "popper" && "max-h-[var(--radix-select-content-available-height)]",
					className,
				)}
				{...props}
			>
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
});

SelectContent.displayName = "SelectContent";

export interface SelectItemProps extends ComponentPropsWithRef<typeof SelectPrimitive.Item> {}

export const SelectItem = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Item>,
	SelectItemProps
>(({ className, children, ...props }, ref) => {
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-text outline-none",
				"focus:bg-surface-raised focus:text-text",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
						<title>selected</title>
						<path
							d="M10 3L4.5 8.5L2 6"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
});

SelectItem.displayName = "SelectItem";
