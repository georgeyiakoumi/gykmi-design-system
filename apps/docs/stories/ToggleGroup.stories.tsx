import { ToggleGroup, ToggleGroupItem } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/ToggleGroup",
	component: ToggleGroup,
	tags: ["autodocs"],
	args: {
		type: "single",
	},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	args: { type: "single" },
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="left" aria-label="Align left">
				L
			</ToggleGroupItem>
			<ToggleGroupItem value="centre" aria-label="Align centre">
				C
			</ToggleGroupItem>
			<ToggleGroupItem value="right" aria-label="Align right">
				R
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Multiple: Story = {
	args: { type: "multiple" },
	render: (args) => (
		<ToggleGroup {...args}>
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
