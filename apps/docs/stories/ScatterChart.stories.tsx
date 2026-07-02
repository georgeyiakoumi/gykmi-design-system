import { ScatterChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const riskReturnData = [
	{ x: 4.2, y: 6.8, label: "Global Equity" },
	{ x: 2.1, y: 3.5, label: "Investment Grade" },
	{ x: 8.5, y: 12.4, label: "Emerging Markets" },
	{ x: 1.8, y: 2.9, label: "Money Market" },
	{ x: 6.3, y: 9.1, label: "High Yield" },
	{ x: 3.7, y: 5.2, label: "Multi-Asset" },
	{ x: 5.9, y: 8.7, label: "Small Cap" },
	{ x: 7.1, y: 10.3, label: "Private Equity" },
];

const meta = {
	title: "Charts/ScatterChart",
	component: ScatterChart,
	tags: ["autodocs"],
	args: {
		data: riskReturnData,
		title: "Risk vs Return",
		xLabel: "Volatility (%)",
		yLabel: "Return (%)",
		height: 300,
	},
} satisfies Meta<typeof ScatterChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
	args: {
		color: "var(--color-green-500, #22c55e)",
		title: "Fund Performance",
	},
};

export const WithoutGrid: Story = {
	args: {
		showGrid: false,
		title: "Risk vs Return (clean)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Risk vs Return",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Risk vs Return",
	},
};
