"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface AuditEntry {
	/** Unique identifier for the event */
	id: string;
	/** ISO timestamp */
	timestamp: string;
	/** Who performed the action */
	actor: string;
	/** What action was performed */
	action: string;
	/** Additional detail */
	detail?: string;
}

export interface AuditTrailProps extends ComponentPropsWithRef<"div"> {
	/** List of audit entries, newest first */
	entries: AuditEntry[];
	/** Label for the audit trail section */
	label?: string;
}

export const AuditTrail = forwardRef<HTMLDivElement, AuditTrailProps>(
	({ entries, label = "Audit trail", className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="log"
				aria-label={label}
				className={cn("space-y-0", className)}
				{...props}
			>
				{entries.length === 0 && (
					<p className="py-4 text-center text-sm text-text-muted">No audit entries recorded.</p>
				)}
				{entries.map((entry, index) => (
					<div
						key={entry.id}
						className={cn(
							"relative flex gap-4 pb-4 pl-6",
							index < entries.length - 1 && "border-l border-border",
						)}
					>
						<span
							className="absolute left-0 top-1.5 -translate-x-1/2 h-2 w-2 rounded-full bg-border"
							aria-hidden="true"
						/>
						<div className="flex-1 min-w-0">
							<div className="flex items-baseline gap-2 text-xs">
								<span className="font-medium text-text">{entry.actor}</span>
								<span className="text-text-muted">{entry.action}</span>
							</div>
							{entry.detail && <p className="mt-0.5 text-xs text-text-muted">{entry.detail}</p>}
							<time dateTime={entry.timestamp} className="mt-1 block text-xs text-text-muted/70">
								{new Date(entry.timestamp).toLocaleString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</time>
						</div>
					</div>
				))}
			</div>
		);
	},
);

AuditTrail.displayName = "AuditTrail";
