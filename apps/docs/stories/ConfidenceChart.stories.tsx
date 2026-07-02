import { ConfidenceChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const forecastData = [
	{ date: "Jan", value: 42000, low: 38000, high: 46000 },
	{ date: "Feb", value: 48500, low: 43000, high: 54000 },
	{ date: "Mar", value: 45200, low: 40000, high: 51000 },
	{ date: "Apr", value: 53800, low: 48000, high: 60000 },
	{ date: "May", value: 51000, low: 44000, high: 58000 },
	{ date: "Jun", value: 58400, low: 50000, high: 67000 },
];

const meta = {
	title: "POV/ConfidenceChart",
	component: ConfidenceChart,
	tags: ["autodocs"],
	args: {
		data: forecastData,
		title: "Revenue Forecast",
		height: 300,
	},
} satisfies Meta<typeof ConfidenceChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEstimated: Story = {
	args: {
		estimatedAfter: 4,
		title: "Revenue Forecast (with estimates)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Revenue Forecast",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Revenue Forecast",
	},
};
