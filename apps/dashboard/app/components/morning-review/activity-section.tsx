"use client";

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
	Carousel,
	CarouselItem,
	DataProvenance,
	ScrollArea,
	Text,
	Toaster,
	useToast,
} from "@gykmi/ui";
import { Eye, Plus, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { AddSourceDialog } from "./add-source-dialog";

function DataSourceCard({ source }: { source: DataSource }) {
	const isStale = source.verified === false;
	return (
		<Card className="flex flex-col h-full">
			<CardHeader>
				<div className="flex items-center gap-1.5">
					{isStale ? (
						<Badge variant="warning" label="Stale" />
					) : (
						<Badge variant="default" label="Connected" />
					)}
				</div>
				<CardAction>
					<span className="text-xs text-text-muted">
						{source.version ? `v${source.version}` : ""}
					</span>
				</CardAction>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col gap-1">
				<p className="text-sm font-medium text-text">{source.name}</p>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button variant="secondary" size="sm" className="w-full" iconLeft={<Eye size={14} />}>
					View
				</Button>
				<Button variant="secondary" size="sm" className="w-full" iconLeft={<RefreshCw size={14} />}>
					Refresh
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className="w-full text-text-muted"
					iconLeft={<X size={14} />}
				>
					Remove
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
							className="text-text-muted uppercase tracking-wider mb-4"
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
						<Button
							variant="ghost"
							size="sm"
							className="h-5 w-5 p-0"
							aria-label="Add data source"
							onClick={() => setShowAddSource(true)}
						>
							<Plus size={14} />
						</Button>
					</div>
					<Carousel>
						{dataSources.map((source) => (
							<CarouselItem key={source.name} width="60vw" maxWidth="max-w-[200px]">
								<DataSourceCard source={source} />
							</CarouselItem>
						))}
					</Carousel>
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
