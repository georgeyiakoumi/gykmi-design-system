import { Input, Label } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
	render: () => (
		<div className="flex flex-col gap-2" style={{ maxWidth: 300 }}>
			<Label htmlFor="email">Email</Label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</div>
	),
};

export const ErrorState: Story = {
	render: () => (
		<div className="flex flex-col gap-2" style={{ maxWidth: 300 }}>
			<Label htmlFor="email-error">Email</Label>
			<Input id="email-error" error placeholder="you@example.com" />
			<p style={{ color: "var(--danger-default)", fontSize: "0.875rem" }}>
				Please enter a valid email address.
			</p>
		</div>
	),
};

export const Disabled: Story = {
	args: { disabled: true, placeholder: "Disabled input" },
};
