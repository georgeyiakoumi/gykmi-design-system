"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export interface DropdownMenuContentProps
	extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content> {}

export const DropdownMenuContent = forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
	DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(
					"z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface p-1 shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
					"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
});

DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
	extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> {
	inset?: boolean;
}

export const DropdownMenuItem = forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
	DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-text outline-none",
				"focus:bg-surface-raised focus:text-text",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
});

DropdownMenuItem.displayName = "DropdownMenuItem";

export interface DropdownMenuSeparatorProps
	extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator> {}

export const DropdownMenuSeparator = forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
	DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export interface DropdownMenuLabelProps
	extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> {
	inset?: boolean;
}

export const DropdownMenuLabel = forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
	DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.Label
			ref={ref}
			className={cn("px-2 py-1.5 text-sm font-semibold text-text", inset && "pl-8", className)}
			{...props}
		/>
	);
});

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export interface DropdownMenuSubTriggerProps
	extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> {
	inset?: boolean;
}

export const DropdownMenuSubTrigger = forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
	DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.SubTrigger
			ref={ref}
			className={cn(
				"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-text outline-none",
				"focus:bg-surface-raised",
				"data-[state=open]:bg-surface-raised",
				inset && "pl-8",
				className,
			)}
			{...props}
		>
			{children}
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				className="ml-auto"
				aria-hidden="true"
			>
				<title>submenu</title>
				<path
					d="M6 4L10 8L6 12"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</DropdownMenuPrimitive.SubTrigger>
	);
});

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export interface DropdownMenuSubContentProps
	extends ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent> {}

export const DropdownMenuSubContent = forwardRef<
	React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
	DropdownMenuSubContentProps
>(({ className, ...props }, ref) => {
	return (
		<DropdownMenuPrimitive.SubContent
			ref={ref}
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface p-1 shadow-lg",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
});

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
