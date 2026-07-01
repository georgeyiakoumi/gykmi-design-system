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
	args: { children: "Badge" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Success: Story = { args: { variant: "success", children: "Active" } };
export const Danger: Story = { args: { variant: "danger", children: "Error" } };
export const Warning: Story = { args: { variant: "warning", children: "Pending" } };

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
			<Badge variant="default">Default</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="danger">Danger</Badge>
			<Badge variant="warning">Warning</Badge>
		</div>
	),
};
