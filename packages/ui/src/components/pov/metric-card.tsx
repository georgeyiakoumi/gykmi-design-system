"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface MetricCardProps extends ComponentPropsWithRef<"div"> {
	/** Metric label */
	label: string;
	/** Metric value */
	value: string | number;
	/** Optional threshold or context line */
	context?: string;
	/** Colour variant for the value */
	variant?: "default" | "danger" | "warning" | "success";
}

const variantStyles: Record<NonNullable<MetricCardProps["variant"]>, string> = {
	default: "text-text",
	danger: "text-danger-text",
	warning: "text-warning-text",
	success: "text-success-text",
};

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
	({ label, value, context, variant = "default", className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("flex items-baseline gap-3 px-4 py-3", className)} {...props}>
				<span className={cn("text-xl font-bold tabular-nums", variantStyles[variant])}>
					{value}
				</span>
				<span className="text-sm font-medium text-text">{label}</span>
				{context && <span className="ml-auto text-xs text-text-muted">{context}</span>}
			</div>
		);
	},
);

MetricCard.displayName = "MetricCard";
