"use client";

import type { ConfidencePoint } from "@gykmi/ui";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	ConfidenceChart,
	ConfidenceIndicator,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Text,
	Toaster,
	useToast,
} from "@gykmi/ui";
import { ArrowUpRight, Bell, Eye } from "lucide-react";
import { useState } from "react";

interface ExposureTrendSectionProps {
	data: ConfidencePoint[];
}

export function ExposureTrendSection({ data }: ExposureTrendSectionProps) {
	const { toasts, toast, dismiss } = useToast();
	const [showPositions, setShowPositions] = useState(false);
	const [showEscalate, setShowEscalate] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Exposure trend
			</Text>
			<Card>
				<CardHeader>
					<CardTitle className="text-xs text-text-muted uppercase tracking-wider">
						Hawkstone Partners — 7 day
					</CardTitle>
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
				<CardFooter className="flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
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
					<div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
						<Button
							variant="secondary"
							size="sm"
							iconLeft={<Bell size={14} />}
							onClick={() =>
								toast({
									title: "Alert configured",
									description: "You will be notified if Hawkstone exposure exceeds 18%.",
									variant: "success",
								})
							}
						>
							Set alert
						</Button>
						<Button variant="secondary" size="sm" iconLeft={<Eye size={14} />} onClick={() => setShowPositions(true)}>
							View positions
						</Button>
						<Button variant="default" size="sm" iconLeft={<ArrowUpRight size={14} />} onClick={() => setShowEscalate(true)}>
							Escalate
						</Button>
					</div>
				</CardFooter>
			</Card>

			{/* View positions dialog */}
			<Dialog open={showPositions} onOpenChange={setShowPositions}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Hawkstone Partners — Position breakdown</DialogTitle>
						<DialogDescription>
							Positions contributing to the 17.4% counterparty concentration.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 space-y-3">
						{[
							{ instrument: "Corp Bond 2028", notional: "$2.1M", pct: "5.2%" },
							{ instrument: "Credit Default Swap", notional: "$1.8M", pct: "4.5%" },
							{ instrument: "Equity Forward", notional: "$1.5M", pct: "3.7%" },
							{ instrument: "FX Option", notional: "$0.9M", pct: "2.2%" },
							{ instrument: "Interest Rate Swap", notional: "$0.7M", pct: "1.8%" },
						].map((pos) => (
							<div key={pos.instrument} className="flex items-center justify-between text-sm">
								<span className="text-text">{pos.instrument}</span>
								<div className="flex items-center gap-4">
									<span className="text-text-muted">{pos.notional}</span>
									<span className="font-medium text-text tabular-nums w-12 text-right">
										{pos.pct}
									</span>
								</div>
							</div>
						))}
						<div className="flex items-center justify-between text-sm font-semibold border-t border-border pt-3">
							<span className="text-text">Total exposure</span>
							<div className="flex items-center gap-4">
								<span className="text-text-muted">$7.0M</span>
								<span className="text-danger-text tabular-nums w-12 text-right">17.4%</span>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Escalate confirmation */}
			<AlertDialog open={showEscalate} onOpenChange={setShowEscalate}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Escalate Hawkstone exposure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will notify the risk committee about the sustained concentration breach at 17.4%
							(limit: 15%). An escalation record will be created.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() =>
								toast({
									title: "Escalation sent",
									description:
										"Hawkstone Partners concentration breach escalated to the risk committee.",
									variant: "success",
								})
							}
						>
							Escalate
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Toaster toasts={toasts} onDismiss={dismiss} />
		</div>
	);
}
