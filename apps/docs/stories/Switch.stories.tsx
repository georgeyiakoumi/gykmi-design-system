import { Label, Stack, Switch } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	render: () => (
		<Stack direction="row" gap="2" align="center">
			<Switch id="airplane-mode" />
			<Label htmlFor="airplane-mode">Aeroplane mode</Label>
		</Stack>
	),
};

export const Disabled: Story = {
	args: { disabled: true },
};

export const Checked: Story = {
	args: { defaultChecked: true },
};
