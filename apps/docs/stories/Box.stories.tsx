import { Box } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Box",
	component: Box,
	tags: ["autodocs"],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Box
			style={{
				padding: "1rem",
				backgroundColor: "var(--color-surface-raised)",
				borderRadius: "var(--radius-md)",
			}}
		>
			A basic Box container.
		</Box>
	),
};

export const AsChild: Story = {
	render: () => (
		<Box
			asChild
			style={{
				padding: "1rem",
				backgroundColor: "var(--color-surface-raised)",
				borderRadius: "var(--radius-md)",
			}}
		>
			<section>Rendered as a &lt;section&gt; element via asChild.</section>
		</Box>
	),
};

export const WithClassName: Story = {
	render: () => (
		<Box className="flex items-center gap-2 rounded-md bg-surface-raised p-4">
			<span>Box with Tailwind classes</span>
		</Box>
	),
};
