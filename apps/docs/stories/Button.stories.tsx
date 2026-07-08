import type { ButtonProps } from "@gykmi/ui";
import { Button } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Download, Plus } from "lucide-react";

type ButtonStoryArgs = ButtonProps & { showIconLeft?: boolean; showIconRight?: boolean };

const meta: Meta<ButtonStoryArgs> = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "secondary", "danger", "ghost"],
			description: "Visual style variant",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "icon-sm", "icon"],
			description: "Size of the button",
		},
		loading: {
			control: "boolean",
			description: "Show loading state",
		},
		disabled: {
			control: "boolean",
			description: "Disable the button",
		},
		showIconLeft: { control: "boolean", name: "Show icon (left)" },
		showIconRight: { control: "boolean", name: "Show icon (right)" },
		iconLeft: { table: { disable: true } },
		iconRight: { table: { disable: true } },
		asChild: { table: { disable: true } },
	},
	args: {
		children: "Button",
		variant: "default",
		size: "md",
		showIconLeft: false,
		showIconRight: false,
	},
	render: ({ showIconLeft, showIconRight, ...args }) => (
		<Button
			{...args}
			iconLeft={showIconLeft ? <Download /> : undefined}
			iconRight={showIconRight ? <ArrowRight /> : undefined}
		/>
	),
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Primary: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Small: Story = { args: { size: "sm", children: "Small" } };
export const Large: Story = { args: { size: "lg", children: "Large" } };
export const Loading: Story = { args: { loading: true, children: "Loading" } };
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };

export const WithIcons: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button iconLeft={<Download />}>Export</Button>
			<Button iconRight={<ArrowRight />}>Continue</Button>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button variant="default">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

export const IconOnly: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button size="icon" variant="default" iconLeft={<Plus />} aria-label="Add" />
			<Button size="icon" variant="secondary" iconLeft={<Download />} aria-label="Download" />
			<Button size="icon" variant="ghost" iconLeft={<ArrowRight />} aria-label="Next" />
			<Button size="icon-sm" variant="default" iconLeft={<Plus />} aria-label="Add" />
			<Button size="icon-sm" variant="secondary" iconLeft={<Download />} aria-label="Download" />
			<Button size="icon-sm" variant="ghost" iconLeft={<ArrowRight />} aria-label="Next" />
		</div>
	),
};

export const AllStates: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button>Default</Button>
			<Button disabled>Disabled</Button>
			<Button loading>Loading</Button>
		</div>
	),
};
