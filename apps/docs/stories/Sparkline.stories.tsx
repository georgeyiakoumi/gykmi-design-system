import { Sparkline } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Sparkline> = {
	title: "Charts/Sparkline",
	component: Sparkline,
	tags: ["autodocs"],
	args: {
		label: "Share price",
		height: 32,
		width: 120,
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "1rem" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: [42, 45, 43, 48, 52, 50, 55],
		label: "Share price",
	},
};

export const Positive: Story = {
	args: {
		data: [32, 35, 38, 42, 45, 50, 58],
		label: "Portfolio value (up)",
		color: "var(--fill-success-strong, #22c55e)",
	},
};

export const Negative: Story = {
	args: {
		data: [58, 55, 50, 48, 42, 38, 34],
		label: "Bond yield (down)",
		color: "var(--fill-error-strong, #dc2626)",
	},
};
