"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

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
			<Card ref={ref} role="region" aria-label={label} className={className} {...props}>
				<CardHeader className="pb-3">
					<CardTitle className="text-xs font-semibold uppercase tracking-wider text-text-muted">
						{label}
					</CardTitle>
				</CardHeader>
				<CardContent>
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
									{source.version && (
										<Badge variant="default" className="text-[10px] px-1.5 py-0">
											v{source.version}
										</Badge>
									)}
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
				</CardContent>
			</Card>
		);
	},
);

DataProvenance.displayName = "DataProvenance";
