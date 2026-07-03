"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "default" | "success" | "danger" | "warning";

export interface BadgeProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
	/** Visual style variant */
	variant?: BadgeVariant;
	/** Badge label text */
	label: string;
	/** Optional count displayed as a circle */
	count?: number;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-surface-raised text-text border border-border",
	success: "bg-success-subtle text-success-text",
	danger: "bg-danger-subtle text-danger-text",
	warning: "bg-warning-subtle text-warning-text",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant = "default", label, count, className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(
					"inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
					variantStyles[variant],
					className,
				)}
				{...props}
			>
				{label}
				{count !== undefined && (
					<span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/90 px-1 text-[10px] font-semibold tabular-nums text-text">
						{count}
					</span>
				)}
			</span>
		);
	},
);

Badge.displayName = "Badge";
