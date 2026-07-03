import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/Dialog",
	component: Dialog,
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" defaultValue="George Yiakoumi" />
					</div>
				</div>
				<div className="flex flex-row gap-2 items-center justify-end">
					<DialogClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button>Save changes</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	),
};
