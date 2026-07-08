"use client";

import { AnalysisSection, Card, CardContent, CardHeader, CardTitle, MetricCard } from "@gykmi/ui";

export function OverviewSection() {
	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
			<AnalysisSection
				title="Risk summary"
				summary="Hawkstone Partners exposure has risen to 17.4% (limit: 15%), sustained over three trading days. One structured credit position (est. $4.2M) has a model-uncertain valuation requiring sign-off before the morning report is released."
				confidence="medium"
				confidenceScore={68}
				status="complete"
				generatedAt="2026-07-02T07:45:00Z"
			/>

			<Card variant="sunken">
				<CardHeader>
					<CardTitle className="text-xs text-text-weak uppercase tracking-wider">
						Key metrics
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-1 pb-4 divide-y divide-border-weak">
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
	);
}
