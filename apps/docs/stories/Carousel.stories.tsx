import { Card, CardContent, Carousel, CarouselItem } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Carousel",
	component: Carousel,
	tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ maxWidth: 400 }}>
			<Carousel>
				{["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"].map((name) => (
					<CarouselItem key={name} width="70%" maxWidth="max-w-[240px]">
						<Card>
							<CardContent className="p-6">
								<p className="text-sm font-medium">{name}</p>
								<p className="text-xs text-text-muted">Swipe to see more</p>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</Carousel>
		</div>
	),
};
