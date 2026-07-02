import { TreemapChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sectorData = [
	{ label: "Technology", value: 345000 },
	{ label: "Healthcare", value: 228000 },
	{ label: "Financials", value: 182000 },
	{ label: "Energy", value: 124000 },
	{ label: "Consumer", value: 96000 },
	{ label: "Industrials", value: 78000 },
];

const meta = {
	title: "Charts/TreemapChart",
	component: TreemapChart,
	tags: ["autodocs"],
	args: {
		data: sectorData,
		title: "Sector Exposure",
		height: 300,
	},
} satisfies Meta<typeof TreemapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColours: Story = {
	args: {
		colors: ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"],
		title: "AUM by Region",
		data: [
			{ label: "North America", value: 420000 },
			{ label: "Europe", value: 310000 },
			{ label: "Asia Pacific", value: 185000 },
			{ label: "Latin America", value: 72000 },
			{ label: "Middle East", value: 48000 },
			{ label: "Africa", value: 15000 },
		],
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Sector Exposure",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Sector Exposure",
	},
};
