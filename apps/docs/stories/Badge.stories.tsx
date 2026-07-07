import type { BadgeProps } from "@gykmi/ui";
import { Badge } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle, Circle, Info, Sparkles, XCircle } from "lucide-react";

type BadgeStoryArgs = BadgeProps & { showIcon?: boolean };

const meta: Meta<BadgeStoryArgs> = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "success", "danger", "warning", "brand", "info"],
		},
		size: {
			control: "select",
			options: ["default", "sm"],
		},
		showIcon: { control: "boolean", name: "Show icon" },
		icon: { table: { disable: true } },
	},
	args: { label: "Badge", showIcon: true },
	render: ({ showIcon, ...args }) => <Badge {...args} icon={showIcon ? <Circle /> : undefined} />,
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = { args: { variant: "default" } };
export const Success: Story = {
	args: { variant: "success", label: "Active" },
	render: ({ showIcon, ...args }) => (
		<Badge {...args} icon={showIcon ? <CheckCircle /> : undefined} />
	),
};
export const Danger: Story = {
	args: { variant: "danger", label: "Error" },
	render: ({ showIcon, ...args }) => <Badge {...args} icon={showIcon ? <XCircle /> : undefined} />,
};
export const Warning: Story = {
	args: { variant: "warning", label: "Pending" },
	render: ({ showIcon, ...args }) => (
		<Badge {...args} icon={showIcon ? <AlertTriangle /> : undefined} />
	),
};
export const Brand: Story = {
	args: { variant: "brand", label: "New" },
	render: ({ showIcon, ...args }) => <Badge {...args} icon={showIcon ? <Sparkles /> : undefined} />,
};
export const InfoVariant: Story = {
	args: { variant: "info", label: "Note" },
	render: ({ showIcon, ...args }) => <Badge {...args} icon={showIcon ? <Info /> : undefined} />,
};

export const WithCount: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
			<Badge variant="danger" label="Review required" count={2} icon={<XCircle />} />
			<Badge variant="warning" label="Sign-off required" count={1} icon={<AlertTriangle />} />
		</div>
	),
};

export const Small: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
			<Badge size="sm" variant="default" label="Default" icon={<Circle />} />
			<Badge size="sm" variant="success" label="Active" icon={<CheckCircle />} />
			<Badge size="sm" variant="danger" label="Error" icon={<XCircle />} />
			<Badge size="sm" variant="warning" label="Pending" icon={<AlertTriangle />} />
			<Badge size="sm" variant="brand" label="New" icon={<Sparkles />} />
			<Badge size="sm" variant="info" label="Note" icon={<Info />} />
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
				<Badge variant="default" label="Default" icon={<Circle />} />
				<Badge variant="success" label="Success" icon={<CheckCircle />} />
				<Badge variant="danger" label="Danger" icon={<XCircle />} />
				<Badge variant="warning" label="Warning" icon={<AlertTriangle />} />
				<Badge variant="brand" label="Brand" icon={<Sparkles />} />
				<Badge variant="info" label="Info" icon={<Info />} />
			</div>
			<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
				<Badge size="sm" variant="default" label="Default" icon={<Circle />} />
				<Badge size="sm" variant="success" label="Success" icon={<CheckCircle />} />
				<Badge size="sm" variant="danger" label="Danger" icon={<XCircle />} />
				<Badge size="sm" variant="warning" label="Warning" icon={<AlertTriangle />} />
				<Badge size="sm" variant="brand" label="Brand" icon={<Sparkles />} />
				<Badge size="sm" variant="info" label="Info" icon={<Info />} />
			</div>
		</div>
	),
};
