"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type ModelErrorKind =
	| "timeout"
	| "rate-limit"
	| "unavailable"
	| "content-filter"
	| "unknown";

export interface ModelErrorProps extends ComponentPropsWithRef<"div"> {
	/** The kind of model error */
	kind?: ModelErrorKind;
	/** Optional retry callback */
	onRetry?: () => void;
}

const errorMessages: Record<ModelErrorKind, { title: string; description: string }> = {
	timeout: {
		title: "Response timed out",
		description: "The model took too long to respond. This can happen with complex analyses.",
	},
	"rate-limit": {
		title: "Rate limit reached",
		description: "Too many requests in a short period. Please wait a moment before trying again.",
	},
	unavailable: {
		title: "Model unavailable",
		description:
			"The AI model is temporarily unavailable. This is usually resolved within minutes.",
	},
	"content-filter": {
		title: "Content filtered",
		description:
			"The response was filtered by the content safety system. Try rephrasing the query.",
	},
	unknown: {
		title: "Something went wrong",
		description: "An unexpected error occurred while generating the analysis.",
	},
};

export const ModelError = forwardRef<HTMLDivElement, ModelErrorProps>(
	({ kind = "unknown", onRetry, className, children, ...props }, ref) => {
		const message = errorMessages[kind];

		return (
			<div
				ref={ref}
				role="alert"
				className={cn("rounded-lg border border-danger bg-surface p-4", className)}
				{...props}
			>
				<div className="flex items-start gap-3">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						className="mt-0.5 shrink-0 text-danger"
						aria-hidden="true"
					>
						<title>error</title>
						<circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
						<path d="M10 6V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
						<circle cx="10" cy="14" r="0.75" fill="currentColor" />
					</svg>
					<div className="flex-1">
						<p className="text-sm font-medium text-text">{message.title}</p>
						<p className="mt-1 text-sm text-text-muted">{children ?? message.description}</p>
						{onRetry && (
							<button
								type="button"
								onClick={onRetry}
								className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-surface-raised px-3 py-1.5 text-xs font-medium text-text transition-colors duration-150 hover:bg-surface-overlay"
							>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
									<title>retry</title>
									<path
										d="M1.75 7A5.25 5.25 0 0 1 7 1.75M12.25 7A5.25 5.25 0 0 1 7 12.25"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
									<path
										d="M4 1L1.75 3.25 4 5.5"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M10 8.5L12.25 10.75 10 13"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								Retry
							</button>
						)}
					</div>
				</div>
			</div>
		);
	},
);

ModelError.displayName = "ModelError";
