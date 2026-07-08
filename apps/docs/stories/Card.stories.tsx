import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "sunken"],
		},
	},
	args: { variant: "default" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Card {...args} style={{ maxWidth: 400 }}>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>A short description of the card content.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content goes here.</p>
			</CardContent>
			<CardFooter>
				<Button size="sm">Action</Button>
			</CardFooter>
		</Card>
	),
};

export const Sunken: Story = {
	render: () => (
		<Card variant="sunken" style={{ maxWidth: 400 }}>
			<CardHeader>
				<CardTitle>Sunken Card</CardTitle>
				<CardDescription>A recessed card for secondary content.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This card sits below the surface.</p>
			</CardContent>
		</Card>
	),
};

export const Simple: Story = {
	render: () => (
		<Card style={{ maxWidth: 400 }}>
			<CardContent className="pt-6">
				<p>A simple card with just content.</p>
			</CardContent>
		</Card>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", maxWidth: 800 }}>
			<Card variant="default" style={{ flex: 1 }}>
				<CardHeader>
					<CardTitle>Default</CardTitle>
					<CardDescription>Raised surface</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Primary content container.</p>
				</CardContent>
			</Card>
			<Card variant="sunken" style={{ flex: 1 }}>
				<CardHeader>
					<CardTitle>Sunken</CardTitle>
					<CardDescription>Recessed surface</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Secondary content container.</p>
				</CardContent>
			</Card>
		</div>
	),
};
