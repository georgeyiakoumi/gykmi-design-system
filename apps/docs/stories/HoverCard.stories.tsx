import { Avatar, AvatarFallback, HoverCard, HoverCardContent, HoverCardTrigger } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/HoverCard",
	component: HoverCard,
	tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a
					href="https://github.com/georgeyiakoumi"
					className="text-sm font-medium text-action underline"
				>
					@georgeyiakoumi
				</a>
			</HoverCardTrigger>
			<HoverCardContent>
				<div className="flex flex-row gap-4">
					<Avatar>
						<AvatarFallback>GY</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-1">
						<h4 className="text-sm font-semibold text-text">George Yiakoumi</h4>
						<p className="text-sm text-text-muted">Building design systems.</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	),
};
