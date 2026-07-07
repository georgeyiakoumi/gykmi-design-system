"use client";

import type { DataTableColumn } from "@gykmi/ui";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardHeader,
	Carousel,
	CarouselItem,
	DataTable,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Label,
	Slider,
	Sparkline,
	Text,
	Toaster,
	useToast,
} from "@gykmi/ui";
import { ArrowUpRight, Eye, MoreHorizontal, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

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

// ─── SHARED ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Counterparty["status"] }) {
	const variant =
		status === "breached" ? "danger" : status === "near-limit" ? "warning" : "default";
	const label = status === "breached" ? "Breached" : status === "near-limit" ? "Near limit" : "OK";
	return <Badge variant={variant} label={label} />;
}

function sparklineColor(status: Counterparty["status"]) {
	return status === "breached"
		? "var(--fill-error-strong)"
		: status === "near-limit"
			? "var(--fill-warning-strong)"
			: "var(--fill-brand-strong)";
}

function utilisationColor(utilisation: number) {
	return utilisation > 100 ? "text-danger" : utilisation > 85 ? "text-warning" : "text-text-strong";
}

// ─── DUMMY POSITIONS ─────────────────────────────────────────────────────────

const positionsByCounterparty: Record<
	string,
	{ instrument: string; notional: string; pct: string }[]
> = {
	"Hawkstone Partners": [
		{ instrument: "Corp Bond 2028", notional: "$2.1M", pct: "5.2%" },
		{ instrument: "Credit Default Swap", notional: "$1.8M", pct: "4.5%" },
		{ instrument: "Equity Forward", notional: "$1.5M", pct: "3.7%" },
		{ instrument: "FX Option", notional: "$0.9M", pct: "2.2%" },
		{ instrument: "Interest Rate Swap", notional: "$0.7M", pct: "1.8%" },
	],
	"Apex Partners": [
		{ instrument: "Sovereign Bond 2030", notional: "$1.4M", pct: "3.5%" },
		{ instrument: "FX Forward", notional: "$1.1M", pct: "2.8%" },
		{ instrument: "Repo Agreement", notional: "$0.8M", pct: "2.0%" },
	],
};

const defaultPositions = [
	{ instrument: "Corp Bond", notional: "$1.2M", pct: "3.0%" },
	{ instrument: "Equity Swap", notional: "$0.8M", pct: "2.0%" },
];

// ─── ACTIONS MENU (DESKTOP) ─────────────────────────────────────────────────

