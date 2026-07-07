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
	default: "bg-surface-raised text-text-strong border border-border-weak",
	success: "bg-fill-success-weak text-text-success",
	danger: "bg-fill-error-weak text-text-error",
	warning: "bg-fill-warning-weak text-text-warning",
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
				{count !== undefined && <BadgeCount count={count} />}
			</span>
		);
	},
);

Badge.displayName = "Badge";

export interface BadgeCountProps extends ComponentPropsWithRef<"span"> {
	/** The count value */
	count: number;
}

export const BadgeCount = forwardRef<HTMLSpanElement, BadgeCountProps>(
	({ count, className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				data-slot="badge-count"
				className={cn("text-xs font-bold tabular-nums", className)}
				{...props}
			>
				{count}
			</span>
		);
	},
);

BadgeCount.displayName = "BadgeCount";
