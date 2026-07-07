"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends ComponentPropsWithRef<typeof TogglePrimitive.Root> {
	variant?: ToggleVariant;
	size?: ToggleSize;
}

const variantStyles: Record<ToggleVariant, string> = {
	default: "bg-transparent",
	outline: "border border-border-weak bg-transparent hover:bg-surface-raised",
};

const sizeStyles: Record<ToggleSize, string> = {
	sm: "h-8 px-2 min-w-8",
	md: "h-10 px-3 min-w-10",
	lg: "h-12 px-4 min-w-12",
};

export const Toggle = forwardRef<React.ComponentRef<typeof TogglePrimitive.Root>, ToggleProps>(
	({ className, variant = "default", size = "md", ...props }, ref) => {
		return (
			<TogglePrimitive.Root
				ref={ref}
				className={cn(
					"inline-flex items-center justify-center rounded-md text-sm font-medium text-text-weak",
					"ring-offset-surface-base transition-colors duration-150",
					"hover:bg-surface-raised hover:text-text-strong",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
					"disabled:pointer-events-none disabled:opacity-50",
					"data-[state=on]:bg-surface-raised data-[state=on]:text-text-strong",
					variantStyles[variant],
					sizeStyles[size],
					className,
				)}
				{...props}
			/>
		);
	},
);

Toggle.displayName = "Toggle";
