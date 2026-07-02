import { BarChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const quarterlyData = [
	{ label: "Q1 2025", value: 124000 },
	{ label: "Q2 2025", value: 148500 },
	{ label: "Q3 2025", value: 132200 },
	{ label: "Q4 2025", value: 167800 },
];

const meta = {
	title: "Charts/BarChart",
	component: BarChart,
	tags: ["autodocs"],
	args: {
		data: quarterlyData,
		title: "Quarterly Revenue",
		height: 300,
	},
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
	args: {
		color: "var(--color-green-500, #22c55e)",
		title: "Quarterly Profit",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Quarterly Revenue",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Quarterly Revenue",
	},
};
