import { AspectRatio } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/AspectRatio",
	component: AspectRatio,
	tags: ["autodocs"],
	argTypes: {
		ratio: { control: { type: "number", min: 0.1, max: 4, step: 0.1 } },
	},
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
	args: { ratio: 1 },
	render: (args) => (
		<div style={{ maxWidth: 300 }}>
			<AspectRatio {...args}>
				<div
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: "var(--color-surface-raised)",
						borderRadius: "var(--radius-md)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "var(--color-text-muted)",
						fontSize: "0.875rem",
					}}
				>
					1 : 1
				</div>
			</AspectRatio>
		</div>
	),
};

export const Widescreen: Story = {
	args: { ratio: 16 / 9 },
	render: (args) => (
		<div style={{ maxWidth: 400 }}>
			<AspectRatio {...args}>
				<div
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: "var(--color-surface-raised)",
						borderRadius: "var(--radius-md)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "var(--color-text-muted)",
						fontSize: "0.875rem",
					}}
				>
					16 : 9
				</div>
			</AspectRatio>
		</div>
	),
};

export const Portrait: Story = {
	args: { ratio: 3 / 4 },
	render: (args) => (
		<div style={{ maxWidth: 200 }}>
			<AspectRatio {...args}>
				<div
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: "var(--color-surface-raised)",
						borderRadius: "var(--radius-md)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "var(--color-text-muted)",
						fontSize: "0.875rem",
					}}
				>
					3 : 4
				</div>
			</AspectRatio>
		</div>
	),
};
