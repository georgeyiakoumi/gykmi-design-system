"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const Tabs = TabsPrimitive.Root;

export interface TabsListProps extends ComponentPropsWithRef<typeof TabsPrimitive.List> {}

export const TabsList = forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
	({ className, ...props }, ref) => {
		return (
			<TabsPrimitive.List
				ref={ref}
				className={cn(
					"inline-flex h-10 items-center justify-center rounded-md bg-surface-raised p-1 text-text-weak",
					className,
				)}
				{...props}
			/>
		);
	},
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends ComponentPropsWithRef<typeof TabsPrimitive.Trigger> {}

export const TabsTrigger = forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, ...props }, ref) => {
	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
				"ring-offset-surface-base transition-all duration-150",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				"data-[state=active]:bg-surface-base data-[state=active]:text-text data-[state=active]:shadow-sm",
				className,
			)}
			{...props}
		/>
	);
});

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends ComponentPropsWithRef<typeof TabsPrimitive.Content> {}

export const TabsContent = forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(({ className, ...props }, ref) => {
	return (
		<TabsPrimitive.Content
			ref={ref}
			className={cn(
				"mt-2 ring-offset-surface-base",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				className,
			)}
			{...props}
		/>
	);
});

TabsContent.displayName = "TabsContent";
