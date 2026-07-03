"use client";

import { Terminal } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

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
	/** Optional avatar image URL for human actors */
	avatarUrl?: string;
}

export interface AuditTrailProps extends ComponentPropsWithRef<"div"> {
	/** List of audit entries, newest first */
	entries: AuditEntry[];
	/** Label for the audit trail section */
	label?: string;
}

function ActorNode({ entry }: { entry: AuditEntry }) {
	if (entry.avatarUrl) {
		const initials = entry.actor
			.split(" ")
			.map((w) => w[0])
			.join("")
			.slice(0, 2);
		return (
			<Avatar className="h-7 w-7 flex-shrink-0">
				<AvatarImage src={entry.avatarUrl} alt={entry.actor} />
				<AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
			</Avatar>
		);
	}
	return (
		<span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-surface-raised border border-border">
			<Terminal className="h-3.5 w-3.5 text-text-muted" />
		</span>
	);
}

function ActorWithTooltip({ entry }: { entry: AuditEntry }) {
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<span>
						<ActorNode entry={entry} />
					</span>
				</TooltipTrigger>
				<TooltipContent side="top">{entry.actor}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function formatTime(timestamp: string) {
	return new Date(timestamp).toLocaleString("en-GB", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export const AuditTrail = forwardRef<HTMLDivElement, AuditTrailProps>(
	({ entries, label = "Audit trail", className, ...props }, ref) => {
		// Display in chronological order (oldest first)
		const chronological = [...entries].reverse();

		return (
			<div ref={ref} role="log" aria-label={label} className={cn(className)} {...props}>
				{entries.length === 0 && (
					<p className="py-4 text-center text-sm text-text-muted">No audit entries recorded.</p>
				)}

				{/* Mobile: vertical timeline (no scroll container) */}
				<div className="flex flex-col lg:hidden">
					{chronological.map((entry, index) => (
						<div key={entry.id} className="flex gap-3">
							<div className="flex flex-col items-center">
								<ActorNode entry={entry} />
								{index < chronological.length - 1 && (
									<span className="w-px flex-1 bg-border" aria-hidden="true" />
								)}
							</div>
							<div className="flex flex-col gap-1 pb-4">
								<time
									dateTime={entry.timestamp}
									className="text-[10px] text-text-muted tabular-nums"
								>
									{formatTime(entry.timestamp)}
								</time>
								<p className="text-xs font-medium text-text">{entry.action}</p>
								{entry.detail && (
									<p className="text-xs text-text-muted/70 leading-relaxed">{entry.detail}</p>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Desktop: horizontal timeline */}
				<div className="hidden lg:block">
					<ScrollArea type="always" viewportClassName="scroll-fade-x">
						<div className="flex">
							{chronological.map((entry, index) => (
								<div key={entry.id} className="flex flex-col items-start min-w-56 max-w-72">
									{/* Timeline row: avatar/icon + line */}
									<div className="flex items-center w-full">
										<ActorWithTooltip entry={entry} />
										{index < chronological.length - 1 && (
											<span className="h-px flex-1 bg-border" aria-hidden="true" />
										)}
									</div>

									{/* Time label */}
									<time
										dateTime={entry.timestamp}
										className="mt-2 text-[10px] text-text-muted tabular-nums"
									>
										{formatTime(entry.timestamp)}
									</time>

									{/* Content */}
									<div className="mt-1.5 pr-6 flex flex-col gap-1">
										<p className="text-xs font-medium text-text">{entry.action}</p>
										{entry.detail && (
											<p className="text-xs text-text-muted/70 leading-relaxed">{entry.detail}</p>
										)}
									</div>
								</div>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</div>
		);
	},
);

AuditTrail.displayName = "AuditTrail";
