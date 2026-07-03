"use client";

import type { ChartDataPoint } from "@gykmi/ui";
import {
	BarChart,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Text,
} from "@gykmi/ui";

interface TopExposuresSectionProps {
	data: ChartDataPoint[];
}

export function TopExposuresSection({ data }: TopExposuresSectionProps) {
	return (
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
						data={data}
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
	);
}
