"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface DataSource {
	/** Name of the data source */
	name: string;
	/** When the data was last updated */
	lastUpdated?: string;
	/** Version or revision of the data */
	version?: string;
	/** Whether the source is verified/trusted */
	verified?: boolean;
}

export interface DataProvenanceProps extends ComponentPropsWithRef<"div"> {
	/** List of data sources */
	sources: DataSource[];
	/** Section label */
	label?: string;
}

export const DataProvenance = forwardRef<HTMLDivElement, DataProvenanceProps>(
	({ sources, label = "Data sources", className, ...props }, ref) => {
		return (
			<section
				ref={ref}
				aria-label={label}
				className={cn("rounded-md border border-border bg-surface-raised p-4", className)}
				{...props}
			>
				<h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
					{label}
				</h4>
				{sources.length === 0 && (
					<p className="text-xs text-text-muted">No data sources recorded.</p>
				)}
				<ul className="space-y-2">
					{sources.map((source) => (
						<li key={source.name} className="flex items-center justify-between gap-2 text-xs">
							<div className="flex items-center gap-2 min-w-0">
								{source.verified !== undefined && (
									<span
										className={cn(
											"h-1.5 w-1.5 shrink-0 rounded-full",
											source.verified ? "bg-success" : "bg-warning",
										)}
										title={source.verified ? "Verified source" : "Unverified source"}
										aria-hidden="true"
									/>
								)}
								<span className="font-medium text-text truncate">{source.name}</span>
								{source.version && <span className="text-text-muted">v{source.version}</span>}
							</div>
							{source.lastUpdated && (
								<time dateTime={source.lastUpdated} className="shrink-0 text-text-muted">
									{new Date(source.lastUpdated).toLocaleDateString("en-GB", {
										day: "numeric",
										month: "short",
										year: "numeric",
									})}
								</time>
							)}
						</li>
					))}
				</ul>
			</section>
		);
	},
);

DataProvenance.displayName = "DataProvenance";
