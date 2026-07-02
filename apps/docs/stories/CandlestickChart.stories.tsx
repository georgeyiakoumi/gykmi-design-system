import { CandlestickChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const priceData = [
	{ date: "Jan 6", open: 182.15, high: 185.4, low: 181.2, close: 184.92 },
	{ date: "Jan 7", open: 184.92, high: 186.75, low: 183.5, close: 183.82 },
	{ date: "Jan 8", open: 183.82, high: 187.2, low: 182.9, close: 186.45 },
	{ date: "Jan 9", open: 186.45, high: 189.1, low: 185.8, close: 188.72 },
	{ date: "Jan 10", open: 188.72, high: 190.3, low: 187.15, close: 187.68 },
	{ date: "Jan 13", open: 187.68, high: 191.5, low: 186.9, close: 190.85 },
	{ date: "Jan 14", open: 190.85, high: 192.4, low: 189.2, close: 189.95 },
];

const meta = {
	title: "Charts/CandlestickChart",
	component: CandlestickChart,
	tags: ["autodocs"],
	args: {
		data: priceData,
		title: "AAPL Weekly Price Action",
		height: 300,
	},
} satisfies Meta<typeof CandlestickChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutGrid: Story = {
	args: {
		showGrid: false,
		title: "AAPL Price (clean)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "AAPL Weekly Price Action",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "AAPL Weekly Price Action",
	},
};
