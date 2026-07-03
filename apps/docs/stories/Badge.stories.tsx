import { Badge } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "success", "danger", "warning"],
		},
	},
	args: { label: "Badge" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Success: Story = { args: { variant: "success", label: "Active" } };
export const Danger: Story = { args: { variant: "danger", label: "Error" } };
export const Warning: Story = { args: { variant: "warning", label: "Pending" } };

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
			<Badge variant="default" label="Default" />
			<Badge variant="success" label="Success" />
			<Badge variant="danger" label="Danger" />
			<Badge variant="warning" label="Warning" />
		</div>
	),
};
