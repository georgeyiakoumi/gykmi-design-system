"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type StreamingStatus = "idle" | "streaming" | "complete" | "error";

export interface StreamingTextProps extends ComponentPropsWithRef<"div"> {
	/** Current streaming status */
	status?: StreamingStatus;
	/** Show a blinking cursor while streaming */
	showCursor?: boolean;
}

export const StreamingText = forwardRef<HTMLDivElement, StreamingTextProps>(
	({ status = "idle", showCursor = true, className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="status"
				aria-live="polite"
				aria-busy={status === "streaming" || undefined}
				data-status={status}
				className={cn("relative text-sm text-text leading-relaxed", className)}
				{...props}
			>
				{children}
				{status === "streaming" && showCursor && (
					<span
						className="inline-block h-4 w-0.5 animate-pulse bg-text-muted align-text-bottom motion-reduce:animate-none"
						aria-hidden="true"
					/>
				)}
			</div>
		);
	},
);

StreamingText.displayName = "StreamingText";
