import { Checkbox, Input, Label, Stack } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Label",
	component: Label,
	tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: "Email address" },
};

export const WithInput: Story = {
	render: () => (
		<Stack gap="2" style={{ maxWidth: 300 }}>
			<Label htmlFor="email">Email</Label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</Stack>
	),
};

export const WithCheckbox: Story = {
	render: () => (
		<Stack direction="row" gap="2" align="center">
			<Checkbox id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</Stack>
	),
};
