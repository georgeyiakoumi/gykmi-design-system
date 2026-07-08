"use client";

import type { HeatmapRow } from "@gykmi/ui";
import { Card, CardContent, CardHeader, CardTitle, HeatmapChart, Text } from "@gykmi/ui";

interface HeatmapSectionProps {
	data: HeatmapRow[];
	columnLabels: string[];
}

export function HeatmapSection({ data, columnLabels }: HeatmapSectionProps) {
	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Exposure by asset class
			</Text>
			<Card variant="sunken">
				<CardHeader>
					<CardTitle className="text-xs text-text-weak uppercase tracking-wider">
						Counterparty vs asset class ($M)
					</CardTitle>
				</CardHeader>
				<CardContent>
					<HeatmapChart
						data={data}
						columnLabels={columnLabels}
						title="Counterparty exposure by asset class"
						height={240}
						colorFrom="#eef2ff"
						colorTo="#2563eb"
						formatValue={(v) => `$${v.toFixed(1)}M`}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
