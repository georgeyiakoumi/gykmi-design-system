"use client";

import { MoreHorizontal } from "lucide-react";
import type { DataTableColumn } from "@gykmi/ui";
import {
	AnalysisSection,
	AuditTrail,
	Badge,
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
	ConfidenceChart,
	ConfidenceIndicator,
	DataProvenance,
	DataTable,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	ScrollArea,
	MetricCard,
	SidebarTrigger,
	Text,
} from "@gykmi/ui";
import { Plus } from "lucide-react";
import { DashboardShell } from "./components/dashboard-shell";

// ─── DATA NARRATIVE ─────────────────────────────────────────────────────────
// Nadia is a risk & compliance analyst. She opens this first thing each morning.
// Her question: "What needs my attention today, and how far can I trust the
// machine's read on it?"
//
// The story: counterparty exposure to Hawkstone Partners has drifted up over 3
// days. The AI flags it at medium confidence. One position has a model-uncertain
// valuation that needs human sign-off. The trend chart shows the drift is real,
// not a blip. The flagged table drills into the specifics.
// ─────────────────────────────────────────────────────────────────────────────

// Exposure trend: 7-day counterparty concentration with confidence band
const exposureTrend = [
	{ date: "25 Jun", value: 14.2, low: 13.8, high: 14.6 },
	{ date: "26 Jun", value: 14.5, low: 14.0, high: 15.0 },
	{ date: "27 Jun", value: 15.1, low: 14.4, high: 15.8 },
	{ date: "28 Jun", value: 15.8, low: 14.9, high: 16.7 },
	{ date: "29 Jun", value: 16.3, low: 15.2, high: 17.4 },
	{ date: "30 Jun", value: 16.9, low: 15.6, high: 18.2 },
	{ date: "1 Jul", value: 17.4, low: 15.8, high: 19.0 },
];

// Flagged items — each row carries confidence and provenance
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

const flaggedItems: FlaggedItem[] = [
	{
		id: "FLAG-001",
		description: "Hawkstone Partners exposure exceeds single-counterparty limit",
		metric: "Counterparty concentration",
		value: "17.4%",
		threshold: "15.0%",
		confidence: "medium",
		source: "Internal Ledger v3.2.1",
		status: "needs-review",
	},
	{
		id: "FLAG-002",
		description: "Structured credit position — model-uncertain valuation",
		metric: "Mark-to-model confidence",
		value: "Estimated $4.2M",
		threshold: "Requires human sign-off",
		confidence: "uncertain",
		source: "Pricing Engine v2.8",
		status: "needs-review",
	},
	{
		id: "FLAG-003",
		description: "VaR breach: 1-day portfolio VaR above internal limit",
		metric: "Value at Risk (99%)",
		value: "$2.8M",
		threshold: "$2.5M",
		confidence: "high",
		source: "Bloomberg Terminal 2024.3",
		status: "acknowledged",
	},
];

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

