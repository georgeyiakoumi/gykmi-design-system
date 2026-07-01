"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch";

export interface StackProps extends ComponentPropsWithRef<"div"> {
	/** Flex direction */
	direction?: StackDirection;
	/** Align items */
	align?: StackAlign;
	/** Gap between items (Tailwind gap value) */
	gap?: "1" | "2" | "3" | "4" | "6" | "8";
	/** Render as child element */
	asChild?: boolean;
}

const directionStyles: Record<StackDirection, string> = {
	row: "flex-row",
	column: "flex-col",
};

const alignStyles: Record<StackAlign, string> = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
};

const gapStyles: Record<string, string> = {
	"1": "gap-1",
	"2": "gap-2",
	"3": "gap-3",
	"4": "gap-4",
	"6": "gap-6",
	"8": "gap-8",
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
	({ direction = "column", align = "stretch", gap = "4", asChild, className, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";
		return (
			<Comp
				ref={ref}
				className={cn(
					"flex",
					directionStyles[direction],
					alignStyles[align],
					gapStyles[gap],
					className,
				)}
				{...props}
			/>
		);
	},
);

Stack.displayName = "Stack";
