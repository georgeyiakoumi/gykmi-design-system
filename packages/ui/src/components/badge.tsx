"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "default" | "success" | "danger" | "warning";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
	/** Visual style variant */
	variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-surface-raised text-text border border-border",
	success: "bg-success text-success-text",
	danger: "bg-danger text-danger-text",
	warning: "bg-warning text-warning-text",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant = "default", className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(
					"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
					variantStyles[variant],
					className,
				)}
				{...props}
			/>
		);
	},
);

Badge.displayName = "Badge";
