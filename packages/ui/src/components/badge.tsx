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

const variantStyles: Record<BadgeVariant, { badge: string; count: string }> = {
	default: {
		badge: "bg-surface-raised text-text border border-border",
		count: "bg-text text-surface",
	},
	success: {
		badge: "bg-success-subtle text-success-text",
		count: "bg-success-text text-success-subtle",
	},
	danger: {
		badge: "bg-danger-subtle text-danger-text",
		count: "bg-danger-text text-danger-subtle",
	},
	warning: {
		badge: "bg-warning-subtle text-warning-text",
		count: "bg-warning-text text-warning-subtle",
	},
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant = "default", label, count, className, ...props }, ref) => {
		const styles = variantStyles[variant];
		return (
			<span
				ref={ref}
				className={cn(
					"inline-flex items-center gap-1.5 rounded-full py-0.5 text-xs font-medium",
					"has-data-[slot=badge-count]:pl-2.5 has-data-[slot=badge-count]:pr-0.5",
					"not-has-data-[slot=badge-count]:px-2.5",
					styles.badge,
					className,
				)}
				{...props}
			>
				{label}
				{count !== undefined && <BadgeCount count={count} className={styles.count} />}
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
				className={cn(
					"inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold tabular-nums",
					className,
				)}
				{...props}
			>
				{count}
			</span>
		);
	},
);

BadgeCount.displayName = "BadgeCount";
