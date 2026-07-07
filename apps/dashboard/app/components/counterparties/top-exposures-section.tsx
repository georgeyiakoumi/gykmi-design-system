"use client";

import type { ChartDataPoint } from "@gykmi/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	BarChart,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Label,
	Slider,
	Text,
	Toaster,
	useToast,
} from "@gykmi/ui";
import { Bell, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface TopExposuresSectionProps {
	data: ChartDataPoint[];
}

// Current limits per counterparty (dummy data)
const counterpartyLimits: Record<string, { current: number; limit: number }> = {
	"Hawkstone Partners": { current: 7.0, limit: 6.0 },
	"Apex Partners": { current: 5.3, limit: 8.0 },
	"Ironvale Group": { current: 4.1, limit: 7.0 },
	"Clearwater Ltd": { current: 3.8, limit: 6.5 },
	"Crest Holdings": { current: 3.2, limit: 5.0 },
};

export function TopExposuresSection({ data }: TopExposuresSectionProps) {
	const { toasts, toast, dismiss } = useToast();
	const [showLimits, setShowLimits] = useState(false);
	const [limits, setLimits] = useState<Record<string, number>>(() =>
		Object.fromEntries(Object.entries(counterpartyLimits).map(([k, v]) => [k, v.limit])),
	);

	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Top exposures
			</Text>
			<Card>
				<CardHeader>
					<CardTitle className="text-xs text-text-muted uppercase tracking-wider">
						Exposure by counterparty ($M)
					</CardTitle>
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
				<CardFooter className="sm:justify-end">
					<div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
						<Button
							variant="secondary"
							size="sm"
							iconLeft={<Bell size={14} />}
							onClick={() =>
								toast({
									title: "Alerts configured",
									description:
										"You will be notified when any top-5 counterparty exceeds 90% utilisation.",
									variant: "success",
								})
							}
						>
							Set alerts
						</Button>
						<Button variant="secondary" size="sm" iconLeft={<SlidersHorizontal size={14} />} onClick={() => setShowLimits(true)}>
							Adjust limits
						</Button>
					</div>
				</CardFooter>
			</Card>

			{/* Adjust limits dialog with Accordion */}
			<Dialog open={showLimits} onOpenChange={setShowLimits}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Adjust counterparty limits</DialogTitle>
						<DialogDescription>
							Review and adjust exposure limits for each counterparty. Changes require risk
							committee approval.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4">
						<Accordion type="single" collapsible>
							{Object.entries(counterpartyLimits).map(([name, info]) => (
								<AccordionItem key={name} value={name}>
									<AccordionTrigger>
										<div className="flex items-center justify-between w-full pr-2">
											<span className="text-sm">{name}</span>
											<span className="text-xs text-text-muted tabular-nums">
												${info.current.toFixed(1)}M / ${(limits[name] ?? info.limit).toFixed(1)}M
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-3 pt-2">
											<div className="flex items-center justify-between">
												<Label className="text-xs text-text-muted">New limit</Label>
												<span className="text-sm font-semibold tabular-nums">
													${(limits[name] ?? info.limit).toFixed(1)}M
												</span>
											</div>
											<Slider
												value={[limits[name] ?? info.limit]}
												onValueChange={([v]) => setLimits((prev) => ({ ...prev, [name]: v }))}
												min={1}
												max={20}
												step={0.5}
											/>
											<div className="flex justify-between text-xs text-text-muted">
												<span>$1.0M</span>
												<span>$20.0M</span>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
					<div className="mt-6 flex justify-end gap-2">
						<Button variant="secondary" onClick={() => setShowLimits(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								const changed = Object.entries(limits).filter(
									([name, val]) => val !== counterpartyLimits[name]?.limit,
								);
								toast({
									title: changed.length > 0 ? "Limits updated" : "No changes",
									description:
										changed.length > 0
											? `${changed.length} counterparty limit${changed.length !== 1 ? "s" : ""} adjusted. Pending risk committee approval.`
											: "No limits were changed.",
									variant: changed.length > 0 ? "success" : "default",
								});
								setShowLimits(false);
							}}
						>
							Apply changes
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Toaster toasts={toasts} onDismiss={dismiss} />
		</div>
	);
}
