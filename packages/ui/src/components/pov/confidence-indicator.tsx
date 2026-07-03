"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";

export type ConfidenceLevel = "high" | "medium" | "low" | "uncertain";

export interface ConfidenceIndicatorProps extends ComponentPropsWithRef<"div"> {
	/** Confidence level of the AI output */
	level: ConfidenceLevel;
	/** Optional numeric score (0-100) */
	score?: number;
	/** Description of what the confidence applies to */
	label?: string;
}

const levelStyles: Record<ConfidenceLevel, { bg: string; text: string; label: string }> = {
	high: { bg: "bg-success", text: "text-success", label: "High confidence" },
	medium: { bg: "bg-warning", text: "text-warning", label: "Medium confidence" },
	low: { bg: "bg-danger", text: "text-danger", label: "Low confidence" },
	uncertain: { bg: "bg-border", text: "text-text-muted", label: "Uncertain" },
};

export const ConfidenceIndicator = forwardRef<HTMLDivElement, ConfidenceIndicatorProps>(
	({ level, score, label, className, ...props }, ref) => {
		const styles = levelStyles[level];

		return (
			<div
				ref={ref}
				title={label ?? styles.label}
				className={cn("inline-flex items-center gap-2 text-xs", className)}
				{...props}
			>
				<span className={cn("h-2 w-2 rounded-full", styles.bg)} aria-hidden="true" />
				<span className={cn("font-medium", styles.text)}>
					{score !== undefined ? `${score}%` : styles.label}
				</span>
			</div>
		);
	},
);

ConfidenceIndicator.displayName = "ConfidenceIndicator";
