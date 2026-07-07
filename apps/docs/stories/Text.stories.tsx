import { Text } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Text",
	component: Text,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"body-xs",
				"body-sm",
				"body-base",
				"body-lg",
				"heading-xl",
				"heading-2xl",
				"heading-3xl",
				"heading-4xl",
				"label-xs",
				"label-sm",
			],
		},
		as: {
			control: "select",
			options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6", "label"],
		},
	},
	args: { variant: "body-base", as: "p", children: "The quick brown fox jumps over the lazy dog." },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Text as="h1" variant="heading-4xl">
				Heading 4xl
			</Text>
			<Text as="h2" variant="heading-3xl">
				Heading 3xl
			</Text>
			<Text as="h3" variant="heading-2xl">
				Heading 2xl
			</Text>
			<Text as="h4" variant="heading-xl">
				Heading xl
			</Text>
			<Text as="p" variant="body-lg">
				Body lg — larger body text for emphasis.
			</Text>
			<Text as="p" variant="body-base">
				Body base — default paragraph text.
			</Text>
			<Text as="p" variant="body-sm">
				Body sm — secondary text and descriptions.
			</Text>
			<Text as="p" variant="body-xs">
				Body xs — fine print and metadata.
			</Text>
			<Text as="label" variant="label-sm">
				Label sm
			</Text>
			<Text as="label" variant="label-xs">
				Label xs
			</Text>
		</div>
	),
};
