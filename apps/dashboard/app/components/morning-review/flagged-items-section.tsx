"use client";

import type { DataTableColumn } from "@gykmi/ui";
import {
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardHeader,
	ConfidenceIndicator,
	DataTable,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Text,
} from "@gykmi/ui";
import { MoreHorizontal } from "lucide-react";

export interface FlaggedItem {
	id: string;
	description: string;
	metric: string;
	value: string;
	threshold: string;
	confidence: "high" | "medium" | "low" | "uncertain";
	source: string;
	status: "needs-review" | "acknowledged" | "escalated";
}

// ─── SHARED ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: FlaggedItem["status"] }) {
	const variant =
		status === "needs-review" ? "danger" : status === "escalated" ? "warning" : "default";
	const label =
		status === "needs-review"
			? "Needs review"
			: status === "escalated"
				? "Escalated"
				: "Acknowledged";
	return <Badge variant={variant} label={label} />;
}

function ActionsMenu({ item }: { item: FlaggedItem }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" aria-label={`Actions for ${item.id}`}>
					<MoreHorizontal size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{item.status === "needs-review" && (
					<>
						<DropdownMenuItem>Acknowledge</DropdownMenuItem>
						<DropdownMenuItem>Escalate</DropdownMenuItem>
					</>
				)}
				{item.confidence === "uncertain" && <DropdownMenuItem>Sign off</DropdownMenuItem>}
				<DropdownMenuItem>View detail</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// ─── MOBILE CARD ─────────────────────────────────────────────────────────────

function FlaggedItemCard({ item }: { item: FlaggedItem }) {
	return (
		<Card>
			<CardHeader>
				<StatusBadge status={item.status} />
				<CardAction>
					<ConfidenceIndicator level={item.confidence} />
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 pb-4">
				<p className="text-sm font-medium text-text">{item.description}</p>
				<div className="flex items-baseline gap-2 text-xs">
					<span className="font-medium text-text">{item.value}</span>
					<span className="text-text-muted">/ {item.threshold}</span>
				</div>
				<div className="flex flex-col gap-2 pt-1">
					{item.status === "needs-review" && (
						<>
							<Button variant="secondary" size="sm">
								Acknowledge
							</Button>
							<Button variant="secondary" size="sm">
								Escalate
							</Button>
						</>
					)}
					{item.confidence === "uncertain" && (
						<Button variant="default" size="sm">
							Sign off
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── DESKTOP TABLE ───────────────────────────────────────────────────────────

const flaggedColumns: DataTableColumn<FlaggedItem>[] = [
	{
		key: "status",
		header: "Status",
		cell: (row) => <StatusBadge status={row.status} />,
		sortValue: (row) => row.status,
	},
	{ key: "description", header: "Description", cell: (row) => row.description },
	{
		key: "value",
		header: "Value / Threshold",
		cell: (row) => (
			<span>
				<span className="font-medium">{row.value}</span>
				<span className="text-text-muted"> / {row.threshold}</span>
			</span>
		),
	},
	{
		key: "confidence",
		header: "Confidence",
		cell: (row) => <ConfidenceIndicator level={row.confidence} />,
		sortValue: (row) => row.confidence,
	},
	{
		key: "actions",
		header: "",
		cell: (row) => <ActionsMenu item={row} />,
	},
];

// ─── SECTION ─────────────────────────────────────────────────────────────────

interface FlaggedItemsSectionProps {
	items: FlaggedItem[];
}

export function FlaggedItemsSection({ items }: FlaggedItemsSectionProps) {
	return (
		<div id="flagged-items" className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Flagged items
			</Text>

			{/* Mobile: cards */}
			<div className="flex flex-col gap-3 lg:hidden">
				{items.map((item) => (
					<FlaggedItemCard key={item.id} item={item} />
				))}
			</div>

			{/* Desktop: table */}
			<div className="hidden lg:block">
				<DataTable
					columns={flaggedColumns}
					data={items}
					getRowKey={(row) => row.id}
					caption="Items requiring review"
				/>
			</div>
		</div>
	);
}
