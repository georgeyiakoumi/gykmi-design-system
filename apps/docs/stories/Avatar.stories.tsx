import { Avatar, AvatarFallback, AvatarImage, Stack } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFallback: Story = {
	render: () => (
		<Avatar>
			<AvatarFallback>GY</AvatarFallback>
		</Avatar>
	),
};

export const AllSizes: Story = {
	render: () => (
		<Stack direction="row" gap="4" align="center">
			<Avatar className="h-8 w-8">
				<AvatarFallback className="text-xs">SM</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>MD</AvatarFallback>
			</Avatar>
			<Avatar className="h-14 w-14">
				<AvatarFallback className="text-lg">LG</AvatarFallback>
			</Avatar>
		</Stack>
	),
};
