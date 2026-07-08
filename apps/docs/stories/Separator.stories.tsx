import { Separator } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Separator",
	component: Separator,
	tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	render: () => (
		<div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
			<div>
				<h4 className="text-sm font-medium text-text-strong">GYKMI Design System</h4>
				<p className="text-sm text-text-strong-weak">A distributable, versioned design system.</p>
			</div>
			<Separator />
			<p className="text-sm text-text-strong-weak">Content below the separator.</p>
		</div>
	),
};

export const Vertical: Story = {
	render: () => (
		<div className="flex flex-row gap-4 items-center h-5">
			<span className="text-sm">Blog</span>
			<Separator orientation="vertical" />
			<span className="text-sm">Docs</span>
			<Separator orientation="vertical" />
			<span className="text-sm">Source</span>
		</div>
	),
};
