"use client";

import {
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Label,
	RadioCards,
	RadioCardsItem,
	Separator,
} from "@gykmi/ui";
import { Code, Download, FileText, Table } from "lucide-react";
import { useState } from "react";

interface ExportDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onExport: (format: string, sections: string[]) => void;
}

const formats = [
	{ value: "pdf", icon: FileText, label: "PDF", description: "Formatted report" },
	{ value: "csv", icon: Table, label: "CSV", description: "Raw data" },
	{ value: "json", icon: Code, label: "JSON", description: "Machine-readable" },
];

const sections = [
	{ key: "summary", label: "Risk summary & key metrics" },
	{ key: "flagged", label: "Flagged items" },
	{ key: "exposure", label: "Exposure trend" },
	{ key: "activity", label: "Activity & data sources" },
];

export function ExportDialog({ open, onOpenChange, onExport }: ExportDialogProps) {
	const [format, setFormat] = useState("pdf");
	const [selected, setSelected] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(sections.map((s) => [s.key, true])),
	);

	function handleExport() {
		const keys = Object.entries(selected)
			.filter(([, v]) => v)
			.map(([k]) => k);
		onExport(format, keys);
		onOpenChange(false);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="space-y-8">
				<DialogHeader>
					<DialogTitle>Export report</DialogTitle>
					<DialogDescription>
						Choose a format and select which sections to include in the export.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3">
					<Label className="text-sm font-medium">Format</Label>
					<RadioCards value={format} onValueChange={setFormat} className="grid-cols-3">
						{formats.map((f) => (
							<RadioCardsItem
								key={f.value}
								value={f.value}
								icon={<f.icon size={20} />}
								label={f.label}
								description={f.description}
							/>
						))}
					</RadioCards>
				</div>
				<div className="flex flex-col gap-3">
					<Label className="text-sm font-medium">Sections</Label>
					{sections.map((section) => (
						<div key={section.key} className="flex items-center gap-2">
							<Checkbox
								id={`export-${section.key}`}
								checked={selected[section.key]}
								onCheckedChange={(checked) =>
									setSelected((prev) => ({ ...prev, [section.key]: !!checked }))
								}
							/>
							<Label
								htmlFor={`export-${section.key}`}
								className="text-sm font-normal cursor-pointer"
							>
								{section.label}
							</Label>
						</div>
					))}
				</div>

				<div className="mt-6 flex justify-end gap-2">
					<Button variant="secondary" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleExport} iconLeft={<Download size={16} />}>Export</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
