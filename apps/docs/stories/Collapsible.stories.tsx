import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
	title: "Components/Collapsible",
	component: Collapsible,
	tags: ["autodocs"],
	args: {},
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Collapsible style={{ maxWidth: 400 }}>
			<CollapsibleTrigger
				style={{
					padding: "0.5rem 1rem",
					borderRadius: "var(--radius-md)",
					backgroundColor: "var(--color-surface-raised)",
					border: "none",
					cursor: "pointer",
					fontSize: "0.875rem",
					color: "var(--color-text)",
				}}
			>
				Toggle content
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div
					style={{
						padding: "0.75rem 1rem",
						marginTop: "0.5rem",
						borderRadius: "var(--radius-md)",
						backgroundColor: "var(--color-surface-raised)",
						fontSize: "0.875rem",
					}}
				>
					This content can be toggled open and closed.
				</div>
			</CollapsibleContent>
		</Collapsible>
	),
};

export const DefaultOpen: Story = {
	render: () => (
		<Collapsible defaultOpen style={{ maxWidth: 400 }}>
			<CollapsibleTrigger
				style={{
					padding: "0.5rem 1rem",
					borderRadius: "var(--radius-md)",
					backgroundColor: "var(--color-surface-raised)",
					border: "none",
					cursor: "pointer",
					fontSize: "0.875rem",
					color: "var(--color-text)",
				}}
			>
				Toggle content
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div
					style={{
						padding: "0.75rem 1rem",
						marginTop: "0.5rem",
						borderRadius: "var(--radius-md)",
						backgroundColor: "var(--color-surface-raised)",
						fontSize: "0.875rem",
					}}
				>
					This section starts open by default.
				</div>
			</CollapsibleContent>
		</Collapsible>
	),
};

export const Controlled: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);
		return (
			<Collapsible open={open} onOpenChange={setOpen} style={{ maxWidth: 400 }}>
				<CollapsibleTrigger
					style={{
						padding: "0.5rem 1rem",
						borderRadius: "var(--radius-md)",
						backgroundColor: "var(--color-surface-raised)",
						border: "none",
						cursor: "pointer",
						fontSize: "0.875rem",
						color: "var(--color-text)",
					}}
				>
					{open ? "Close" : "Open"}
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div
						style={{
							padding: "0.75rem 1rem",
							marginTop: "0.5rem",
							borderRadius: "var(--radius-md)",
							backgroundColor: "var(--color-surface-raised)",
							fontSize: "0.875rem",
						}}
					>
						Controlled collapsible — state is managed externally.
					</div>
				</CollapsibleContent>
			</Collapsible>
		);
	},
};
