import { Skeleton } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 300 }}>
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	),
};

export const Card: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 300 }}>
			<Skeleton className="h-32 w-full rounded-lg" />
			<Skeleton className="h-4 w-2/3" />
			<Skeleton className="h-4 w-full" />
		</div>
	),
};

export const Avatar: Story = {
	render: () => (
		<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
			<Skeleton className="h-10 w-10 rounded-full" />
			<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-3 w-32" />
			</div>
		</div>
	),
};
