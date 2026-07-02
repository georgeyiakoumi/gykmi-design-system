import { GaugeChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Charts/GaugeChart",
	component: GaugeChart,
	tags: ["autodocs"],
	args: {
		value: 72,
		max: 100,
		title: "Portfolio Health Score",
		height: 180,
	},
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		value: 84,
		label: "out of 100",
		title: "Client Satisfaction",
	},
};

export const HighValue: Story = {
	args: {
		value: 95,
		color: "var(--color-green-500, #22c55e)",
		title: "Compliance Score",
	},
};

export const LowValue: Story = {
	args: {
		value: 28,
		color: "var(--color-red-500, #ef4444)",
		title: "Liquidity Risk",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		value: 0,
		title: "Portfolio Health Score",
	},
};
