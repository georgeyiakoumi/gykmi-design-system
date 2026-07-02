import { RadarChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const riskProfileData = [
	{ axis: "Liquidity", value: 82 },
	{ axis: "Volatility", value: 65 },
	{ axis: "Sharpe Ratio", value: 91 },
	{ axis: "Max Drawdown", value: 48 },
	{ axis: "Alpha", value: 74 },
	{ axis: "Beta", value: 58 },
];

const meta = {
	title: "Charts/RadarChart",
	component: RadarChart,
	tags: ["autodocs"],
	args: {
		data: riskProfileData,
		title: "Fund Risk Profile",
		max: 100,
		height: 300,
	},
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
	args: {
		color: "var(--color-green-500, #22c55e)",
		title: "ESG Score Breakdown",
		data: [
			{ axis: "Environmental", value: 88 },
			{ axis: "Social", value: 72 },
			{ axis: "Governance", value: 95 },
			{ axis: "Transparency", value: 81 },
			{ axis: "Ethics", value: 90 },
		],
	},
};

export const InsufficientData: Story = {
	args: {
		data: [
			{ axis: "A", value: 50 },
			{ axis: "B", value: 60 },
		],
		title: "Fund Risk Profile",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Fund Risk Profile",
	},
};
