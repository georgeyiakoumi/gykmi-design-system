import { BulletChart } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Charts/BulletChart",
	component: BulletChart,
	tags: ["autodocs"],
	args: {
		actual: 275,
		target: 300,
		ranges: [200, 250, 350] as [number, number, number],
		title: "Revenue vs Target",
		height: 60,
	},
} satisfies Meta<typeof BulletChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		actual: 82,
		target: 90,
		ranges: [60, 80, 100] as [number, number, number],
		label: "NPS",
		title: "Client NPS Score",
	},
};

export const ExceedingTarget: Story = {
	args: {
		actual: 340,
		target: 300,
		ranges: [200, 250, 350] as [number, number, number],
		title: "AUM Growth (exceeding)",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		actual: 0,
		target: 0,
		ranges: [60, 80, 100] as [number, number, number],
		title: "Revenue vs Target",
	},
};
