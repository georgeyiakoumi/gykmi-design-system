"use client";

import { DashboardShell } from "./components/dashboard-shell";
import { ActivitySection } from "./components/morning-review/activity-section";
import { ExposureTrendSection } from "./components/morning-review/exposure-trend-section";
import type { FlaggedItem } from "./components/morning-review/flagged-items-section";
import { FlaggedItemsSection } from "./components/morning-review/flagged-items-section";
import { OverviewSection } from "./components/morning-review/overview-section";
import seed from "./data/seed.json";

const { exposureTrend, flaggedItems, auditEntries, dataSources } = seed.morningReview;

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
		<DashboardShell
			badges={[
				{
					label: "Review required",
					count: needsReview,
					variant: "warning",
					href: "#flagged-items",
				},
				{
					label: "Sign-off required",
					count: highPriority,
					variant: "default",
					href: "#flagged-items",
				},
			]}
		>
			<OverviewSection />
			<FlaggedItemsSection items={flaggedItems as FlaggedItem[]} />
			<ExposureTrendSection data={exposureTrend} />
			<ActivitySection auditEntries={auditEntries} dataSources={sortedDataSources} />
		</DashboardShell>
	);
}
