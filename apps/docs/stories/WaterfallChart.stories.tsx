import { WaterfallChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const pnlData = [
	{ label: "Revenue", value: 480000 },
	{ label: "COGS", value: -192000 },
	{ label: "Gross Profit", value: 288000, isTotal: true },
	{ label: "OpEx", value: -144000 },
	{ label: "D&A", value: -18000 },
	{ label: "Interest", value: -12000 },
	{ label: "Tax", value: -36000 },
	{ label: "Net Income", value: 78000, isTotal: true },
];

const meta = {
	title: "Charts/WaterfallChart",
	component: WaterfallChart,
	tags: ["autodocs"],
	args: {
		data: pnlData,
		title: "Profit & Loss Breakdown",
		height: 300,
	},
} satisfies Meta<typeof WaterfallChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutGrid: Story = {
	args: {
		showGrid: false,
		title: "P&L Breakdown (clean)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Profit & Loss Breakdown",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Profit & Loss Breakdown",
	},
};
