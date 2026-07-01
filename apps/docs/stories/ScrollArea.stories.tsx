import { ScrollArea, Separator } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/ScrollArea",
	component: ScrollArea,
	tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }, (_, i) => `Tag ${i + 1}`);

export const Default: Story = {
	render: () => (
		<ScrollArea className="h-72 w-48 rounded-md border border-border">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none text-text">Tags</h4>
				{tags.map((tag) => (
					<div key={tag}>
						<div className="text-sm text-text">{tag}</div>
						<Separator className="my-2" />
					</div>
				))}
			</div>
		</ScrollArea>
	),
};
