import { LineChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const revenueData = [
	{ date: "Jan", value: 42000 },
	{ date: "Feb", value: 48500 },
	{ date: "Mar", value: 45200 },
	{ date: "Apr", value: 53800 },
	{ date: "May", value: 51000 },
	{ date: "Jun", value: 58400 },
];

const meta = {
	title: "Charts/LineChart",
	component: LineChart,
	tags: ["autodocs"],
	args: {
		data: revenueData,
		title: "Monthly Revenue",
		height: 300,
	},
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithArea: Story = {
	args: {
		showArea: true,
		title: "Monthly Revenue (Area)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Monthly Revenue",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Monthly Revenue",
	},
};