const auditEntries = [
	{
		id: "1",
		timestamp: "2026-07-02T07:45:00Z",
		actor: "System",
		action: "Morning risk scan completed",
		detail:
			"3 items flagged. Model confidence: mixed. Sources: Bloomberg, Internal Ledger, Pricing Engine.",
	},
	{
		id: "2",
		timestamp: "2026-07-02T07:44:00Z",
		actor: "System",
		action: "Counterparty exposure alert triggered",
		detail:
			"Hawkstone Partners concentration at 17.4%, above 15% threshold. 3-day upward drift detected.",
	},
	{
		id: "3",
		timestamp: "2026-07-02T07:43:00Z",
		actor: "System",
		action: "Data refresh completed",
		detail:
			"Bloomberg: fresh. Internal Ledger v3.2.1: fresh. Market Data Feed: stale (last update 30 Jun 23:59).",
	},
	{
		id: "4",
		timestamp: "2026-07-02T07:30:00Z",
		actor: "System",
		action: "Model recalibration",
		detail: "Pricing Engine v2.8 recalibrated against EOD marks. 12 instruments updated.",
	},
	{
		id: "5",
		timestamp: "2026-07-02T06:00:00Z",
		actor: "System",
		action: "Scheduled portfolio snapshot",
		detail: "Pre-market snapshot captured. 342 positions across 8 portfolios.",
	},
	{
		id: "6",
		timestamp: "2026-07-01T17:30:00Z",
		actor: "Nadia K.",
		action: "Acknowledged VaR breach",
		detail: "1-day VaR at $2.8M vs $2.5M limit. Within tolerance, monitoring.",
		avatarUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
	},
	{
		id: "7",
		timestamp: "2026-07-01T16:45:00Z",
		actor: "System",
		action: "End-of-day reconciliation",
		detail: "All positions reconciled. No breaks detected.",
	},
	{
		id: "8",
		timestamp: "2026-07-01T09:12:00Z",
		actor: "System",
		action: "Limit breach warning",
		detail: "Hawkstone Partners approaching 15% threshold — currently at 14.8%.",
	},
];

const dataSources = [
	{ name: "Bloomberg Terminal", version: "2024.3", lastUpdated: "2026-07-02T07:30:00Z", verified: true },
	{ name: "Internal Ledger", version: "3.2.1", lastUpdated: "2026-07-02T07:40:00Z", verified: true },
	{ name: "Pricing Engine", version: "2.8", lastUpdated: "2026-07-02T07:42:00Z", verified: true },
	{ name: "Reuters Eikon", version: "12.1", lastUpdated: "2026-07-02T07:35:00Z", verified: true },
	{ name: "DTCC Trade Repository", version: "4.0", lastUpdated: "2026-07-02T06:00:00Z", verified: true },
	{ name: "Risk Analytics Engine", version: "1.9.2", lastUpdated: "2026-07-02T07:44:00Z", verified: true },
	{ name: "Counterparty Database", version: "6.3", lastUpdated: "2026-07-01T23:00:00Z", verified: true },
	{ name: "Market Data Feed", lastUpdated: "2026-06-30T23:59:00Z", verified: false },
	{ name: "Regulatory Filings API", version: "2.1", lastUpdated: "2026-07-01T18:00:00Z", verified: false },
];

// Stale sources first, then alphabetical
const sortedDataSources = [...dataSources].sort((a, b) => {
	if (a.verified !== b.verified) return a.verified ? 1 : -1;
	return a.name.localeCompare(b.name);
});

