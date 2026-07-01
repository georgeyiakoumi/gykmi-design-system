import { DataProvenance } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/DataProvenance",
	component: DataProvenance,
	tags: ["autodocs"],
} satisfies Meta<typeof DataProvenance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		sources: [
			{
				name: "Bloomberg Terminal",
				version: "2024.3",
				lastUpdated: "2026-07-01T12:00:00Z",
				verified: true,
			},
			{
				name: "Internal Ledger",
				version: "3.2.1",
				lastUpdated: "2026-07-01T14:00:00Z",
				verified: true,
			},
			{ name: "Market Data Feed", lastUpdated: "2026-06-30T23:59:00Z", verified: false },
			{
				name: "Regulatory Filings (SEC)",
				version: "Q2-2026",
				lastUpdated: "2026-06-28T00:00:00Z",
				verified: true,
			},
		],
	},
};

export const Empty: Story = {
	args: { sources: [] },
};
