"use client";

import { useState } from "react";
import type { AuditEntry, DataSource } from "@gykmi/ui";
import {
	AuditTrail,
	Badge,
	Button,
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	DataProvenance,
	ScrollArea,
	Text,
	Toaster,
	useToast,
} from "@gykmi/ui";
import { Eye, Plus, RefreshCw, X } from "lucide-react";
import { AddSourceDialog } from "./add-source-dialog";

function DataSourceCard({ source }: { source: DataSource }) {
	const isStale = source.verified === false;
	return (
		<Card className="flex flex-col h-full">
			<CardHeader>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-1.5">
						{source.version && <Badge variant="default" label={`v${source.version}`} />}
						{isStale && <Badge variant="warning" label="Stale" />}
					</div>
					<CardTitle className="text-sm">{source.name}</CardTitle>
				</div>
				<CardAction>
					<Button
						variant="ghost"
						size="sm"
						className="h-5 w-5 p-0"
						aria-label={`Remove ${source.name}`}
					>
						<X size={12} />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="flex-1" />
			<CardFooter className="justify-between">
				<Button variant="secondary" size="sm" iconLeft={<Eye size={14} />}>
					View
				</Button>
				<Button variant="secondary" size="sm" iconLeft={<RefreshCw size={14} />}>
					Refresh
				</Button>
			</CardFooter>
		</Card>
	);
}

interface ActivitySectionProps {
	auditEntries: AuditEntry[];
	dataSources: DataSource[];
}

export function ActivitySection({ auditEntries, dataSources }: ActivitySectionProps) {
	const { toasts, toast, dismiss } = useToast();
	const [showAddSource, setShowAddSource] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Activity
			</Text>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr]">
				{/* Audit log — no card on mobile, card on desktop */}
				<div className="flex flex-col gap-2 lg:col-span-1 lg:row-span-1 min-w-0">
					{/* Mobile: label + bare timeline */}
					<div className="lg:hidden">
						<Text
							as="h3"
							variant="label-xs"
							className="text-text-muted uppercase tracking-wider mb-2"
						>
							Audit log
						</Text>
						<AuditTrail entries={auditEntries} />
					</div>
					{/* Desktop: card with label inside */}
					<Card className="hidden lg:flex flex-col min-w-0 h-64 overflow-hidden">
						<CardHeader>
							<CardTitle className="text-xs text-text-muted uppercase tracking-wider">
								Audit log
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-hidden">
							<AuditTrail entries={auditEntries} />
						</CardContent>
					</Card>
				</div>
				{/* Mobile: data source carousel */}
				<div className="lg:hidden flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<Text as="h3" variant="label-xs" className="text-text-muted uppercase tracking-wider">
							Data sources
						</Text>
						<Button variant="ghost" size="sm" className="h-5 w-5 p-0" aria-label="Add data source" onClick={() => setShowAddSource(true)}>
							<Plus size={14} />
						</Button>
					</div>
					<div className="overflow-x-auto scroll-fade-x snap-x snap-mandatory -mx-6 px-6">
						<div className="flex gap-3 w-max">
							{dataSources.map((source) => (
								<div key={source.name} className="w-[60vw] max-w-[200px] snap-start shrink-0">
									<DataSourceCard source={source} />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Desktop: data sources card */}
				<Card className="hidden lg:flex flex-col overflow-hidden lg:h-64">
					<CardHeader>
						<CardTitle className="text-xs text-text-muted uppercase tracking-wider">
							Data sources
						</CardTitle>
						<CardAction>
							<Button
								variant="secondary"
								size="sm"
								aria-label="Add data source"
								onClick={() => setShowAddSource(true)}
							>
								<Plus size={12} />
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent className="pb-6 flex-1 overflow-hidden">
						<ScrollArea type="always" className="h-full" viewportClassName="scroll-fade">
							<DataProvenance sources={dataSources} />
						</ScrollArea>
					</CardContent>
				</Card>
			</div>

			<AddSourceDialog
				open={showAddSource}
				onOpenChange={setShowAddSource}
				onAdd={(source) =>
					toast({
						title: "Source connected",
						description: `${source.name} (${source.type.toUpperCase()}) added with ${source.refresh} refresh.`,
						variant: "success",
					})
				}
			/>
			<Toaster toasts={toasts} onDismiss={dismiss} />
		</div>
	);
}
