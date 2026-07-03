"use client";

import type { DataTableColumn } from "@gykmi/ui";
import {
	AnalysisSection,
	AuditTrail,
	Badge,
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
	RegulatoryNotice,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeparator,
	SidebarTrigger,
	Stack,
	ThemeToggle,
} from "@gykmi/ui";

// ─── DATA NARRATIVE ─────────────────────────────────────────────────────────
// Nadia is a risk & compliance analyst. She opens this first thing each morning.
// Her question: "What needs my attention today, and how far can I trust the
// machine's read on it?"
//
// The story: counterparty exposure to Meridian Capital has drifted up over 3
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
		description: "Meridian Capital exposure exceeds single-counterparty limit",
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
			return <Badge variant={variant}>{label}</Badge>;
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
			"Meridian Capital concentration at 17.4%, above 15% threshold. 3-day upward drift detected.",
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
		timestamp: "2026-07-01T17:30:00Z",
		actor: "Nadia K.",
		action: "Acknowledged VaR breach",
		detail: "1-day VaR at $2.8M vs $2.5M limit. Within tolerance, monitoring.",
	},
];

const dataSources = [
	{
		name: "Bloomberg Terminal",
		version: "2024.3",
		lastUpdated: "2026-07-02T07:30:00Z",
		verified: true,
	},
	{
		name: "Internal Ledger",
		version: "3.2.1",
		lastUpdated: "2026-07-02T07:40:00Z",
		verified: true,
	},
	{ name: "Pricing Engine", version: "2.8", lastUpdated: "2026-07-02T07:42:00Z", verified: true },
	{ name: "Market Data Feed", lastUpdated: "2026-06-30T23:59:00Z", verified: false },
];

