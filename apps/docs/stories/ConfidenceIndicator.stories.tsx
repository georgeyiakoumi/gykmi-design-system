import { ConfidenceIndicator, Stack } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/ConfidenceIndicator",
	component: ConfidenceIndicator,
	tags: ["autodocs"],
	argTypes: {
		level: { control: "select", options: ["high", "medium", "low", "uncertain"] },
		score: { control: { type: "range", min: 0, max: 100 } },
	},
	args: { level: "high" },
} satisfies Meta<typeof ConfidenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = { args: { level: "high", score: 95 } };
export const Medium: Story = { args: { level: "medium", score: 62 } };
export const Low: Story = { args: { level: "low", score: 28 } };
export const Uncertain: Story = { args: { level: "uncertain" } };

export const AllLevels: Story = {
	render: () => (
		<Stack gap="3">
			<ConfidenceIndicator level="high" score={95} />
			<ConfidenceIndicator level="medium" score={62} />
			<ConfidenceIndicator level="low" score={28} />
			<ConfidenceIndicator level="uncertain" />
		</Stack>
	),
};
