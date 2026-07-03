import { Checkbox, Input, Label } from "@gykmi/ui";
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
		<div className="flex flex-col gap-2" style={{ maxWidth: 300 }}>
			<Label htmlFor="email">Email</Label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</div>
	),
};

export const WithCheckbox: Story = {
	render: () => (
		<div className="flex flex-row gap-2 items-center">
			<Checkbox id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	),
};
