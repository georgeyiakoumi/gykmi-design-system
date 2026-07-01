import {
	Toolbar,
	ToolbarButton,
	ToolbarSeparator,
	ToolbarToggleGroup,
	ToolbarToggleItem,
} from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Toolbar",
	component: Toolbar,
	tags: ["autodocs"],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Toolbar aria-label="Formatting options">
			<ToolbarToggleGroup type="multiple" aria-label="Text formatting">
				<ToolbarToggleItem value="bold" aria-label="Bold">
					B
				</ToolbarToggleItem>
				<ToolbarToggleItem value="italic" aria-label="Italic">
					I
				</ToolbarToggleItem>
				<ToolbarToggleItem value="underline" aria-label="Underline">
					U
				</ToolbarToggleItem>
			</ToolbarToggleGroup>
			<ToolbarSeparator />
			<ToolbarButton>Undo</ToolbarButton>
			<ToolbarButton>Redo</ToolbarButton>
		</Toolbar>
	),
};
