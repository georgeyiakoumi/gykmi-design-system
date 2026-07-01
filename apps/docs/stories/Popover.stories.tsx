import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger, Stack } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Popover",
	component: Popover,
	tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="secondary">Open Popover</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Stack gap="4">
					<Stack gap="2">
						<h4 className="font-medium leading-none">Dimensions</h4>
						<p className="text-sm text-text-muted">Set the dimensions for the layer.</p>
					</Stack>
					<Stack gap="2">
						<Label htmlFor="width">Width</Label>
						<Input id="width" defaultValue="100%" />
					</Stack>
				</Stack>
			</PopoverContent>
		</Popover>
	),
};
