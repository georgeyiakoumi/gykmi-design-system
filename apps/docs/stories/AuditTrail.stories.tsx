import { AuditTrail } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/AuditTrail",
	component: AuditTrail,
	tags: ["autodocs"],
} satisfies Meta<typeof AuditTrail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		entries: [
			{
				id: "1",
				timestamp: "2026-07-01T14:30:00Z",
				actor: "System",
				action: "Generated risk report",
				detail: "Model: claude-opus-4-6, confidence: 92%",
			},
			{
				id: "2",
				timestamp: "2026-07-01T14:25:00Z",
				actor: "George Y.",
				action: "Requested analysis",
				detail: "Parameters: Q3 2026 revenue forecast, all segments",
			},
			{
				id: "3",
				timestamp: "2026-07-01T14:20:00Z",
				actor: "System",
				action: "Data refresh completed",
				detail: "Sources: Bloomberg Terminal, internal ledger (v3.2.1)",
			},
			{
				id: "4",
				timestamp: "2026-07-01T10:00:00Z",
				actor: "Compliance Bot",
				action: "Scheduled review passed",
			},
		],
	},
};

export const Empty: Story = {
	args: { entries: [] },
};
