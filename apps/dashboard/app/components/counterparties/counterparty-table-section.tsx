"use client";

import { MoreHorizontal } from "lucide-react";
import type { DataTableColumn } from "@gykmi/ui";
import {
	Badge,
	Button,
	DataTable,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Sparkline,
	Text,
} from "@gykmi/ui";

interface Counterparty {
	id: string;
	name: string;
	exposure: number;
	limit: number;
	utilisation: number;
	rating: string;
	trend: number[];
	status: "within-limit" | "near-limit" | "breached";
}

const counterpartyColumns: DataTableColumn<Counterparty>[] = [
	{
		key: "status",
		header: "Status",
		cell: (row) => {
			const variant = row.status === "breached" ? "danger" : row.status === "near-limit" ? "warning" : "default";
			const label = row.status === "breached" ? "Breached" : row.status === "near-limit" ? "Near limit" : "OK";
			return <Badge variant={variant} label={label} />;
		},
		sortValue: (row) => row.status,
	},
	{ key: "name", header: "Counterparty", cell: (row) => <span className="font-medium">{row.name}</span> },
	{
		key: "exposure",
		header: "Exposure ($M)",
		cell: (row) => <span className="tabular-nums">{row.exposure.toFixed(1)}</span>,
		sortValue: (row) => row.exposure,
	},
	{
		key: "limit",
		header: "Limit ($M)",
		cell: (row) => <span className="tabular-nums text-text-muted">{row.limit.toFixed(1)}</span>,
		sortValue: (row) => row.limit,
	},
	{
		key: "utilisation",
		header: "Utilisation",
		cell: (row) => {
			const color = row.utilisation > 100 ? "text-danger" : row.utilisation > 85 ? "text-warning" : "text-text";
			return <span className={`tabular-nums font-medium ${color}`}>{row.utilisation.toFixed(1)}%</span>;
		},
		sortValue: (row) => row.utilisation,
	},
	{
		key: "rating",
		header: "Rating",
		cell: (row) => <span className="text-text-muted">{row.rating}</span>,
	},
	{
		key: "trend",
		header: "7d trend",
		cell: (row) => (
			<Sparkline
				data={row.trend}
				label={`${row.name} trend`}
				height={20}
				width={56}
				color={row.status === "breached" ? "var(--danger-default)" : row.status === "near-limit" ? "var(--warning-default)" : "var(--action-default)"}
			/>
		),
	},
	{
		key: "actions",
		header: "",
		cell: (row) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" aria-label={`Actions for ${row.name}`}>
						<MoreHorizontal size={14} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View positions</DropdownMenuItem>
					<DropdownMenuItem>Adjust limit</DropdownMenuItem>
					{row.status === "breached" && <DropdownMenuItem>Escalate</DropdownMenuItem>}
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];

interface CounterpartyTableSectionProps {
	data: Counterparty[];
}

export function CounterpartyTableSection({ data }: CounterpartyTableSectionProps) {
	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				All counterparties
			</Text>
			<DataTable
				columns={counterpartyColumns}
				data={data}
				getRowKey={(row) => row.id}
				caption="Counterparty exposure summary"
			/>
		</div>
	);
}
