import { AnalysisSection } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/AnalysisSection",
	component: AnalysisSection,
	tags: ["autodocs"],
	args: { title: "Analysis" },
} satisfies Meta<typeof AnalysisSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {
	args: {
		title: "Revenue Forecast",
		summary:
			"Based on the trailing twelve months of transaction data, projected revenue for Q3 2026 is estimated at $4.2M, representing a 12% increase from the prior quarter.",
		confidence: "high",
		confidenceScore: 92,
		status: "complete",
		generatedAt: "2026-07-01T14:30:00Z",
	},
};

export const Streaming: Story = {
	args: {
		title: "Risk Assessment",
		confidence: "medium",
		confidenceScore: 67,
		status: "streaming",
	},
};

export const LowConfidence: Story = {
	args: {
		title: "Market Correlation",
		summary:
			"Insufficient historical data to establish a reliable correlation between the asset classes in question. The available sample covers only 8 months of trading data.",
		confidence: "low",
		confidenceScore: 31,
		status: "complete",
	},
};
