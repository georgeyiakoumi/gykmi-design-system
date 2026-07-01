import { Button } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "danger", "ghost"],
			description: "Visual style variant",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
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
		asChild: {
			control: "boolean",
			description: "Render as child element (Radix Slot)",
		},
	},
	args: {
		children: "Button",
		variant: "primary",
		size: "md",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Individual stories --

export const Primary: Story = {
	args: { variant: "primary" },
};

export const Secondary: Story = {
	args: { variant: "secondary" },
};

export const Danger: Story = {
	args: { variant: "danger" },
};

export const Ghost: Story = {
	args: { variant: "ghost" },
};

export const Small: Story = {
	args: { size: "sm", children: "Small" },
};

export const Large: Story = {
	args: { size: "lg", children: "Large" },
};

export const Loading: Story = {
	args: { loading: true, children: "Loading" },
};

export const Disabled: Story = {
	args: { disabled: true, children: "Disabled" },
};

export const AsLink: Story = {
	args: {
		asChild: true,
		children: <a href="https://example.com">Link Button</a>,
	},
};

// -- All variants matrix --

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button variant="primary">Primary</Button>
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

export const AllStates: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button>Default</Button>
			<Button disabled>Disabled</Button>
			<Button loading>Loading</Button>
		</div>
	),
};