function ActionsMenu({
	item,
	onAction,
}: {
	item: Counterparty;
	onAction: (action: string, item: Counterparty) => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" aria-label={`Actions for ${item.name}`}>
					<MoreHorizontal size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onSelect={() => onAction("view-positions", item)}>
					View positions
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAction("adjust-limit", item)}>
					Adjust limit
				</DropdownMenuItem>
				{item.status === "breached" && (
					<DropdownMenuItem onSelect={() => onAction("escalate", item)}>Escalate</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// ─── MOBILE CARD ─────────────────────────────────────────────────────────────

function CounterpartyCard({
	item,
	onAction,
}: {
	item: Counterparty;
	onAction: (action: string, item: Counterparty) => void;
}) {
	return (
		<Card variant="sunken">
			<CardHeader>
				<div className="flex items-center gap-2">
					<StatusBadge status={item.status} />
					<span className="font-medium text-sm text-text-strong">{item.name}</span>
				</div>
				<CardAction>
					<span className="text-xs text-text-weak">{item.rating}</span>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 pb-4">
				<Sparkline
					data={item.trend}
					label={`${item.name} trend`}
					height={24}
					color={sparklineColor(item.status)}
				/>
				<div className="grid grid-cols-3 gap-2 text-xs">
					<div>
						<p className="text-text-weak">Exposure</p>
						<p className="font-medium tabular-nums">${item.exposure.toFixed(1)}M</p>
					</div>
					<div>
						<p className="text-text-weak">Limit</p>
						<p className="tabular-nums text-text-weak">${item.limit.toFixed(1)}M</p>
					</div>
					<div>
						<p className="text-text-weak">Utilisation</p>
						<p className={`font-medium tabular-nums ${utilisationColor(item.utilisation)}`}>
							{item.utilisation.toFixed(1)}%
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2 pt-1">
					<Button
						variant="secondary"
						size="sm"
						iconLeft={<Eye size={14} />}
						onClick={() => onAction("view-positions", item)}
					>
						View positions
					</Button>
					<Button
						variant="secondary"
						size="sm"
						iconLeft={<SlidersHorizontal size={14} />}
						onClick={() => onAction("adjust-limit", item)}
					>
						Adjust limit
					</Button>
					{item.status === "breached" && (
						<Button
							variant="default"
							size="sm"
							iconLeft={<ArrowUpRight size={14} />}
							onClick={() => onAction("escalate", item)}
						>
							Escalate
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── ADJUST LIMIT DIALOG ────────────────────────────────────────────────────

function AdjustLimitDialog({
	counterparty,
	open,
	onOpenChange,
	onConfirm,
}: {
	counterparty: Counterparty | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (name: string, newLimit: number) => void;
}) {
	const [value, setValue] = useState<number[]>([]);

	const currentLimit = counterparty?.limit ?? 10;

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (o) setValue([currentLimit]);
				onOpenChange(o);
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adjust limit — {counterparty?.name}</DialogTitle>
					<DialogDescription>
						Current exposure: ${counterparty?.exposure.toFixed(1)}M. Drag the slider to set a new
						counterparty limit.
					</DialogDescription>
				</DialogHeader>
				<div className="mt-6 space-y-4">
					<div className="flex items-center justify-between">
						<Label>New limit</Label>
						<span className="text-sm font-semibold tabular-nums text-text-strong">
							${(value[0] ?? currentLimit).toFixed(1)}M
						</span>
					</div>
					<Slider
						value={value.length ? value : [currentLimit]}
						onValueChange={setValue}
						min={1}
						max={30}
						step={0.5}
					/>
					<div className="flex justify-between text-xs text-text-weak">
						<span>$1.0M</span>
						<span>$30.0M</span>
					</div>
				</div>
				<div className="mt-6 flex justify-end gap-2">
					<Button variant="secondary" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							onConfirm(counterparty?.name ?? "", value[0] ?? currentLimit);
							onOpenChange(false);
						}}
					>
						Apply limit
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ─── SECTION ─────────────────────────────────────────────────────────────────

interface CounterpartyTableSectionProps {
	data: Counterparty[];
}

export function CounterpartyTableSection({ data }: CounterpartyTableSectionProps) {
	const { toasts, toast, dismiss } = useToast();
	const [positionsDialog, setPositionsDialog] = useState<Counterparty | null>(null);
	const [adjustDialog, setAdjustDialog] = useState<Counterparty | null>(null);
	const [escalateDialog, setEscalateDialog] = useState<Counterparty | null>(null);

	function handleAction(action: string, item: Counterparty) {
		if (action === "view-positions") setPositionsDialog(item);
		if (action === "adjust-limit") setAdjustDialog(item);
		if (action === "escalate") setEscalateDialog(item);
	}

	const counterpartyColumns: DataTableColumn<Counterparty>[] = [
		{
			key: "status",
			header: "Status",
			cell: (row) => <StatusBadge status={row.status} />,
			sortValue: (row) => row.status,
		},
		{
			key: "name",
			header: "Counterparty",
			cell: (row) => <span className="font-medium">{row.name}</span>,
		},
		{
			key: "exposure",
			header: "Exposure ($M)",
			cell: (row) => <span className="tabular-nums">{row.exposure.toFixed(1)}</span>,
			sortValue: (row) => row.exposure,
		},
		{
			key: "limit",
			header: "Limit ($M)",
			cell: (row) => <span className="tabular-nums text-text-weak">{row.limit.toFixed(1)}</span>,
			sortValue: (row) => row.limit,
		},
		{
			key: "utilisation",
			header: "Utilisation",
			cell: (row) => (
				<span className={`tabular-nums font-medium ${utilisationColor(row.utilisation)}`}>
					{row.utilisation.toFixed(1)}%
				</span>
			),
			sortValue: (row) => row.utilisation,
		},
		{
			key: "rating",
			header: "Rating",
			cell: (row) => <span className="text-text-weak">{row.rating}</span>,
		},
		{
			key: "trend",
			header: "7d trend",
			cell: (row) => (
				<Sparkline
					data={row.trend}
					label={`${row.name} trend`}
					height={20}
					width={56}
					color={sparklineColor(row.status)}
				/>
			),
		},
		{
			key: "actions",
			header: "",
			cell: (row) => <ActionsMenu item={row} onAction={handleAction} />,
		},
	];

	const positions = positionsDialog
		? (positionsByCounterparty[positionsDialog.name] ?? defaultPositions)
		: [];

	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				All counterparties
			</Text>

			{/* Mobile: horizontal carousel */}
			<Carousel className="lg:hidden">
				{data.map((item) => (
					<CarouselItem key={item.id} width="80vw" maxWidth="max-w-xs">
						<CounterpartyCard item={item} onAction={handleAction} />
					</CarouselItem>
				))}
			</Carousel>

			{/* Desktop: table */}
			<div className="hidden lg:block">
				<DataTable
					columns={counterpartyColumns}
					data={data}
					getRowKey={(row) => row.id}
					caption="Counterparty exposure summary"
				/>
			</div>

			{/* View positions dialog */}
			<Dialog open={!!positionsDialog} onOpenChange={(open) => !open && setPositionsDialog(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{positionsDialog?.name} — Position breakdown</DialogTitle>
						<DialogDescription>
							Positions contributing to the ${positionsDialog?.exposure.toFixed(1)}M exposure (
							{positionsDialog?.utilisation.toFixed(1)}% utilisation).
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 space-y-3">
						{positions.map((pos) => (
							<div key={pos.instrument} className="flex items-center justify-between text-sm">
								<span className="text-text-strong">{pos.instrument}</span>
								<div className="flex items-center gap-4">
									<span className="text-text-weak">{pos.notional}</span>
									<span className="font-medium text-text-strong tabular-nums w-12 text-right">
										{pos.pct}
									</span>
								</div>
							</div>
						))}
						<div className="flex items-center justify-between text-sm font-semibold border-t border-border-weak pt-3">
							<span className="text-text-strong">Total exposure</span>
							<span className="tabular-nums">${positionsDialog?.exposure.toFixed(1)}M</span>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Adjust limit dialog */}
			<AdjustLimitDialog
				counterparty={adjustDialog}
				open={!!adjustDialog}
				onOpenChange={(open) => !open && setAdjustDialog(null)}
				onConfirm={(name, newLimit) =>
					toast({
						title: "Limit updated",
						description: `${name} limit set to $${newLimit.toFixed(1)}M. Pending risk committee approval.`,
					})
				}
			/>

			{/* Escalate confirmation */}
			<AlertDialog
				open={!!escalateDialog}
				onOpenChange={(open) => !open && setEscalateDialog(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Escalate {escalateDialog?.name}?</AlertDialogTitle>
						<AlertDialogDescription>
							This will notify the risk committee about the limit breach at{" "}
							{escalateDialog?.utilisation.toFixed(1)}% utilisation ($
							{escalateDialog?.exposure.toFixed(1)}M / ${escalateDialog?.limit.toFixed(1)}M). An
							escalation record will be created.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() =>
								toast({
									title: "Escalation sent",
									description: `${escalateDialog?.name} limit breach escalated to the risk committee.`,
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
