import { HeatmapChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const tradingActivityData = [
	{
		label: "AAPL",
		bins: [
			{ bin: 0, count: 42 },
			{ bin: 1, count: 28 },
			{ bin: 2, count: 65 },
			{ bin: 3, count: 38 },
			{ bin: 4, count: 51 },
		],
	},
	{
		label: "MSFT",
		bins: [
			{ bin: 0, count: 35 },
			{ bin: 1, count: 48 },
			{ bin: 2, count: 22 },
			{ bin: 3, count: 55 },
			{ bin: 4, count: 41 },
		],
	},
	{
		label: "GOOG",
		bins: [
			{ bin: 0, count: 18 },
			{ bin: 1, count: 32 },
			{ bin: 2, count: 71 },
			{ bin: 3, count: 45 },
			{ bin: 4, count: 29 },
		],
	},
	{
		label: "AMZN",
		bins: [
			{ bin: 0, count: 52 },
			{ bin: 1, count: 14 },
			{ bin: 2, count: 38 },
			{ bin: 3, count: 62 },
			{ bin: 4, count: 47 },
		],
	},
];

const meta = {
	title: "Charts/HeatmapChart",
	component: HeatmapChart,
	tags: ["autodocs"],
	args: {
		data: tradingActivityData,
		columnLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
		title: "Weekly Trading Activity",
		height: 300,
	},
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColours: Story = {
	args: {
		colorFrom: "#fef2f2",
		colorTo: "#dc2626",
		title: "Risk Exposure by Day",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Weekly Trading Activity",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Weekly Trading Activity",
	},
};
