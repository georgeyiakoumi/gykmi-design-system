"use client";

import { MoreHorizontal } from "lucide-react";
import type { DataTableColumn, HeatmapRow } from "@gykmi/ui";
import {
	Badge,
	BarChart,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Button,
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	DataTable,
	DonutChart,
	DropdownMenu,
	LineChart,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	HeatmapChart,
	MetricCard,
	SidebarTrigger,
	Sparkline,
	Text,
} from "@gykmi/ui";
import { DashboardShell } from "../components/dashboard-shell";

// ─── DATA NARRATIVE ─────────────────────────────────────────────────────────
// Nadia drills into counterparties after the morning review flagged Hawkstone
// Capital. Her question: "Where is my concentration risk, and which
// counterparties need attention?"
// ─────────────────────────────────────────────────────────────────────────────

// Concentration by counterparty (donut)
const concentration = [
	{ label: "Hawkstone Partners", value: 17.4 },
	{ label: "Apex Partners", value: 12.1 },
	{ label: "Northvale Group", value: 9.8 },
	{ label: "Clearwater Ltd", value: 8.5 },
	{ label: "Summit Holdings", value: 7.2 },
	{ label: "Others", value: 45.0 },
];

// Total portfolio exposure trend (line chart)
const exposureTrend = [
	{ date: "25 Jun", value: 158.4 },
	{ date: "26 Jun", value: 159.1 },
	{ date: "27 Jun", value: 161.8 },
	{ date: "28 Jun", value: 163.2 },
	{ date: "29 Jun", value: 165.0 },
	{ date: "30 Jun", value: 167.4 },
	{ date: "1 Jul", value: 170.2 },
];

// Top exposures (bar chart)
const topExposures = [
	{ label: "Hawkstone Partners", value: 42.6 },
	{ label: "Apex Partners", value: 29.7 },
	{ label: "Northvale Group", value: 24.1 },
	{ label: "Clearwater Ltd", value: 20.8 },
	{ label: "Summit Holdings", value: 17.6 },
	{ label: "Ironbridge Corp", value: 14.2 },
	{ label: "Vanguard Trust", value: 11.9 },
	{ label: "Pacific Rim Ltd", value: 9.3 },
];

// Exposure by asset class (heatmap)
const assetClasses = ["Equities", "Fixed income", "Credit", "FX", "Commodities"];
const heatmapData: HeatmapRow[] = [
	{ label: "Hawkstone Partners", bins: [{ bin: 0, count: 8.2 }, { bin: 1, count: 3.1 }, { bin: 2, count: 4.8 }, { bin: 3, count: 1.1 }, { bin: 4, count: 0.2 }] },
	{ label: "Apex Partners", bins: [{ bin: 0, count: 5.4 }, { bin: 1, count: 9.2 }, { bin: 2, count: 2.1 }, { bin: 3, count: 8.7 }, { bin: 4, count: 4.3 }] },
	{ label: "Northvale Group", bins: [{ bin: 0, count: 2.1 }, { bin: 1, count: 6.8 }, { bin: 2, count: 7.4 }, { bin: 3, count: 5.2 }, { bin: 4, count: 2.6 }] },
	{ label: "Clearwater Ltd", bins: [{ bin: 0, count: 7.1 }, { bin: 1, count: 1.9 }, { bin: 2, count: 3.6 }, { bin: 3, count: 4.4 }, { bin: 4, count: 3.8 }] },
	{ label: "Summit Holdings", bins: [{ bin: 0, count: 3.8 }, { bin: 1, count: 4.5 }, { bin: 2, count: 1.2 }, { bin: 3, count: 2.9 }, { bin: 4, count: 5.2 }] },
];

// Counterparty table
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

const counterparties: Counterparty[] = [
	{ id: "CP-001", name: "Hawkstone Partners", exposure: 42.6, limit: 36.8, utilisation: 115.8, rating: "BBB+", trend: [34.2, 35.8, 37.1, 38.9, 40.2, 41.5, 42.6], status: "breached" },
	{ id: "CP-002", name: "Apex Partners", exposure: 29.7, limit: 32.0, utilisation: 92.8, rating: "A-", trend: [28.1, 28.5, 29.0, 29.2, 29.4, 29.5, 29.7], status: "near-limit" },
	{ id: "CP-003", name: "Northvale Group", exposure: 24.1, limit: 30.0, utilisation: 80.3, rating: "A", trend: [23.8, 24.0, 24.2, 24.0, 23.9, 24.0, 24.1], status: "within-limit" },
	{ id: "CP-004", name: "Clearwater Ltd", exposure: 20.8, limit: 28.0, utilisation: 74.3, rating: "A+", trend: [19.2, 19.8, 20.1, 20.4, 20.5, 20.6, 20.8], status: "within-limit" },
	{ id: "CP-005", name: "Summit Holdings", exposure: 17.6, limit: 25.0, utilisation: 70.4, rating: "BBB", trend: [16.8, 17.0, 17.1, 17.2, 17.3, 17.4, 17.6], status: "within-limit" },
	{ id: "CP-006", name: "Ironbridge Corp", exposure: 14.2, limit: 20.0, utilisation: 71.0, rating: "A-", trend: [13.5, 13.8, 14.0, 14.1, 14.0, 14.1, 14.2], status: "within-limit" },
	{ id: "CP-007", name: "Vanguard Trust", exposure: 11.9, limit: 18.0, utilisation: 66.1, rating: "AA-", trend: [12.4, 12.2, 12.0, 11.8, 11.9, 11.9, 11.9], status: "within-limit" },
	{ id: "CP-008", name: "Pacific Rim Ltd", exposure: 9.3, limit: 15.0, utilisation: 62.0, rating: "BBB+", trend: [9.0, 9.1, 9.2, 9.2, 9.3, 9.3, 9.3], status: "within-limit" },
];

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

