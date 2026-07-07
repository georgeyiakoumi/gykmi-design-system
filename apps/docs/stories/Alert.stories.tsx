import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive"],
		},
	},
	args: { variant: "default" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Alert {...args}>
			<AlertTitle>Heads up</AlertTitle>
			<AlertDescription>This is an informational alert.</AlertDescription>
		</Alert>
	),
};

export const Destructive: Story = {
	render: () => (
		<Alert variant="destructive">
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>Something went wrong. Please try again.</AlertDescription>
		</Alert>
	),
};

export const WithAction: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Stale data detected</AlertTitle>
			<AlertDescription>Market Data Feed has not refreshed since 30 June.</AlertDescription>
			<AlertAction>
				<Button variant="secondary" size="sm">
					Refresh
				</Button>
			</AlertAction>
		</Alert>
	),
};
