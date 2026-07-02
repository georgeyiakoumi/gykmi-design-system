"use client";

import type { DataTableColumn } from "@gykmi/ui";
import {
	AnalysisSection,
	AuditTrail,
	Badge,
	BarChart,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ComplianceBanner,
	ConfidenceChart,
	ConfidenceIndicator,
	DataProvenance,
	DataTable,
	Disclaimer,
	LineChart,
	RegulatoryNotice,
	Separator,
	Sparkline,
	Stack,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@gykmi/ui";
import { useState } from "react";

// Chart data
const revenueData = [
	{ date: "Jan", value: 3200000 },
	{ date: "Feb", value: 3100000 },
	{ date: "Mar", value: 3500000 },
	{ date: "Apr", value: 3800000 },
	{ date: "May", value: 3600000 },
	{ date: "Jun", value: 4000000 },
];

const quarterlyData = [
	{ label: "Q1 2025", value: 9800000 },
	{ label: "Q2 2025", value: 10200000 },
	{ label: "Q3 2025", value: 11500000 },
	{ label: "Q4 2025", value: 10800000 },
	{ label: "Q1 2026", value: 11200000 },
	{ label: "Q2 2026", value: 12100000 },
];

const forecastData = [
	{ date: "Jan", value: 3200000, low: 3000000, high: 3400000 },
	{ date: "Feb", value: 3100000, low: 2800000, high: 3300000 },
	{ date: "Mar", value: 3500000, low: 3200000, high: 3800000 },
	{ date: "Apr", value: 3800000, low: 3500000, high: 4100000 },
	{ date: "May", value: 3600000, low: 3200000, high: 4000000 },
	{ date: "Jun", value: 4000000, low: 3600000, high: 4400000 },
	{ date: "Jul", value: 4200000, low: 3600000, high: 4800000 },
	{ date: "Aug", value: 4400000, low: 3700000, high: 5100000 },
];

const sparkAum = [138, 139, 140, 139, 141, 140, 142, 142.8];
const sparkPositions = [820, 830, 835, 840, 838, 842, 845, 847];
const sparkPnl = [1.2, 1.5, 1.8, 2.0, 1.9, 2.1, 2.3, 2.4];

interface Transaction {
	id: string;
	date: string;
	counterparty: string;
	instrument: string;
	amount: number;
	status: "settled" | "pending" | "failed";
}

const transactions: Transaction[] = [
	{
		id: "TXN-001",
		date: "2026-07-01",
		counterparty: "Citadel Securities",
		instrument: "US Treasury 10Y",
		amount: 2500000,
		status: "settled",
	},
	{
		id: "TXN-002",
		date: "2026-07-01",
		counterparty: "Goldman Sachs",
		instrument: "EUR/USD FX Forward",
		amount: 1200000,
		status: "pending",
	},
	{
		id: "TXN-003",
		date: "2026-06-30",
		counterparty: "JP Morgan",
		instrument: "AAPL Equity",
		amount: 450000,
		status: "settled",
	},
	{
		id: "TXN-004",
		date: "2026-06-30",
		counterparty: "Morgan Stanley",
		instrument: "Credit Default Swap",
		amount: 3800000,
		status: "settled",
	},
	{
		id: "TXN-005",
		date: "2026-06-29",
		counterparty: "Barclays",
		instrument: "GBP/USD Spot",
		amount: 890000,
		status: "failed",
	},
	{
		id: "TXN-006",
		date: "2026-06-29",
		counterparty: "BNP Paribas",
		instrument: "Euro Bund Future",
		amount: 1750000,
		status: "settled",
	},
];

const statusVariant: Record<Transaction["status"], "success" | "warning" | "danger"> = {
	settled: "success",
	pending: "warning",
	failed: "danger",
};

const columns: DataTableColumn<Transaction>[] = [
	{ key: "id", header: "ID", cell: (row) => row.id, sortable: true },
	{ key: "date", header: "Date", cell: (row) => row.date, sortable: true },
	{ key: "counterparty", header: "Counterparty", cell: (row) => row.counterparty, sortable: true },
	{ key: "instrument", header: "Instrument", cell: (row) => row.instrument },
	{
		key: "amount",
		header: "Amount",
		cell: (row) => `$${row.amount.toLocaleString()}`,
		sortable: true,
		align: "right" as const,
	},
	{
		key: "status",
		header: "Status",
		cell: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
		align: "center" as const,
	},
];

const auditEntries = [
	{
		id: "1",
		timestamp: "2026-07-01T14:30:00Z",
		actor: "System",
		action: "Generated Q3 forecast",
		detail: "Model: claude-opus-4-6, confidence: 92%",
	},
	{
		id: "2",
		timestamp: "2026-07-01T14:25:00Z",
		actor: "George Y.",
		action: "Requested analysis",
		detail: "Scope: Q3 2026 revenue, all segments",
	},
	{
		id: "3",
		timestamp: "2026-07-01T14:20:00Z",
		actor: "System",
		action: "Data refresh completed",
		detail: "Sources: Bloomberg, internal ledger v3.2.1",
	},
];

const dataSources = [
	{
		name: "Bloomberg Terminal",
		version: "2024.3",
		lastUpdated: "2026-07-01T12:00:00Z",
		verified: true,
	},
	{
		name: "Internal Ledger",
		version: "3.2.1",
		lastUpdated: "2026-07-01T14:00:00Z",
		verified: true,
	},
	{ name: "Market Data Feed", lastUpdated: "2026-06-30T23:59:00Z", verified: false },
];

function ThemeToggle() {
	const [dark, setDark] = useState(false);

	function toggle() {
		const next = !dark;
		setDark(next);
		document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
	}

	return (
		<Button variant="secondary" size="sm" onClick={toggle}>
			{dark ? "☀ Light" : "☾ Dark"}
		</Button>
	);
}

export default function DashboardPage() {
	return (
		<main className="mx-auto max-w-7xl px-6 py-8">
			<Stack gap="6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-text">Financial Dashboard</h1>
						<p className="text-sm text-text-muted">Portfolio overview and AI-generated analysis</p>
					</div>
					<ThemeToggle />
				</div>

				{/* Compliance banner */}
				<ComplianceBanner severity="warning" title="Stale data detected" dismissible>
					The market data feed has not been updated since 30 June 2026. Analysis results may not
					reflect the latest market conditions.
				</ComplianceBanner>

				{/* Tabs */}
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="transactions">Transactions</TabsTrigger>
						<TabsTrigger value="audit">Audit Trail</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<Stack gap="6" className="mt-4">
							{/* Summary cards */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<Card>
									<CardHeader>
										<CardDescription>Total AUM</CardDescription>
										<div className="flex items-end justify-between">
											<CardTitle className="text-2xl">$142.8M</CardTitle>
											<Sparkline data={sparkAum} label="AUM trend" height={28} width={80} />
										</div>
									</CardHeader>
								</Card>
								<Card>
									<CardHeader>
										<CardDescription>Active Positions</CardDescription>
										<div className="flex items-end justify-between">
											<CardTitle className="text-2xl">847</CardTitle>
											<Sparkline
												data={sparkPositions}
												label="Positions trend"
												height={28}
												width={80}
											/>
										</div>
									</CardHeader>
								</Card>
								<Card>
									<CardHeader>
										<CardDescription>P&L (MTD)</CardDescription>
										<div className="flex items-end justify-between">
											<CardTitle className="text-2xl text-success">+$2.4M</CardTitle>
											<Sparkline
												data={sparkPnl}
												label="P&L trend"
												height={28}
												width={80}
												color="var(--success-default)"
											/>
										</div>
									</CardHeader>
								</Card>
							</div>

							{/* Charts */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Monthly Revenue</CardTitle>
										<CardDescription>Trailing 6 months</CardDescription>
									</CardHeader>
									<CardContent>
										<LineChart
											data={revenueData}
											title="Monthly Revenue"
											showArea
											height={240}
											showTable
										/>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Quarterly Comparison</CardTitle>
										<CardDescription>Revenue by quarter</CardDescription>
									</CardHeader>
									<CardContent>
										<BarChart
											data={quarterlyData}
											title="Quarterly Revenue"
											height={240}
											showTable
										/>
									</CardContent>
								</Card>
							</div>

							{/* Confidence forecast */}
							<Card>
								<CardHeader>
									<CardTitle>Revenue Forecast with Confidence</CardTitle>
									<CardDescription>
										Actual vs estimated with confidence band — AI-generated projection
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ConfidenceChart
										data={forecastData}
										title="Revenue Forecast"
										estimatedAfter={6}
										bandLabel="95% confidence interval"
										height={280}
										showTable
									/>
									<Disclaimer variant="info" className="mt-3">
										Projections are AI-generated based on historical patterns and current market
										data. Actual results may differ materially.
									</Disclaimer>
								</CardContent>
							</Card>

							{/* AI Analysis */}
							<AnalysisSection
								title="Q3 2026 Revenue Forecast"
								confidence="high"
								confidenceScore={92}
								status="complete"
								generatedAt="2026-07-01T14:30:00Z"
							>
								<p>
									Based on the trailing twelve months of transaction data, projected revenue for Q3
									2026 is estimated at $4.2M, representing a 12% increase from the prior quarter.
									This projection accounts for seasonal patterns observed in the 2024–2025 data and
									current market conditions.
								</p>
								<div className="mt-3 flex items-center gap-4">
									<ConfidenceIndicator
										level="high"
										score={92}
										label="Revenue forecast confidence"
									/>
									<span className="text-xs text-text-muted">Based on 847 active positions</span>
								</div>
							</AnalysisSection>

							{/* Data provenance */}
							<DataProvenance sources={dataSources} />

							{/* Disclaimer */}
							<Disclaimer variant="regulatory" title="FCA disclosure">
								This analysis is produced under the supervision of authorised personnel in
								accordance with FCA SYSC 6.1. AI-generated outputs have been reviewed for accuracy
								but do not constitute financial advice. Past performance is not a reliable indicator
								of future results.
							</Disclaimer>
						</Stack>
					</TabsContent>

					<TabsContent value="transactions">
						<Stack gap="4" className="mt-4">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-text">Recent Transactions</h2>
								<Button variant="secondary" size="sm">
									Export CSV
								</Button>
							</div>
							<DataTable
								columns={columns}
								data={transactions}
								getRowKey={(row) => row.id}
								pageSize={5}
								caption="Recent transactions"
							/>
						</Stack>
					</TabsContent>

					<TabsContent value="audit">
						<Stack gap="4" className="mt-4">
							<h2 className="text-lg font-semibold text-text">Audit Trail</h2>
							<AuditTrail entries={auditEntries} />
						</Stack>
					</TabsContent>
				</Tabs>

				{/* Regulatory notice */}
				<RegulatoryNotice framework="FCA" reference="FRN-123456">
					This firm is authorised and regulated by the Financial Conduct Authority. The value of
					investments can go down as well as up.
				</RegulatoryNotice>
			</Stack>
		</main>
	);
}
