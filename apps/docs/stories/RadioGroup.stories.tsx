import { Label, RadioGroup, RadioGroupItem, Stack } from "@gykmi/ui";
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
			<Stack direction="row" gap="2" align="center">
				<RadioGroupItem value="option-1" id="r1" />
				<Label htmlFor="r1">Option 1</Label>
			</Stack>
			<Stack direction="row" gap="2" align="center">
				<RadioGroupItem value="option-2" id="r2" />
				<Label htmlFor="r2">Option 2</Label>
			</Stack>
			<Stack direction="row" gap="2" align="center">
				<RadioGroupItem value="option-3" id="r3" />
				<Label htmlFor="r3">Option 3</Label>
			</Stack>
		</RadioGroup>
	),
};
