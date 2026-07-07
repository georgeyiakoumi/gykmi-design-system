"use client";

import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";
import { cn } from "../lib/cn";

export type BadgeVariant = "default" | "success" | "danger" | "warning" | "brand" | "info";
export type BadgeSize = "default" | "sm";

export interface BadgeProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
	/** Visual style variant */
	variant?: BadgeVariant;
	/** Size */
	size?: BadgeSize;
	/** Badge label text */
	label: string;
	/** Optional count */
	count?: number;
	/** Optional icon (inherits variant colour) */
	icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-fill-weak text-text-weak border-border-weak",
	success: "bg-fill-success-weak text-text-success border-border-success-weak",
	danger: "bg-fill-error-weak text-text-error border-border-error-weak",
	warning: "bg-fill-warning-weak text-text-warning border-border-warning-weak",
	brand: "bg-fill-brand-weak text-text-brand border-border-brand-weak",
	info: "bg-fill-info-weak text-text-info border-border-info-weak",
};

const sizeStyles: Record<BadgeSize, { badge: string; icon: string; count: string }> = {
	default: { badge: "gap-1.5 px-2.5 py-0.5 text-xs", icon: "size-3 [&>svg]:size-3", count: "text-xs" },
	sm: { badge: "gap-1 px-2 py-px text-[10px]", icon: "size-2.5 [&>svg]:size-2.5", count: "text-[10px]" },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant = "default", size = "default", label, count, icon, className, ...props }, ref) => {
		const s = sizeStyles[size];
		return (
			<span
				ref={ref}
				className={cn(
					"inline-flex items-center border rounded-full font-medium",
					s.badge,
					variantStyles[variant],
					className,
				)}
				{...props}
			>
				{icon && <span className={cn("shrink-0", s.icon)} aria-hidden="true">{icon}</span>}
				{label}
				{count !== undefined && <BadgeCount count={count} className={s.count} />}
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
