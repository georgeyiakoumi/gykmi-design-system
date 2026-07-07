"use client";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	RadioCards,
	RadioCardsItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
} from "@gykmi/ui";
import { Database, FileUp, Globe, Link2, Plus } from "lucide-react";
import { useState } from "react";

interface AddSourceDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAdd: (source: { name: string; type: string; url: string; refresh: string }) => void;
}

const sourceTypes = [
	{ value: "api", icon: Globe, label: "API", description: "REST or WebSocket feed" },
	{ value: "database", icon: Database, label: "Database", description: "SQL or NoSQL connection" },
	{ value: "file", icon: FileUp, label: "File", description: "CSV, XML, or JSON upload" },
];

const refreshIntervals = [
	{ value: "realtime", label: "Real-time" },
	{ value: "hourly", label: "Hourly" },
	{ value: "daily", label: "Daily" },
	{ value: "manual", label: "Manual" },
];

export function AddSourceDialog({ open, onOpenChange, onAdd }: AddSourceDialogProps) {
	const [type, setType] = useState("api");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [refresh, setRefresh] = useState("daily");

	function handleAdd() {
		onAdd({ name, type, url, refresh });
		setName("");
		setUrl("");
		setType("api");
		setRefresh("daily");
		onOpenChange(false);
	}

	const urlLabel =
		type === "api"
			? "Endpoint URL"
			: type === "database"
				? "Connection string"
				: "File path or URL";
	const urlPlaceholder =
		type === "api"
			? "https://api.bloomberg.com/v1/feed"
			: type === "database"
				? "postgresql://host:5432/db"
				: "/uploads/filings-2026.csv";

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="space-y-6">
				<DialogHeader>
					<DialogTitle>Add data source</DialogTitle>
					<DialogDescription>Connect a new data source to the risk platform.</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3">
					<Label className="text-sm font-medium">Source type</Label>
					<RadioCards value={type} onValueChange={setType} className="grid-cols-3">
						{sourceTypes.map((s) => (
							<RadioCardsItem
								key={s.value}
								value={s.value}
								icon={<s.icon size={20} />}
								label={s.label}
								description={s.description}
							/>
						))}
					</RadioCards>
				</div>

				<div className="flex flex-col gap-3">
					<div className="space-y-2">
						<Label htmlFor="source-name">Display name</Label>
						<Input
							id="source-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g. Bloomberg Terminal"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="source-url">{urlLabel}</Label>
						<Input
							id="source-url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder={urlPlaceholder}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="source-refresh">Refresh interval</Label>
						<Select value={refresh} onValueChange={setRefresh}>
							<SelectTrigger id="source-refresh">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{refreshIntervals.map((r) => (
									<SelectItem key={r.value} value={r.value}>
										{r.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<Button variant="secondary" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleAdd}
						disabled={!name.trim() || !url.trim()}
						iconLeft={<Link2 size={16} />}
					>
						Connect
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
