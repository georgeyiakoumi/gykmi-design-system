import { RadioCards, RadioCardsItem } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/RadioCards",
	component: RadioCards,
	tags: ["autodocs"],
} satisfies Meta<typeof RadioCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<RadioCards defaultValue="option-1" className="grid-cols-3" style={{ maxWidth: 600 }}>
			<RadioCardsItem value="option-1" label="Option 1" description="First option" />
			<RadioCardsItem value="option-2" label="Option 2" description="Second option" />
			<RadioCardsItem value="option-3" label="Option 3" description="Third option" />
		</RadioCards>
	),
};

export const WithIcons: Story = {
	render: () => (
		<RadioCards defaultValue="pdf" className="grid-cols-3" style={{ maxWidth: 600 }}>
			<RadioCardsItem
				value="pdf"
				icon={<span className="text-lg">📄</span>}
				label="PDF"
				description="Formatted report"
			/>
			<RadioCardsItem
				value="csv"
				icon={<span className="text-lg">📊</span>}
				label="CSV"
				description="Raw data"
			/>
			<RadioCardsItem
				value="json"
				icon={<span className="text-lg">🔧</span>}
				label="JSON"
				description="Machine-readable"
			/>
		</RadioCards>
	),
};
