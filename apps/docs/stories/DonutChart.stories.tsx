import { DonutChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const allocationData = [
	{ label: "Equities", value: 42000 },
	{ label: "Fixed Income", value: 28000 },
	{ label: "Alternatives", value: 15000 },
	{ label: "Cash", value: 8000 },
	{ label: "Real Estate", value: 7000 },
];

const meta = {
	title: "Charts/DonutChart",
	component: DonutChart,
	tags: ["autodocs"],
	args: {
		data: allocationData,
		title: "Portfolio Allocation",
		height: 300,
	},
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NarrowRing: Story = {
	args: {
		innerRadiusRatio: 0.8,
		title: "AUM Distribution",
	},
};

export const WithoutLabels: Story = {
	args: {
		showLabels: false,
		title: "Sector Weights",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Portfolio Allocation",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Portfolio Allocation",
	},
};
