"use client";

import { Plus } from "lucide-react";
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

interface ActivitySectionProps {
	auditEntries: AuditEntry[];
	dataSources: DataSource[];
}

export function ActivitySection({ auditEntries, dataSources }: ActivitySectionProps) {
	return (
		<div className="grid lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr] gap-4">
			<Text as="h2" variant="heading-xl" className="col-span-full">Activity</Text>

			<Card className="min-w-0 h-64">
				<CardHeader>
					<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Recent activity</CardTitle>
				</CardHeader>
				<CardContent className="pb-6">
					<AuditTrail entries={auditEntries} />
				</CardContent>
			</Card>
			<Card className="flex flex-col overflow-hidden h-64">
				<CardHeader>
					<CardTitle className="text-xs text-text-muted uppercase tracking-wider">Data sources</CardTitle>
					<CardAction>
						<Button variant="ghost" size="sm" className="h-5 w-5 p-0" aria-label="Add data source">
							<Plus size={14} />
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent className="flex-1 overflow-hidden pb-6">
					<ScrollArea type="always" className="h-full" viewportClassName="scroll-fade">
						<DataProvenance sources={dataSources} />
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
