"use client";

import { MoreHorizontal } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { Button } from "../button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";

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

export interface DataProvenanceProps extends ComponentPropsWithRef<"ul"> {
	/** List of data sources */
	sources: DataSource[];
	/** Label for accessibility */
	label?: string;
	/** Callback when an action is triggered on a source */
	onAction?: (source: DataSource, action: "view" | "refresh" | "remove") => void;
}

function DataSourceItem({
	source,
	onAction,
}: {
	source: DataSource;
	onAction?: DataProvenanceProps["onAction"];
}) {
	const isStale = source.verified === false;

	return (
		<li className="group/item flex items-center gap-2 rounded-sm pl-3 pr-1 py-1 text-xs transition-colors hover:bg-surface">
			<div className="flex-1 min-w-0">
				<span className="font-medium text-text truncate">{source.name}</span>
				{source.version && <span className="ml-1.5 text-text-muted">v{source.version}</span>}
				{isStale && (
					<Badge variant="warning" label="Stale" className="ml-1.5 text-[10px] px-1.5 py-0" />
				)}
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="h-5 w-5 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
						aria-label={`Actions for ${source.name}`}
					>
						<MoreHorizontal size={12} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onSelect={() => onAction?.(source, "view")}>View</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => onAction?.(source, "refresh")}>
						Refresh
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => onAction?.(source, "remove")}>Remove</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</li>
	);
}

export const DataProvenance = forwardRef<HTMLUListElement, DataProvenanceProps>(
	({ sources, label = "Data sources", onAction, className, ...props }, ref) => {
		return (
			<ul ref={ref} aria-label={label} className={cn("space-y-0.5 pr-4", className)} {...props}>
				{sources.length === 0 && (
					<li className="py-2 text-center text-xs text-text-muted">No data sources.</li>
				)}
				{sources.map((source) => (
					<DataSourceItem key={source.name} source={source} onAction={onAction} />
				))}
			</ul>
		);
	},
);

DataProvenance.displayName = "DataProvenance";