export default function CounterpartiesPage() {
	const breached = counterparties.filter((c) => c.status === "breached").length;
	const nearLimit = counterparties.filter((c) => c.status === "near-limit").length;
	const totalExposure = counterparties.reduce((sum, c) => sum + c.exposure, 0);

	return (
		<DashboardShell>
			{/* ─── BREADCRUMB ──────────────────────────────────────── */}
			<div className="sticky top-0 z-1 flex items-center justify-between bg-surface border-b border-border pl-6 pr-4 py-2">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="md:hidden" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Overview</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Counterparties</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<Button variant="secondary" size="sm">Export report</Button>
			</div>

			<div className="flex flex-col space-y-8 p-6">
				{/* ─── HEADER ─────────────────────────────────────────── */}
				<div className="flex flex-col items-start gap-4">
					<Text as="h1" variant="heading-2xl">
						Counterparties
					</Text>
					<div className="flex items-center gap-2">
						{breached > 0 && (
							<Badge variant="danger" label="Limit breached" count={breached} />
						)}
						{nearLimit > 0 && (
							<Badge variant="warning" label="Near limit" count={nearLimit} />
						)}
					</div>
				</div>

				{/* ─── KEY METRICS + CONCENTRATION + TREND ─────────────── */}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Key metrics</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-1 pb-4 divide-y divide-border">
							<MetricCard
								label="Total exposure"
								value={`$${totalExposure.toFixed(1)}M`}
								context="Across 8 counterparties"
							/>
							<MetricCard
								label="Highest concentration"
								value="17.4%"
								context="Hawkstone Partners"
								variant="danger"
							/>
							<MetricCard
								label="Average utilisation"
								value={`${(counterparties.reduce((s, c) => s + c.utilisation, 0) / counterparties.length).toFixed(1)}%`}
								context="Of approved limits"
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Concentration breakdown</CardTitle>
						</CardHeader>
						<CardContent>
							<DonutChart
								data={concentration}
								title="Portfolio concentration by counterparty"
								height={200}
								formatValue={(v) => `${v.toFixed(1)}%`}
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Total exposure — 7 day</CardTitle>
						</CardHeader>
						<CardContent>
							<LineChart
								data={exposureTrend}
								title="Total portfolio exposure trend"
								height={200}
								showGrid
								showArea
								formatValue={(v) => `$${v.toFixed(1)}M`}
							/>
						</CardContent>
					</Card>
				</div>

				{/* ─── TOP EXPOSURES ───────────────────────────────────── */}
				<div className="flex flex-col gap-4">
					<Text as="h2" variant="heading-xl">
						Top exposures
					</Text>
					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Exposure by counterparty ($M)</CardTitle>
						</CardHeader>
						<CardContent>
							<BarChart
								data={topExposures}
								title="Top counterparty exposures"
								height={240}
								showGrid
								formatValue={(v) => `$${v.toFixed(1)}M`}
							/>
						</CardContent>
						<CardFooter className="justify-end">
							<div className="flex gap-2">
								<Button variant="secondary" size="sm">Set alerts</Button>
								<Button variant="secondary" size="sm">Adjust limits</Button>
							</div>
						</CardFooter>
					</Card>
				</div>

				{/* ─── EXPOSURE HEATMAP ────────────────────────────────── */}
				<div className="flex flex-col gap-4">
					<Text as="h2" variant="heading-xl">
						Exposure by asset class
					</Text>
					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Counterparty vs asset class ($M)</CardTitle>
						</CardHeader>
						<CardContent>
							<HeatmapChart
								data={heatmapData}
								columnLabels={assetClasses}
								title="Counterparty exposure by asset class"
								height={240}
								formatValue={(v) => `$${v.toFixed(1)}M`}
							/>
						</CardContent>
					</Card>
				</div>

				{/* ─── COUNTERPARTY TABLE ──────────────────────────────── */}
				<div className="flex flex-col gap-4">
					<Text as="h2" variant="heading-xl">
						All counterparties
					</Text>
					<DataTable
						columns={counterpartyColumns}
						data={counterparties}
						getRowKey={(row) => row.id}
						caption="Counterparty exposure summary"
					/>
				</div>
			</div>
		</DashboardShell>
	);
}
