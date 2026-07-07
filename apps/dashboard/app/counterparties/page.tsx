"use client";

import type { HeatmapRow } from "@gykmi/ui";
import { CounterpartyTableSection } from "../components/counterparties/counterparty-table-section";
import { HeatmapSection } from "../components/counterparties/heatmap-section";
import { MetricsSection } from "../components/counterparties/metrics-section";
import { TopExposuresSection } from "../components/counterparties/top-exposures-section";
import { DashboardShell } from "../components/dashboard-shell";
import seed from "../data/seed.json";

const {
	concentration,
	exposureTrend,
	topExposures,
	assetClasses,
	heatmap: heatmapData,
	counterparties,
} = seed.counterparties;

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

export default function CounterpartiesPage() {
	const typedCounterparties = counterparties as Counterparty[];
	const breached = typedCounterparties.filter((c) => c.status === "breached").length;
	const nearLimit = typedCounterparties.filter((c) => c.status === "near-limit").length;

	return (
		<DashboardShell badges={[{ label: "Near limit", count: nearLimit, variant: "warning" }]}>
			<MetricsSection
				counterparties={typedCounterparties}
				concentration={concentration}
				exposureTrend={exposureTrend}
			/>
			<TopExposuresSection data={topExposures} />
			<HeatmapSection data={heatmapData as HeatmapRow[]} columnLabels={assetClasses} />
			<CounterpartyTableSection data={typedCounterparties} />
		</DashboardShell>
	);
}
