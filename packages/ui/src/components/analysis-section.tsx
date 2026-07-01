"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";
import type { ConfidenceLevel } from "./confidence-indicator";
import { ConfidenceIndicator } from "./confidence-indicator";
import type { StreamingStatus } from "./streaming-text";

export interface AnalysisSectionProps extends ComponentPropsWithRef<"section"> {
	/** Section title */
	title: string;
	/** Confidence level of this section's analysis */
	confidence?: ConfidenceLevel;
	/** Confidence score (0-100) */
	confidenceScore?: number;
	/** Streaming status of this section */
	status?: StreamingStatus;
	/** Timestamp of when the analysis was generated */
	generatedAt?: string;
}

export const AnalysisSection = forwardRef<HTMLElement, AnalysisSectionProps>(
	(
		{
			title,
			confidence,
			confidenceScore,
			status = "complete",
			generatedAt,
			className,
			children,
			...props
		},
		ref,
	) => {
		return (
			<section
				ref={ref}
				aria-label={title}
				aria-busy={status === "streaming" || undefined}
				data-status={status}
				className={cn(
					"rounded-lg border border-border bg-surface p-5",
					status === "streaming" && "border-action/30",
					className,
				)}
				{...props}
			>
				<div className="mb-3 flex items-center justify-between gap-4">
					<h3 className="text-sm font-semibold text-text">{title}</h3>
					<div className="flex items-center gap-3">
						{confidence && <ConfidenceIndicator level={confidence} score={confidenceScore} />}
						{generatedAt && (
							<time dateTime={generatedAt} className="text-xs text-text-muted">
								{new Date(generatedAt).toLocaleString("en-GB", {
									day: "numeric",
									month: "short",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</time>
						)}
					</div>
				</div>
				{status === "streaming" && !children && (
					<div className="space-y-2">
						<div className="h-4 w-full animate-pulse rounded bg-surface-raised" />
						<div className="h-4 w-3/4 animate-pulse rounded bg-surface-raised" />
						<div className="h-4 w-5/6 animate-pulse rounded bg-surface-raised" />
					</div>
				)}
				{children && <div className="text-sm text-text leading-relaxed">{children}</div>}
			</section>
		);
	},
);

AnalysisSection.displayName = "AnalysisSection";
