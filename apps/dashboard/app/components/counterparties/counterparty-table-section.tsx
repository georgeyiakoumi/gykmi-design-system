"use client";

import { MoreHorizontal } from "lucide-react";
import type { DataTableColumn } from "@gykmi/ui";
import {
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardHeader,
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

// ─── SHARED ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Counterparty["status"] }) {
	const variant = status === "breached" ? "danger" : status === "near-limit" ? "warning" : "default";
	const label = status === "breached" ? "Breached" : status === "near-limit" ? "Near limit" : "OK";
	return <Badge variant={variant} label={label} />;
}

function ActionsMenu({ item }: { item: Counterparty }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" aria-label={`Actions for ${item.name}`}>
					<MoreHorizontal size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View positions</DropdownMenuItem>
				<DropdownMenuItem>Adjust limit</DropdownMenuItem>
				{item.status === "breached" && <DropdownMenuItem>Escalate</DropdownMenuItem>}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function sparklineColor(status: Counterparty["status"]) {
	return status === "breached" ? "var(--danger-default)" : status === "near-limit" ? "var(--warning-default)" : "var(--action-default)";
}

function utilisationColor(utilisation: number) {
	return utilisation > 100 ? "text-danger" : utilisation > 85 ? "text-warning" : "text-text";
}

// ─── MOBILE CARD ─────────────────────────────────────────────────────────────

function CounterpartyCard({ item }: { item: Counterparty }) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<StatusBadge status={item.status} />
					<span className="font-medium text-sm text-text">{item.name}</span>
				</div>
				<CardAction>
					<span className="text-xs text-text-muted">{item.rating}</span>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 pb-4">
				<Sparkline
					data={item.trend}
					label={`${item.name} trend`}
					height={24}
					color={sparklineColor(item.status)}
				/>
				<div className="grid grid-cols-3 gap-2 text-xs">
					<div>
						<p className="text-text-muted">Exposure</p>
						<p className="font-medium tabular-nums">${item.exposure.toFixed(1)}M</p>
					</div>
					<div>
						<p className="text-text-muted">Limit</p>
						<p className="tabular-nums text-text-muted">${item.limit.toFixed(1)}M</p>
					</div>
					<div>
						<p className="text-text-muted">Utilisation</p>
						<p className={`font-medium tabular-nums ${utilisationColor(item.utilisation)}`}>
							{item.utilisation.toFixed(1)}%
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2 pt-1">
					<Button variant="secondary" size="sm">View positions</Button>
					<Button variant="secondary" size="sm">Adjust limit</Button>
					{item.status === "breached" && (
						<Button variant="default" size="sm">Escalate</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── DESKTOP TABLE ───────────────────────────────────────────────────────────

const counterpartyColumns: DataTableColumn<Counterparty>[] = [
	{
		key: "status",
		header: "Status",
		cell: (row) => <StatusBadge status={row.status} />,
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
		cell: (row) => <span className={`tabular-nums font-medium ${utilisationColor(row.utilisation)}`}>{row.utilisation.toFixed(1)}%</span>,
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
				color={sparklineColor(row.status)}
			/>
		),
	},
	{
		key: "actions",
		header: "",
		cell: (row) => <ActionsMenu item={row} />,
	},
];

// ─── SECTION ─────────────────────────────────────────────────────────────────

interface CounterpartyTableSectionProps {
	data: Counterparty[];
}

export function CounterpartyTableSection({ data }: CounterpartyTableSectionProps) {
	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				All counterparties
			</Text>

			{/* Mobile: cards */}
			<div className="flex flex-col gap-3 lg:hidden">
				{data.map((item) => (
					<CounterpartyCard key={item.id} item={item} />
				))}
			</div>

			{/* Desktop: table */}
			<div className="hidden lg:block">
				<DataTable
					columns={counterpartyColumns}
					data={data}
					getRowKey={(row) => row.id}
					caption="Counterparty exposure summary"
				/>
			</div>
		</div>
	);
}
