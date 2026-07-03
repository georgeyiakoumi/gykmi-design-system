"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "../card";

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
			<Card ref={ref} className={className} {...props}>
				<CardHeader>
					<CardTitle className={cn("text-3xl", variantStyles[variant])}>{value}</CardTitle>
					<CardAction className="text-xs">{context}</CardAction>
				</CardHeader>
				{context && <CardFooter className="text-sm font-semibold">{label}</CardFooter>}
			</Card>
		);
	},
);

MetricCard.displayName = "MetricCard";
