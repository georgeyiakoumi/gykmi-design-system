"use client";

import { type ComponentPropsWithRef, forwardRef, type ReactNode } from "react";
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

const variantStyles: Record<BadgeVariant, { badge: string; icon: string }> = {
	default: { badge: "bg-fill-weak text-text-weak border-border-weak", icon: "text-icon-neutral" },
	success: {
		badge: "bg-fill-success-weak text-text-success border-border-success-weak",
		icon: "text-icon-success",
	},
	danger: {
		badge: "bg-fill-error-weak text-text-error border-border-error-weak",
		icon: "text-icon-error",
	},
	warning: {
		badge: "bg-fill-warning-weak text-text-warning border-border-warning-weak",
		icon: "text-icon-warning",
	},
	brand: {
		badge: "bg-fill-brand-weak text-text-brand border-border-brand-weak",
		icon: "text-icon-brand",
	},
	info: {
		badge: "bg-fill-info-weak text-text-info border-border-info-weak",
		icon: "text-icon-info",
	},
};

const sizeOverrides: Record<BadgeSize, string> = {
	default: "py-0.5",
	sm: "py-0",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ variant = "default", size = "default", label, count, icon, className, ...props }, ref) => {
		const v = variantStyles[variant];
		return (
			<span
				ref={ref}
				className={cn(
					"inline-flex items-center gap-1.5 border rounded-full px-2.5 text-xs font-medium",
					sizeOverrides[size],
					v.badge,
					className,
				)}
				{...props}
			>
				{icon && (
					<span className={cn("shrink-0 size-3 [&>svg]:size-3", v.icon)} aria-hidden="true">
						{icon}
					</span>
				)}
				{label}
				{count !== undefined && <span className="font-semibold tabular-nums">{count}</span>}
			</span>
		);
	},
);

Badge.displayName = "Badge";
