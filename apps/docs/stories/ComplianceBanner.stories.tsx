import { ComplianceBanner } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/ComplianceBanner",
	component: ComplianceBanner,
	tags: ["autodocs"],
	argTypes: {
		severity: { control: "select", options: ["info", "warning", "critical"] },
		dismissible: { control: "boolean" },
	},
	args: { title: "Notice", severity: "info" },
} satisfies Meta<typeof ComplianceBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
	args: {
		severity: "info",
		title: "Data retention policy",
		description:
			"Analysis results are retained for 90 days in accordance with your organisation's data policy.",
	},
};

export const Warning: Story = {
	args: {
		severity: "warning",
		title: "Stale data detected",
		description:
			"Some data sources have not been updated in over 24 hours. Results may not reflect the latest market conditions.",
		dismissible: true,
	},
};

export const Critical: Story = {
	args: {
		severity: "critical",
		title: "Regulatory deadline approaching",
		description:
			"MiFID II transaction reporting for Q2 2026 is due by 15 July. 3 reports remain unsubmitted.",
	},
};

export const AllSeverities: Story = {
	args: { title: "All severities" },
	render: () => (
		<div className="flex flex-col gap-3">
			<ComplianceBanner
				severity="info"
				title="Information"
				description="Standard operational notice."
			/>
			<ComplianceBanner
				severity="warning"
				title="Warning"
				description="Action recommended but not urgent."
				dismissible
			/>
			<ComplianceBanner
				severity="critical"
				title="Critical"
				description="Immediate attention required."
			/>
		</div>
	),
};
