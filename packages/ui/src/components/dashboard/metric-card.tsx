"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Sparkline } from "../charts/sparkline";

export interface MetricCardProps extends ComponentPropsWithRef<"div"> {
	/** Metric label */
	label: string;
	/** Metric value */
	value: string | number;
	/** Optional threshold or context line */
	context?: string;
	/** Colour variant for the value */
	variant?: "default" | "danger" | "warning" | "success";
	/** Optional trend data for sparkline */
	trend?: number[];
}

const variantStyles: Record<NonNullable<MetricCardProps["variant"]>, string> = {
	default: "text-text",
	danger: "text-danger",
	warning: "text-warning",
	success: "text-success",
};

const variantColors: Record<NonNullable<MetricCardProps["variant"]>, string> = {
	default: "var(--fill-brand-strong)",
	danger: "var(--fill-error-strong)",
	warning: "var(--fill-warning-strong)",
	success: "var(--fill-success-strong)",
};

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
	({ label, value, context, variant = "default", trend, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("flex items-center gap-3 px-4 py-3", className)} {...props}>
				<span className={cn("text-xl font-bold tabular-nums", variantStyles[variant])}>
					{value}
				</span>
				{trend && (
					<Sparkline
						data={trend}
						label={`${label} trend`}
						height={24}
						width={64}
						color={variantColors[variant]}
					/>
				)}
				<span className="text-sm font-medium text-text-strong">{label}</span>
				{context && <span className="ml-auto text-xs text-text-weak">{context}</span>}
			</div>
		);
	},
);

MetricCard.displayName = "MetricCard";
