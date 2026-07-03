"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Card } from "../card";

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
	danger: "text-danger",
	warning: "text-warning",
	success: "text-success",
};

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
	({ label, value, context, variant = "default", className, ...props }, ref) => {
		return (
			<Card ref={ref} className={cn("px-4 py-3", className)} {...props}>
				<div className="flex items-baseline gap-3">
					<span className={cn("text-xl font-bold tabular-nums", variantStyles[variant])}>
						{value}
					</span>
					<span className="text-sm font-medium text-text">{label}</span>
					{context && <span className="ml-auto text-xs text-text-muted">{context}</span>}
				</div>
			</Card>
		);
	},
);

MetricCard.displayName = "MetricCard";
