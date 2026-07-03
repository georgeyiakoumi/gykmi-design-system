import { ThemeToggle } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/ThemeToggle",
	component: ThemeToggle,
	tags: ["autodocs"],
	args: {
		defaultTheme: "system",
	},
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LightDefault: Story = {
	args: { defaultTheme: "light" },
};

export const DarkDefault: Story = {
	args: { defaultTheme: "dark" },
};
