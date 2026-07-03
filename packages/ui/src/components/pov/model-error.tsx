"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Card, CardContent } from "../card";

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
		description: "Too many requests in a short period. Wait a moment before trying again.",
	},
	unavailable: {
		title: "Model unavailable",
		description: "The AI model is temporarily unavailable. Usually resolved within minutes.",
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
			<Card ref={ref} role="alert" className={cn("border-danger", className)} {...props}>
				<CardContent className="pt-4">
					<div className="flex items-start gap-3">
						<AlertCircle size={20} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
						<div className="flex-1">
							<p className="text-sm font-medium text-text">{message.title}</p>
							<p className="mt-1 text-sm text-text-muted">{children ?? message.description}</p>
							{onRetry && (
								<Button variant="secondary" size="sm" onClick={onRetry} className="mt-3">
									<RefreshCw size={14} />
									Retry
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	},
);

ModelError.displayName = "ModelError";
