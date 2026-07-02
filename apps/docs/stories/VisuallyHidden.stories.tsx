import { VisuallyHidden } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/VisuallyHidden",
	component: VisuallyHidden,
	tags: ["autodocs"],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div>
			<p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
				The text below is visually hidden but available to screen readers. Inspect the DOM to
				verify.
			</p>
			<VisuallyHidden>This text is only visible to assistive technology.</VisuallyHidden>
		</div>
	),
};

export const WithinButton: Story = {
	render: () => (
		<button
			type="button"
			style={{
				padding: "0.5rem",
				borderRadius: "var(--radius-md)",
				backgroundColor: "var(--color-surface-raised)",
				border: "none",
				cursor: "pointer",
				fontSize: "1.25rem",
				color: "var(--color-text)",
			}}
		>
			&times;
			<VisuallyHidden>Close</VisuallyHidden>
		</button>
	),
};
