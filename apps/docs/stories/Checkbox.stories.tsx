import { Checkbox, Label } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	render: () => (
		<div className="flex flex-row gap-2 items-center">
			<Checkbox id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	),
};

export const Disabled: Story = {
	args: { disabled: true },
};

export const Checked: Story = {
	args: { defaultChecked: true },
};
