"use client";

import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface CarouselProps extends ComponentPropsWithRef<"div"> {
	/** Width of each item as a CSS value (e.g. "80vw", "60vw") */
	itemWidth?: string;
	/** Max width of each item as a Tailwind class (e.g. "max-w-xs", "max-w-[200px]") */
	itemMaxWidth?: string;
	/** Gap between items */
	gap?: string;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
	({ itemWidth = "80vw", itemMaxWidth = "max-w-xs", gap = "gap-3", className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("overflow-x-auto scroll-fade-x snap-x snap-mandatory -mx-6 px-6 pb-6 scroll-px-6", className)}
				{...props}
			>
				<div className={cn("flex w-max", gap)}>
					{children}
				</div>
			</div>
		);
	},
);

Carousel.displayName = "Carousel";

export interface CarouselItemProps extends ComponentPropsWithRef<"div"> {
	/** Width as a CSS value */
	width?: string;
	/** Max width as a Tailwind class */
	maxWidth?: string;
}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
	({ width, maxWidth, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("snap-start shrink-0", maxWidth, className)}
				style={width ? { width } : undefined}
				{...props}
			/>
		);
	},
);

CarouselItem.displayName = "CarouselItem";
