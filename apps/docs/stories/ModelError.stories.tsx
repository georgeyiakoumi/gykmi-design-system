import { ModelError } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/ModelError",
	component: ModelError,
	tags: ["autodocs"],
	argTypes: {
		kind: {
			control: "select",
			options: ["timeout", "rate-limit", "unavailable", "content-filter", "unknown"],
		},
	},
} satisfies Meta<typeof ModelError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { kind: "unknown" },
};

export const WithRetry: Story = {
	args: { kind: "timeout", onRetry: () => {} },
};

export const AllKinds: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<ModelError kind="timeout" onRetry={() => {}} />
			<ModelError kind="rate-limit" />
			<ModelError kind="unavailable" />
			<ModelError kind="content-filter" />
			<ModelError kind="unknown" onRetry={() => {}} />
		</div>
	),
};
