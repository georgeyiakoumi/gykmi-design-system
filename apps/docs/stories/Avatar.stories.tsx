import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

type AvatarStoryArgs = {
	size: "sm" | "md" | "lg";
	display: "image" | "fallback" | "icon";
	initials: string;
};

const meta: Meta<AvatarStoryArgs> = {
	title: "Components/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		display: {
			control: "radio",
			options: ["image", "fallback", "icon"],
			name: "Display",
		},
		initials: {
			control: "text",
			name: "Initials",
			if: { arg: "display", eq: "fallback" },
		},
	},
	args: { size: "md", display: "image", initials: "NK" },
	render: ({ size, display, initials }) => (
		<Avatar size={size}>
			{display === "image" && (
				<>
					<AvatarImage
						src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
						alt="Nadia K."
					/>
					<AvatarFallback>{initials}</AvatarFallback>
				</>
			)}
			{display === "fallback" && <AvatarFallback>{initials}</AvatarFallback>}
			{display === "icon" && <AvatarIcon />}
		</Avatar>
	),
};

export default meta;
type Story = StoryObj<AvatarStoryArgs>;

export const Default: Story = {};

export const WithFallback: Story = {
	args: { display: "fallback", initials: "GY" },
};

export const WithIcon: Story = {
	args: { display: "icon" },
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Avatar size="sm">
				<AvatarImage
					src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
					alt="Nadia K."
				/>
				<AvatarFallback>NK</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarImage
					src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
					alt="Nadia K."
				/>
				<AvatarFallback>NK</AvatarFallback>
			</Avatar>
			<Avatar size="lg">
				<AvatarImage
					src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
					alt="Nadia K."
				/>
				<AvatarFallback>NK</AvatarFallback>
			</Avatar>
		</div>
	),
};

export const AllDisplayModes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Avatar size="md">
				<AvatarImage
					src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
					alt="Nadia K."
				/>
				<AvatarFallback>NK</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarFallback>GY</AvatarFallback>
			</Avatar>
			<Avatar size="md">
				<AvatarIcon />
			</Avatar>
		</div>
	),
};
