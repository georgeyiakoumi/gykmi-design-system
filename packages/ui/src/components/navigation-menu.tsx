"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface NavigationMenuProps
	extends ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root> {}

export const NavigationMenu = forwardRef<
	React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
	NavigationMenuProps
>(({ className, children, ...props }, ref) => {
	return (
		<NavigationMenuPrimitive.Root
			ref={ref}
			className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
			{...props}
		>
			{children}
			<NavigationMenuViewport />
		</NavigationMenuPrimitive.Root>
	);
});

NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = forwardRef<
	React.ComponentRef<typeof NavigationMenuPrimitive.List>,
	ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => {
	return (
		<NavigationMenuPrimitive.List
			ref={ref}
			className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
			{...props}
		/>
	);
});

NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = forwardRef<
	React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
	ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
	return (
		<NavigationMenuPrimitive.Trigger
			ref={ref}
			className={cn(
				"group inline-flex h-10 w-max items-center justify-center rounded-md bg-surface-base px-4 py-2 text-sm font-medium text-text-strong",
				"transition-colors duration-150",
				"hover:bg-surface-raised hover:text-text",
				"focus:bg-surface-raised focus:text-text focus:outline-none",
				"disabled:pointer-events-none disabled:opacity-50",
				"data-[state=open]:bg-surface-raised",
				className,
			)}
			{...props}
		>
			{children}
		</NavigationMenuPrimitive.Trigger>
	);
});

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = forwardRef<
	React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
	ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
	return (
		<NavigationMenuPrimitive.Content
			ref={ref}
			className={cn(
				"left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto",
				className,
			)}
			{...props}
		/>
	);
});

NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export const NavigationMenuViewport = forwardRef<
	React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
	ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => {
	return (
		<div className="absolute left-0 top-full flex justify-center">
			<NavigationMenuPrimitive.Viewport
				ref={ref}
				className={cn(
					"origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border-weak bg-surface-base shadow-lg",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95",
					"md:w-[var(--radix-navigation-menu-viewport-width)]",
					className,
				)}
				{...props}
			/>
		</div>
	);
});

NavigationMenuViewport.displayName = "NavigationMenuViewport";
