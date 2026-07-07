"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const Menubar = forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Root>,
	ComponentPropsWithRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<MenubarPrimitive.Root
			ref={ref}
			className={cn(
				"flex h-10 items-center gap-1 rounded-md border border-border-weak bg-surface-base p-1",
				className,
			)}
			{...props}
		/>
	);
});

Menubar.displayName = "Menubar";

export const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu;
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarSub = MenubarPrimitive.Sub;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

export interface MenubarTriggerProps
	extends ComponentPropsWithRef<typeof MenubarPrimitive.Trigger> {}

export const MenubarTrigger = forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Trigger>,
	MenubarTriggerProps
>(({ className, ...props }, ref) => {
	return (
		<MenubarPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium text-text-strong outline-none",
				"focus:bg-surface-raised focus:text-text-strong",
				"data-[state=open]:bg-surface-raised data-[state=open]:text-text-strong",
				className,
			)}
			{...props}
		/>
	);
});

MenubarTrigger.displayName = "MenubarTrigger";

export interface MenubarContentProps
	extends ComponentPropsWithRef<typeof MenubarPrimitive.Content> {}

export const MenubarContent = forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Content>,
	MenubarContentProps
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => {
	return (
		<MenubarPrimitive.Portal>
			<MenubarPrimitive.Content
				ref={ref}
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"z-50 min-w-[12rem] overflow-hidden rounded-md border border-border-weak bg-surface-base p-1 shadow-md",
					"data-[state=open]:animate-in data-[state=closed]:fade-out-0",
					"data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
					className,
				)}
				{...props}
			/>
		</MenubarPrimitive.Portal>
	);
});

MenubarContent.displayName = "MenubarContent";

export interface MenubarItemProps extends ComponentPropsWithRef<typeof MenubarPrimitive.Item> {
	inset?: boolean;
}

export const MenubarItem = forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Item>,
	MenubarItemProps
>(({ className, inset, ...props }, ref) => {
	return (
		<MenubarPrimitive.Item
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

MenubarItem.displayName = "MenubarItem";

export interface MenubarSeparatorProps
	extends ComponentPropsWithRef<typeof MenubarPrimitive.Separator> {}

export const MenubarSeparator = forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Separator>,
	MenubarSeparatorProps
>(({ className, ...props }, ref) => {
	return (
		<MenubarPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
});

MenubarSeparator.displayName = "MenubarSeparator";
