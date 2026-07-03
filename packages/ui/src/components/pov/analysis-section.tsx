"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Skeleton } from "../skeleton";
import type { ConfidenceLevel } from "./confidence-indicator";
import { ConfidenceIndicator } from "./confidence-indicator";
import type { StreamingStatus } from "./streaming-text";

export interface AnalysisSectionProps
	extends Omit<ComponentPropsWithRef<"div">, "title" | "children"> {
	/** Section title */
	title: string;
	/** The AI-generated summary text */
	summary?: string;
	/** Confidence level of this section's analysis */
	confidence?: ConfidenceLevel;
	/** Confidence score (0-100) */
	confidenceScore?: number;
	/** Streaming status of this section */
	status?: StreamingStatus;
	/** Timestamp of when the analysis was generated */
	generatedAt?: string;
}

export const AnalysisSection = forwardRef<HTMLDivElement, AnalysisSectionProps>(
	(
		{
			title,
			summary,
			confidence,
			confidenceScore,
			status = "complete",
			generatedAt,
			className,
			...props
		},
		ref,
	) => {
		return (
			<Card
				ref={ref}
				role="region"
				aria-label={title}
				aria-busy={status === "streaming" || undefined}
				data-status={status}
				className={cn(status === "streaming" && "border-action/30", className)}
				{...props}
			>
				<CardHeader>
					<CardTitle className="text-sm">{title}</CardTitle>
					<CardAction>
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
					</CardAction>
				</CardHeader>
				<CardContent>
					{status === "streaming" && !summary && (
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-4 w-5/6" />
						</div>
					)}
					{summary && <p className="text-sm text-text leading-relaxed">{summary}</p>}
				</CardContent>
				<CardFooter className="text-xs text-text-muted">
					AI-generated. Does not constitute a risk decision.
				</CardFooter>
			</Card>
		);
	},
);

AnalysisSection.displayName = "AnalysisSection";
