import { StackedBarChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const revenueBySegment = [
	{ quarter: "Q1 2025", retail: 82000, institutional: 124000, advisory: 38000 },
	{ quarter: "Q2 2025", retail: 91000, institutional: 118000, advisory: 42000 },
	{ quarter: "Q3 2025", retail: 87000, institutional: 132000, advisory: 45000 },
	{ quarter: "Q4 2025", retail: 96000, institutional: 141000, advisory: 51000 },
];

const meta = {
	title: "Charts/StackedBarChart",
	component: StackedBarChart,
	tags: ["autodocs"],
	args: {
		data: revenueBySegment,
		keys: ["retail", "institutional", "advisory"],
		indexKey: "quarter",
		title: "Revenue by Segment",
		height: 300,
	},
} satisfies Meta<typeof StackedBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutGrid: Story = {
	args: {
		showGrid: false,
		title: "Revenue by Segment (clean)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		data: [],
		title: "Revenue by Segment",
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Revenue by Segment",
	},
};
