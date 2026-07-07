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
	ConfidenceIndicator,
	DataTable,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Text,
	Toaster,
	useToast,
} from "@gykmi/ui";
import { ArrowUpRight, Check, MoreHorizontal, PenLine } from "lucide-react";
import { useState } from "react";

export interface FlaggedItem {
	id: string;
	description: string;
	metric: string;
	value: string;
	threshold: string;
	confidence: "high" | "medium" | "low" | "uncertain";
	source: string;
	status: "needs-review" | "acknowledged" | "escalated";
}

// ─── SHARED ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: FlaggedItem["status"] }) {
	const variant =
		status === "needs-review" ? "danger" : status === "escalated" ? "warning" : "default";
	const label =
		status === "needs-review"
			? "Needs review"
			: status === "escalated"
				? "Escalated"
				: "Acknowledged";
	return <Badge variant={variant} label={label} />;
}

// ─── ACTIONS MENU (DESKTOP) ─────────────────────────────────────────────────

function ActionsMenu({
	item,
	onAction,
}: {
	item: FlaggedItem;
	onAction: (action: string, item: FlaggedItem) => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" aria-label={`Actions for ${item.id}`}>
					<MoreHorizontal size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{item.status === "needs-review" && (
					<>
						<DropdownMenuItem onSelect={() => onAction("acknowledge", item)}>
							Acknowledge
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => onAction("escalate", item)}>
							Escalate
						</DropdownMenuItem>
					</>
				)}
				{item.confidence === "uncertain" && (
					<DropdownMenuItem onSelect={() => onAction("sign-off", item)}>Sign off</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// ─── MOBILE CARD ─────────────────────────────────────────────────────────────

function FlaggedItemCard({
	item,
	onAction,
}: {
	item: FlaggedItem;
	onAction: (action: string, item: FlaggedItem) => void;
}) {
	return (
		<Card>
			<CardHeader>
				<StatusBadge status={item.status} />
				<CardAction>
					<ConfidenceIndicator level={item.confidence} />
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 pb-4">
				<p className="text-sm font-medium text-text">{item.description}</p>
				<div className="flex items-baseline gap-2 text-xs">
					<span className="font-medium text-text">{item.value}</span>
					<span className="text-text-muted">/ {item.threshold}</span>
				</div>
				<div className="flex flex-col gap-2 pt-1">
					{item.status === "needs-review" && (
						<>
							<Button variant="secondary" size="sm" iconLeft={<Check size={14} />} onClick={() => onAction("acknowledge", item)}>
								Acknowledge
							</Button>
							<Button variant="secondary" size="sm" iconLeft={<ArrowUpRight size={14} />} onClick={() => onAction("escalate", item)}>
								Escalate
							</Button>
						</>
					)}
					{item.confidence === "uncertain" && (
						<Button variant="default" size="sm" iconLeft={<PenLine size={14} />} onClick={() => onAction("sign-off", item)}>
							Sign off
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── CONFIRM DIALOG CONTENT ─────────────────────────────────────────────────

const confirmContent: Record<string, { title: string; description: string; action: string }> = {
	acknowledge: {
		title: "Acknowledge this flag?",
		description:
			"You are confirming that you have reviewed this item. It will be marked as acknowledged in the audit trail.",
		action: "Acknowledge",
	},
	escalate: {
		title: "Escalate to the risk committee?",
		description:
			"This will notify the risk committee and create an escalation record. This action cannot be undone.",
		action: "Escalate",
	},
	"sign-off": {
		title: "Sign off on this valuation?",
		description:
			"You are approving this model-uncertain valuation for release. Your sign-off will be recorded in the audit trail.",
		action: "Sign off",
	},
};

const toastContent: Record<
	string,
	{ title: string; description: string; variant?: "default" | "success" | "danger" }
> = {
	acknowledge: {
		title: "Flag acknowledged",
		description: "Recorded in the audit trail.",
		variant: "success",
	},
	escalate: {
		title: "Escalation sent",
		description: "The risk committee has been notified.",
		variant: "success",
	},
	"sign-off": {
		title: "Valuation signed off",
		description: "Your approval has been recorded.",
		variant: "success",
	},
};

// ─── SECTION ─────────────────────────────────────────────────────────────────

interface FlaggedItemsSectionProps {
	items: FlaggedItem[];
}

export function FlaggedItemsSection({ items }: FlaggedItemsSectionProps) {
	const { toasts, toast, dismiss } = useToast();
	const [confirmDialog, setConfirmDialog] = useState<{
		action: string;
		item: FlaggedItem;
	} | null>(null);

	function handleAction(action: string, item: FlaggedItem) {
		setConfirmDialog({ action, item });
	}

	function handleConfirm() {
		if (!confirmDialog) return;
		const content = toastContent[confirmDialog.action];
		if (content) {
			toast({
				title: content.title,
				description: `${confirmDialog.item.description} — ${content.description}`,
				variant: content.variant,
			});
		}
		setConfirmDialog(null);
	}

	const flaggedColumns: DataTableColumn<FlaggedItem>[] = [
		{
			key: "status",
			header: "Status",
			cell: (row) => <StatusBadge status={row.status} />,
			sortValue: (row) => row.status,
		},
		{ key: "description", header: "Description", cell: (row) => row.description },
		{
			key: "value",
			header: "Value / Threshold",
			cell: (row) => (
				<span>
					<span className="font-medium">{row.value}</span>
					<span className="text-text-muted"> / {row.threshold}</span>
				</span>
			),
		},
		{
			key: "confidence",
			header: "Confidence",
			cell: (row) => <ConfidenceIndicator level={row.confidence} />,
			sortValue: (row) => row.confidence,
		},
		{
			key: "actions",
			header: "",
			cell: (row) => <ActionsMenu item={row} onAction={handleAction} />,
		},
	];

	const dialog = confirmDialog ? confirmContent[confirmDialog.action] : null;

	return (
		<div id="flagged-items" className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Flagged items
			</Text>

			{/* Mobile: horizontal carousel */}
			<div className="lg:hidden overflow-x-auto scroll-fade-x snap-x snap-mandatory -mx-6 px-6">
				<div className="flex gap-3 w-max">
					{items.map((item) => (
						<div key={item.id} className="w-[80vw] max-w-xs snap-start shrink-0">
							<FlaggedItemCard item={item} onAction={handleAction} />
						</div>
					))}
				</div>
			</div>

			{/* Desktop: table */}
			<div className="hidden lg:block">
				<DataTable
					columns={flaggedColumns}
					data={items}
					getRowKey={(row) => row.id}
					caption="Items requiring review"
				/>
			</div>

			{/* Confirmation dialog */}
			<AlertDialog open={!!confirmDialog} onOpenChange={(open) => !open && setConfirmDialog(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{dialog?.title}</AlertDialogTitle>
						<AlertDialogDescription>{dialog?.description}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirm}>{dialog?.action}</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Toaster toasts={toasts} onDismiss={dismiss} />
		</div>
	);
}
