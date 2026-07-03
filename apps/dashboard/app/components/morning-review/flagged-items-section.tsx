"use client";

import { MoreHorizontal } from "lucide-react";
import type { DataTableColumn } from "@gykmi/ui";
import {
	Badge,
	Button,
	ConfidenceIndicator,
	DataTable,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Text,
} from "@gykmi/ui";

interface FlaggedItem {
	id: string;
	description: string;
	metric: string;
	value: string;
	threshold: string;
	confidence: "high" | "medium" | "low" | "uncertain";
	source: string;
	status: "needs-review" | "acknowledged" | "escalated";
}

const flaggedColumns: DataTableColumn<FlaggedItem>[] = [
	{
		key: "status",
		header: "Status",
		cell: (row) => {
			const variant =
				row.status === "needs-review"
					? "danger"
					: row.status === "escalated"
						? "warning"
						: "default";
			const label =
				row.status === "needs-review"
					? "Needs review"
					: row.status === "escalated"
						? "Escalated"
						: "Acknowledged";
			return <Badge variant={variant} label={label} />;
		},
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
		cell: (row) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" aria-label={`Actions for ${row.id}`}>
						<MoreHorizontal size={14} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{row.status === "needs-review" && (
						<>
							<DropdownMenuItem>Acknowledge</DropdownMenuItem>
							<DropdownMenuItem>Escalate</DropdownMenuItem>
						</>
					)}
					{row.confidence === "uncertain" && (
						<DropdownMenuItem>Sign off</DropdownMenuItem>
					)}
					<DropdownMenuItem>View detail</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];

interface FlaggedItemsSectionProps {
	items: FlaggedItem[];
}

export function FlaggedItemsSection({ items }: FlaggedItemsSectionProps) {
	return (
		<div id="flagged-items" className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Flagged items
			</Text>
			<DataTable
				columns={flaggedColumns}
				data={items}
				getRowKey={(row) => row.id}
				caption="Items requiring review"
			/>
		</div>
	);
}
