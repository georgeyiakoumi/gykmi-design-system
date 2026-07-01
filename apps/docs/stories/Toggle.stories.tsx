import { Stack, Toggle, ToggleGroup, ToggleGroupItem } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Toggle",
	component: Toggle,
	tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Toggle aria-label="Toggle bold">B</Toggle>,
};

export const Outline: Story = {
	render: () => (
		<Toggle variant="outline" aria-label="Toggle italic">
			I
		</Toggle>
	),
};

export const Group: Story = {
	render: () => (
		<ToggleGroup type="multiple" variant="outline">
			<ToggleGroupItem value="bold" aria-label="Toggle bold">
				B
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Toggle italic">
				I
			</ToggleGroupItem>
			<ToggleGroupItem value="underline" aria-label="Toggle underline">
				U
			</ToggleGroupItem>
		</ToggleGroup>
	),
};
