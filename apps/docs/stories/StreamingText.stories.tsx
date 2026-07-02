import { StreamingText } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/StreamingText",
	component: StreamingText,
	tags: ["autodocs"],
	argTypes: {
		status: {
			control: "select",
			options: ["idle", "streaming", "complete", "error"],
		},
		showCursor: { control: "boolean" },
	},
	args: {
		children: "Analysing portfolio risk factors across 12 asset classes...",
	},
} satisfies Meta<typeof StreamingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { status: "idle" } };

export const Streaming: Story = { args: { status: "streaming" } };

export const StreamingNoCursor: Story = {
	args: { status: "streaming", showCursor: false },
};

export const Complete: Story = {
	args: {
		status: "complete",
		children: "Analysis complete. Risk-adjusted returns show a 12.4% improvement year-over-year.",
	},
};

export const ErrorState: Story = {
	args: {
		status: "error",
		children: "Unable to complete analysis — model confidence below threshold.",
	},
};

export const AllStatuses: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 500 }}>
			<StreamingText status="idle">Idle — waiting to start.</StreamingText>
			<StreamingText status="streaming">Streaming output in progress...</StreamingText>
			<StreamingText status="complete">Complete. Final output rendered.</StreamingText>
			<StreamingText status="error">Error — generation failed.</StreamingText>
		</div>
	),
};
