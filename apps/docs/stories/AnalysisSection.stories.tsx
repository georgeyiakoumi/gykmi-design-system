import { AnalysisSection, Disclaimer, Stack, StreamingText } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/AnalysisSection",
	component: AnalysisSection,
	tags: ["autodocs"],
} satisfies Meta<typeof AnalysisSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {
	render: () => (
		<AnalysisSection
			title="Revenue Forecast"
			confidence="high"
			confidenceScore={92}
			status="complete"
			generatedAt="2026-07-01T14:30:00Z"
		>
			<p>
				Based on the trailing twelve months of transaction data, projected revenue for Q3 2026 is
				estimated at $4.2M, representing a 12% increase from the prior quarter. This projection
				accounts for seasonal patterns observed in the 2024–2025 data.
			</p>
		</AnalysisSection>
	),
};

export const Streaming: Story = {
	render: () => (
		<AnalysisSection
			title="Risk Assessment"
			confidence="medium"
			confidenceScore={67}
			status="streaming"
		>
			<StreamingText status="streaming">
				The portfolio shows moderate exposure to interest rate risk, with 34% of holdings in
				variable-rate instruments...
			</StreamingText>
		</AnalysisSection>
	),
};

export const LowConfidence: Story = {
	render: () => (
		<Stack gap="4">
			<AnalysisSection
				title="Market Correlation"
				confidence="low"
				confidenceScore={31}
				status="complete"
			>
				<p>
					Insufficient historical data to establish a reliable correlation between the asset classes
					in question. The available sample covers only 8 months of trading data.
				</p>
			</AnalysisSection>
			<Disclaimer variant="warning" title="Limited data">
				This analysis is based on a dataset smaller than the recommended minimum for statistical
				significance. Results should be treated as indicative only.
			</Disclaimer>
		</Stack>
	),
};
