"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface ScrollAreaProps extends ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root> {
	/** Additional classes for the scrollable viewport (e.g. scroll-fade) */
	viewportClassName?: string;
}

export const ScrollArea = forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
	ScrollAreaProps
>(({ className, viewportClassName, children, ...props }, ref) => {
	return (
		<ScrollAreaPrimitive.Root
			ref={ref}
			className={cn("relative overflow-hidden", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				className={cn("h-full w-full rounded-[inherit]", viewportClassName)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
});

ScrollArea.displayName = "ScrollArea";

export interface ScrollBarProps
	extends ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {}

export const ScrollBar = forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => {
	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			ref={ref}
			orientation={orientation}
			className={cn(
				"flex touch-none select-none transition-colors duration-150",
				orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
				orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border-strong" />
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
});

ScrollBar.displayName = "ScrollBar";
