import { Tabs, TabsContent, TabsList, TabsTrigger } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="tab1" style={{ maxWidth: 400 }}>
			<TabsList>
				<TabsTrigger value="tab1">Account</TabsTrigger>
				<TabsTrigger value="tab2">Password</TabsTrigger>
				<TabsTrigger value="tab3">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<p>Account settings and preferences.</p>
			</TabsContent>
			<TabsContent value="tab2">
				<p>Change your password here.</p>
			</TabsContent>
			<TabsContent value="tab3">
				<p>General application settings.</p>
			</TabsContent>
		</Tabs>
	),
};
