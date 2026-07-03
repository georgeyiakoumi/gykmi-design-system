import { Label, RadioGroup, RadioGroupItem } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/RadioGroup",
	component: RadioGroup,
	tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<RadioGroup defaultValue="option-1">
			<div className="flex flex-row gap-2 items-center">
				<RadioGroupItem value="option-1" id="r1" />
				<Label htmlFor="r1">Option 1</Label>
			</div>
			<div className="flex flex-row gap-2 items-center">
				<RadioGroupItem value="option-2" id="r2" />
				<Label htmlFor="r2">Option 2</Label>
			</div>
			<div className="flex flex-row gap-2 items-center">
				<RadioGroupItem value="option-3" id="r3" />
				<Label htmlFor="r3">Option 3</Label>
			</div>
		</RadioGroup>
	),
};
