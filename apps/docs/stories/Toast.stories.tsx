import {
	Button,
	Toast,
	ToastAction,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = {
	title: "Components/Toast",
	component: Toast,
	tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo({ variant }: { variant?: "default" | "success" | "danger" }) {
	const [open, setOpen] = useState(false);
	return (
		<ToastProvider>
			<Button
				variant="secondary"
				onClick={() => {
					setOpen(false);
					setTimeout(() => setOpen(true), 100);
				}}
			>
				Show Toast
			</Button>
			<Toast open={open} onOpenChange={setOpen} variant={variant}>
				<div className="grid gap-1">
					<ToastTitle>Notification</ToastTitle>
					<ToastDescription>Something happened.</ToastDescription>
				</div>
				<ToastAction altText="Undo">Undo</ToastAction>
			</Toast>
			<ToastViewport />
		</ToastProvider>
	);
}

export const Default: Story = {
	render: () => <ToastDemo />,
};

export const Success: Story = {
	render: () => <ToastDemo variant="success" />,
};

export const Danger: Story = {
	render: () => <ToastDemo variant="danger" />,
};
