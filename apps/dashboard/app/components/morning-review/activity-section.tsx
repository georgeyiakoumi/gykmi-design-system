"use client";

import type { AuditEntry, DataSource } from "@gykmi/ui";
import {
	AuditTrail,
	Button,
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
	DataProvenance,
	ScrollArea,
	Text,
} from "@gykmi/ui";
import { Plus } from "lucide-react";

interface ActivitySectionProps {
	auditEntries: AuditEntry[];
	dataSources: DataSource[];
}

export function ActivitySection({ auditEntries, dataSources }: ActivitySectionProps) {
	return (
		<div className="flex flex-col gap-4">
			<Text as="h2" variant="heading-xl">
				Activity
			</Text>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] lg:grid-rows-[1fr]">
				<Card className="min-w-0 lg:h-64">
					<CardHeader>
						<CardTitle className="text-xs text-text-muted uppercase tracking-wider">
							Recent activity
						</CardTitle>
					</CardHeader>
					<CardContent className="pb-6 lg:h-[calc(16rem-3.5rem)] lg:overflow-hidden">
						<AuditTrail entries={auditEntries} />
					</CardContent>
				</Card>
				<Card className="flex flex-col overflow-hidden lg:h-64">
					<CardHeader>
						<CardTitle className="text-xs text-text-muted uppercase tracking-wider">
							Data sources
						</CardTitle>
						<CardAction>
							<Button
								variant="ghost"
								size="sm"
								className="h-5 w-5 p-0"
								aria-label="Add data source"
							>
								<Plus size={14} />
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent className="pb-6 lg:flex-1 lg:overflow-hidden">
						{/* Mobile: plain list */}
						<div className="lg:hidden">
							<DataProvenance sources={dataSources} />
						</div>
						{/* Desktop: scrollable */}
						<div className="hidden lg:block h-full">
							<ScrollArea type="always" className="h-full" viewportClassName="scroll-fade">
								<DataProvenance sources={dataSources} />
							</ScrollArea>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