export default function DashboardPage() {
	const needsReview = flaggedItems.filter((i) => i.status === "needs-review").length;
	const highPriority = flaggedItems.filter(
		(i) => i.confidence === "uncertain" || i.confidence === "low",
	).length;

	return (
		<DashboardShell>
			{/* ─── BREADCRUMB ──────────────────────────────────────── */}
			<div className="sticky top-0 z-1 flex items-center justify-between bg-surface border-b border-border pl-6 pr-4 py-2">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="md:hidden" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="#">Overview</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Morning review</BreadcrumbPage>
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
						Morning review
					</Text>
					<div className="flex items-center gap-2">
						<a href="#flagged-items" className="no-underline">
							<Badge
								variant="warning"
								label="Review required"
								count={needsReview}
								className="cursor-pointer hover:opacity-80"
								style={{ transition: `opacity var(--duration-normal) var(--easing-default)` }}
							/>
						</a>
						{highPriority > 0 && (
							<a href="#flagged-items" className="no-underline">
								<Badge
									variant="default"
									label="Sign-off required"
									count={highPriority}
									className="cursor-pointer hover:opacity-80"
									style={{ transition: `opacity var(--duration-normal) var(--easing-default)` }}
								/>
							</a>
						)}
					</div>
				</div>

				{/* ─── AI SUMMARY + KPIs (single scan line) ───────────── */}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
					<AnalysisSection
						title="Risk summary"
						summary="Hawkstone Partners exposure has risen to 17.4% (limit: 15%), sustained over three trading days. One structured credit position (est. $4.2M) has a model-uncertain valuation requiring sign-off before the morning report is released."
						confidence="medium"
						confidenceScore={68}
						status="complete"
						generatedAt="2026-07-02T07:45:00Z"
					/>

					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Key metrics</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-1 pb-4 divide-y divide-border">
							<MetricCard
								label="Hawkstone exposure"
								value="17.4%"
								context="Limit: 15.0%"
								variant="danger"
							/>
							<MetricCard
								label="Portfolio VaR (99%)"
								value="$2.8M"
								context="Limit: $2.5M"
								variant="warning"
							/>
							<MetricCard label="Model coverage" value="95%" context="1 position unscored" />
						</CardContent>
					</Card>
				</div>

				{/* ─── FLAGGED ITEMS ───────────────────────────────────── */}
				<div id="flagged-items" className="flex flex-col gap-4">
					<Text as="h2" variant="heading-xl">
						Flagged items
					</Text>
					<DataTable
						columns={flaggedColumns}
						data={flaggedItems}
						getRowKey={(row) => row.id}
						caption="Items requiring review"
					/>
				</div>

				{/* ─── EXPOSURE TREND ──────────────────────────────────── */}
				<div className="flex flex-col gap-4">
					<Text as="h2" variant="heading-xl">
						Exposure trend
					</Text>
					<Card>
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Hawkstone Partners — 7 day</CardTitle>
							<CardAction>
								<ConfidenceIndicator level="medium" label="Model confidence" score={68} />
							</CardAction>
						</CardHeader>
						<CardContent className="[&_.mt-2.flex.items-center.gap-4]:hidden">
							<ConfidenceChart
								data={exposureTrend}
								title="Hawkstone Partners counterparty exposure"
								bandLabel="95% confidence interval"
								height={240}
								showTable
								formatValue={(v) => `${v.toFixed(1)}%`}
							/>
						</CardContent>
						<CardFooter className="justify-between">
							<div className="flex gap-4 text-xs text-text-muted">
								<span className="flex items-center gap-1">
									<span className="inline-block h-0.5 w-4 bg-action" />
									Actual
								</span>
								<span className="flex items-center gap-1">
									<span className="inline-block h-0.5 w-4 border-t border-dashed border-action" />
									Estimated
								</span>
								<span className="flex items-center gap-1">
									<span className="inline-block h-3 w-4 rounded-sm bg-action/15" />
									95% confidence
								</span>
							</div>
							<div className="flex gap-2">
								<Button variant="secondary" size="sm">Set alert</Button>
								<Button variant="secondary" size="sm">View positions</Button>
								<Button variant="default" size="sm">Escalate</Button>
							</div>
						</CardFooter>
					</Card>
				</div>

				{/* ─── ACTIVITY ───────────────────────────────────────── */}
				<div className="grid lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr] gap-4">
					<Text as="h2" variant="heading-xl" className="col-span-full">Activity</Text>

					<Card className="min-w-0 h-64">
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Recent activity</CardTitle>
						</CardHeader>
						<CardContent className="pb-6">
							<AuditTrail entries={auditEntries} />
						</CardContent>
					</Card>
					<Card className="flex flex-col overflow-hidden h-64">
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Data sources</CardTitle>
							<CardAction>
								<Button variant="ghost" size="sm" className="h-5 w-5 p-0" aria-label="Add data source">
									<Plus size={14} />
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent className="flex-1 overflow-hidden pb-6">
							<ScrollArea type="always" className="h-full" viewportClassName="scroll-fade">
								<DataProvenance sources={sortedDataSources} />
							</ScrollArea>
						</CardContent>
					</Card>
				</div>

			</div>
		</DashboardShell>
	);
}
