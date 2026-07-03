"use client";

import type { ConfidencePoint } from "@gykmi/ui";
import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	ConfidenceChart,
	ConfidenceIndicator,
	Text,
} from "@gykmi/ui";

interface ExposureTrendSectionProps {
	data: ConfidencePoint[];
}

export function ExposureTrendSection({ data }: ExposureTrendSectionProps) {
	return (
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
						data={data}
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
	);
}
