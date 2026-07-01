import { Box, Stack } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Layout/Stack",
	component: Stack,
	tags: ["autodocs"],
	argTypes: {
		direction: { control: "select", options: ["row", "column"] },
		align: { control: "select", options: ["start", "center", "end", "stretch"] },
		gap: { control: "select", options: ["1", "2", "3", "4", "6", "8"] },
	},
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: string }) => (
	<Box className="rounded-md bg-surface-raised border border-border px-4 py-2 text-sm">
		{children}
	</Box>
);

export const Column: Story = {
	args: { direction: "column", gap: "4" },
	render: (args) => (
		<Stack {...args}>
			<Item>Item 1</Item>
			<Item>Item 2</Item>
			<Item>Item 3</Item>
		</Stack>
	),
};

export const Row: Story = {
	args: { direction: "row", gap: "4" },
	render: (args) => (
		<Stack {...args}>
			<Item>Item 1</Item>
			<Item>Item 2</Item>
			<Item>Item 3</Item>
		</Stack>
	),
};

export const Centered: Story = {
	args: { direction: "row", gap: "4", align: "center" },
	render: (args) => (
		<Stack {...args}>
			<Item>Short</Item>
			<Box className="rounded-md bg-surface-raised border border-border px-4 py-6 text-sm">
				Tall
			</Box>
			<Item>Short</Item>
		</Stack>
	),
};