export default function DashboardPage() {
	const needsReview = flaggedItems.filter((i) => i.status === "needs-review").length;
	const highPriority = flaggedItems.filter(
		(i) => i.confidence === "uncertain" || i.confidence === "low",
	).length;

	return (
		<SidebarProvider>
			{/* ─── SIDEBAR ────────────────────────────────────────── */}
			<Sidebar collapsible="icon">
				<SidebarHeader className="p-4">
					<div className="flex items-center gap-2">
						<span className="text-lg font-bold text-action">◆</span>
						<span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
							GYKMI Risk
						</span>
					</div>
				</SidebarHeader>
				<SidebarSeparator />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Overview</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton isActive tooltip="Morning review">
										<span>📋</span>
										<span>Morning review</span>
									</SidebarMenuButton>
									<SidebarMenuBadge>{needsReview}</SidebarMenuBadge>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Portfolios">
										<span>📊</span>
										<span>Portfolios</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Counterparties">
										<span>🏦</span>
										<span>Counterparties</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Compliance</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Audit trail">
										<span>📜</span>
										<span>Audit trail</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Reports">
										<span>📄</span>
										<span>Reports</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton tooltip="Regulatory">
										<span>⚖️</span>
										<span>Regulatory</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarSeparator />
				<SidebarFooter className="p-4">
					<div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
						<div className="flex h-7 w-7 items-center justify-center rounded-full bg-action text-xs font-medium text-action-text">
							NK
						</div>
						<div className="text-xs group-data-[collapsible=icon]:hidden">
							<p className="font-medium text-text">Nadia K.</p>
							<p className="text-text-muted">Risk analyst</p>
						</div>
					</div>
				</SidebarFooter>
			</Sidebar>

			{/* ─── MAIN CONTENT ────────────────────────────────────── */}
			<SidebarInset>
				<div className="px-6 py-8">
					<Stack gap="6">
						{/* ─── HEADER ─────────────────────────────────────────── */}
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-3">
								<SidebarTrigger className="md:hidden" />
								<div>
									<p className="text-sm text-text-muted">Morning risk review — 2 July 2026</p>
									<h1 className="text-2xl font-bold text-text">
										{needsReview} items need review
										{highPriority > 0 && (
											<span className="ml-2 text-lg font-normal text-danger">
												{highPriority} model-uncertain
											</span>
										)}
									</h1>
								</div>
							</div>
							<ThemeToggle />
						</div>

						{/* ─── COMPLIANCE ALERT (dismissible, low severity — Nadia sees this daily) ─── */}
						<ComplianceBanner severity="info" title="Stale data source" dismissible>
							Market Data Feed last updated 30 June.
						</ComplianceBanner>

						{/* ─── AI SUMMARY ──────────────────────────────────────── */}
						<AnalysisSection
							title="Risk summary"
							confidence="medium"
							confidenceScore={68}
							status="complete"
							generatedAt="2026-07-02T07:45:00Z"
						>
							<p>
								Meridian Capital exposure has risen to 17.4% (limit: 15%), sustained over three
								trading days. One structured credit position (est. $4.2M) has a model-uncertain
								valuation requiring sign-off before the morning report is released.
							</p>
							<Disclaimer variant="info" className="mt-3">
								AI-generated. Does not constitute a risk decision.
							</Disclaimer>
						</AnalysisSection>

						{/* ─── QUALIFYING KPIs ─────────────────────────────────── */}
						<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
							<Card>
								<CardHeader>
									<CardDescription className="text-xs">Meridian exposure</CardDescription>
									<CardTitle className="text-xl text-danger">17.4%</CardTitle>
									<p className="text-xs text-text-muted">Limit: 15.0%</p>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription className="text-xs">Portfolio VaR (99%)</CardDescription>
									<CardTitle className="text-xl text-warning">$2.8M</CardTitle>
									<p className="text-xs text-text-muted">Limit: $2.5M</p>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription className="text-xs">Model coverage</CardDescription>
									<CardTitle className="text-xl">95%</CardTitle>
									<p className="text-xs text-text-muted">1 position unscored</p>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription className="text-xs">Flagged items</CardDescription>
									<CardTitle className="text-xl">{flaggedItems.length}</CardTitle>
									<p className="text-xs text-text-muted">{needsReview} awaiting review</p>
								</CardHeader>
							</Card>
						</div>

						{/* ─── EXPOSURE TREND ──────────────────────────────────── */}
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Meridian Capital — 7 day exposure</CardTitle>
									<ConfidenceIndicator level="medium" score={68} />
								</div>
							</CardHeader>
							<CardContent>
								<ConfidenceChart
									data={exposureTrend}
									title="Meridian Capital counterparty exposure"
									bandLabel="95% confidence interval"
									height={240}
									showTable
									formatValue={(v) => `${v.toFixed(1)}%`}
								/>
							</CardContent>
						</Card>

						{/* ─── FLAGGED ITEMS ───────────────────────────────────── */}
						<div>
							<h2 className="mb-3 text-lg font-semibold text-text">Flagged items</h2>
							<DataTable
								columns={flaggedColumns}
								data={flaggedItems}
								getRowKey={(row) => row.id}
								caption="Items requiring review"
							/>
						</div>

						{/* ─── AUDIT TRAIL ─────────────────────────────────────── */}
						<div>
							<h3 className="mb-2 text-sm font-medium text-text-muted">Audit trail</h3>
							<AuditTrail entries={auditEntries} />
						</div>

						{/* ─── DATA SOURCES (secondary) ────────────────────────── */}
						<details className="text-sm">
							<summary className="cursor-pointer text-xs font-medium text-text-muted hover:text-text">
								Data sources ({dataSources.length})
							</summary>
							<div className="mt-2">
								<DataProvenance sources={dataSources} />
							</div>
						</details>

						{/* ─── REGULATORY (quiet) ──────────────────────────────── */}
						<div className="opacity-60">
							<RegulatoryNotice framework="FCA" reference="FRN-123456">
								Authorised and regulated by the FCA. AI outputs reviewed before release.
							</RegulatoryNotice>
						</div>
					</Stack>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
