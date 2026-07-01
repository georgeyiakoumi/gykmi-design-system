import { RegulatoryNotice } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "POV/RegulatoryNotice",
	component: RegulatoryNotice,
	tags: ["autodocs"],
} satisfies Meta<typeof RegulatoryNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		framework: "FCA",
		reference: "FRN-123456",
		children:
			"This firm is authorised and regulated by the Financial Conduct Authority. Past performance is not a reliable indicator of future results. The value of investments can go down as well as up.",
	},
};

export const MiFID: Story = {
	args: {
		framework: "MiFID II",
		reference: "LEI-549300EXAMPLE",
		children:
			"Transaction reporting is conducted in accordance with MiFID II/MiFIR obligations. All reportable transactions are submitted to the relevant ARM within the prescribed timeframes.",
	},
};
