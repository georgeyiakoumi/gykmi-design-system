"use client";

import type { ChartDataPoint, TimeSeriesPoint } from "@gykmi/ui";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	chartColors,
	DonutChart,
	LineChart,
	MetricCard,
} from "@gykmi/ui";

const DONUT_COLORS = [
	chartColors.primary,
	chartColors.secondary,
	chartColors.tertiary,
	chartColors.quaternary,
	chartColors.danger,
	chartColors.muted,
];

interface Counterparty {
	exposure: number;
	utilisation: number;
}

interface MetricsSectionProps {
	counterparties: Counterparty[];
	concentration: ChartDataPoint[];
	exposureTrend: TimeSeriesPoint[];
}

export function MetricsSection({
	counterparties,
	concentration,
	exposureTrend,
}: MetricsSectionProps) {
	const totalExposure = counterparties.reduce((sum, c) => sum + c.exposure, 0);
	const avgUtilisation =
		counterparties.reduce((s, c) => s + c.utilisation, 0) / counterparties.length;

	return (
		<div className="grid grid-cols-1 gap-12 xl:grid-cols-3">
			<Card variant="sunken">
				<CardHeader>
					<CardTitle className="text-xs text-text-weak uppercase tracking-wider">
						Key metrics
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-1 pb-4 divide-y divide-border-weak">
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
						value={`${avgUtilisation.toFixed(1)}%`}
						context="Of approved limits"
					/>
				</CardContent>
			</Card>

			<Card variant="sunken">
				<CardHeader>
					<CardTitle className="text-xs text-text-weak uppercase tracking-wider">
						Concentration breakdown
					</CardTitle>
				</CardHeader>
				<CardContent>
					<DonutChart
						data={concentration}
						title="Portfolio concentration by counterparty"
						height={200}
						formatValue={(v) => `${v.toFixed(1)}%`}
					/>
				</CardContent>
				<CardFooter>
					<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-weak">
						{concentration.map((item, i) => (
							<span key={item.label} className="flex items-center gap-1.5">
								<span
									className="inline-block h-2 w-2 rounded-full"
									style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
								/>
								{item.label}
							</span>
						))}
					</div>
				</CardFooter>
			</Card>

			<Card variant="sunken">
				<CardHeader>
					<CardTitle className="text-xs text-text-weak uppercase tracking-wider">
						Total exposure — 7 day
					</CardTitle>
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
	);
}
