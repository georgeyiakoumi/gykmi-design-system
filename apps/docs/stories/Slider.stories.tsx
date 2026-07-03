import { Label, Slider } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Slider",
	component: Slider,
	tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex flex-col gap-2" style={{ maxWidth: 300 }}>
			<Label>Volume</Label>
			<Slider defaultValue={[50]} max={100} step={1} />
		</div>
	),
};
