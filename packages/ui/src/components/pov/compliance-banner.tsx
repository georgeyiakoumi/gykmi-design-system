"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";

export type ComplianceSeverity = "info" | "warning" | "critical";

export interface ComplianceBannerProps extends ComponentPropsWithRef<"div"> {
	/** Severity level */
	severity?: ComplianceSeverity;
	/** Short headline */
	title: string;
	/** Whether the banner can be dismissed */
	dismissible?: boolean;
	/** Callback when dismissed */
	onDismiss?: () => void;
}

const severityStyles: Record<ComplianceSeverity, string> = {
	info: "border-action/30 bg-action/5",
	warning: "border-warning bg-warning/5",
	critical: "border-danger bg-danger/5",
};

export const ComplianceBanner = forwardRef<HTMLDivElement, ComplianceBannerProps>(
	({ severity = "info", title, dismissible, onDismiss, className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="alert"
				aria-live={severity === "critical" ? "assertive" : "polite"}
				className={cn("relative rounded-lg border px-4 py-3", severityStyles[severity], className)}
				{...props}
			>
				<div className="flex items-start gap-3">
					<div className="flex-1">
						<p className="text-sm font-semibold text-text">{title}</p>
						{children && (
							<div className="mt-1 text-xs text-text-muted leading-relaxed">{children}</div>
						)}
					</div>
					{dismissible && (
						<button
							type="button"
							onClick={onDismiss}
							className="shrink-0 rounded-md p-1 text-text-muted transition-colors hover:text-text"
							aria-label="Dismiss"
						>
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
								<title>close</title>
								<path
									d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		);
	},
);

ComplianceBanner.displayName = "ComplianceBanner";
