"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export interface ContextMenuContentProps
	extends ComponentPropsWithRef<typeof ContextMenuPrimitive.Content> {}

export const ContextMenuContent = forwardRef<
	React.ComponentRef<typeof ContextMenuPrimitive.Content>,
	ContextMenuContentProps
>(({ className, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				ref={ref}
				className={cn(
					"z-50 min-w-[8rem] overflow-hidden rounded-md border border-border-weak bg-surface-base p-1 shadow-md",
					"animate-in fade-in-0 zoom-in-95",
					className,
				)}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	);
});

ContextMenuContent.displayName = "ContextMenuContent";

export interface ContextMenuItemProps
	extends ComponentPropsWithRef<typeof ContextMenuPrimitive.Item> {
	inset?: boolean;
}

export const ContextMenuItem = forwardRef<
	React.ComponentRef<typeof ContextMenuPrimitive.Item>,
	ContextMenuItemProps
>(({ className, inset, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-text-strong outline-none",
				"focus:bg-surface-raised focus:text-text-strong",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
});

ContextMenuItem.displayName = "ContextMenuItem";

export interface ContextMenuSeparatorProps
	extends ComponentPropsWithRef<typeof ContextMenuPrimitive.Separator> {}

export const ContextMenuSeparator = forwardRef<
	React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
	ContextMenuSeparatorProps
>(({ className, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
});

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export interface ContextMenuLabelProps
	extends ComponentPropsWithRef<typeof ContextMenuPrimitive.Label> {
	inset?: boolean;
}

export const ContextMenuLabel = forwardRef<
	React.ComponentRef<typeof ContextMenuPrimitive.Label>,
	ContextMenuLabelProps
>(({ className, inset, ...props }, ref) => {
	return (
		<ContextMenuPrimitive.Label
			ref={ref}
			className={cn("px-2 py-1.5 text-sm font-semibold text-text-strong", inset && "pl-8", className)}
			{...props}
		/>
	);
});

ContextMenuLabel.displayName = "ContextMenuLabel";
