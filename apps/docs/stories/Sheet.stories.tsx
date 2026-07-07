import {
	Button,
	Input,
	Label,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Sheet",
	component: Sheet,
	tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="secondary">Open sheet</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription>Make changes to your profile.</SheetDescription>
				</SheetHeader>
				<div className="mt-4 space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" defaultValue="Nadia Kowalski" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" defaultValue="nadia@meridian.com" />
					</div>
				</div>
				<SheetFooter>
					<Button className="w-full">Save</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

export const Left: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="secondary">Open left</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Navigation</SheetTitle>
					<SheetDescription>Browse sections.</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
};
