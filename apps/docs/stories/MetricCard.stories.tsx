import { MetricCard } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/MetricCard",
	component: MetricCard,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "danger", "warning", "success"],
		},
	},
	args: {
		value: "17.4%",
		label: "Hawkstone exposure",
		context: "Limit: 15.0%",
	},
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Danger: Story = {
	args: { variant: "danger", value: "17.4%", label: "Hawkstone exposure", context: "Limit: 15.0%" },
};
export const Warning: Story = {
	args: {
		variant: "warning",
		value: "$2.8M",
		label: "Portfolio VaR (99%)",
		context: "Limit: $2.5M",
	},
};
export const Success: Story = {
	args: {
		variant: "success",
		value: "95%",
		label: "Model coverage",
		context: "1 position unscored",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
			<MetricCard
				variant="danger"
				value="17.4%"
				label="Hawkstone exposure"
				context="Limit: 15.0%"
			/>
			<MetricCard
				variant="warning"
				value="$2.8M"
				label="Portfolio VaR (99%)"
				context="Limit: $2.5M"
			/>
			<MetricCard
				variant="default"
				value="95%"
				label="Model coverage"
				context="1 position unscored"
			/>
		</div>
	),
};
