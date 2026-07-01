import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Components/NavigationMenu",
	component: NavigationMenu,
	tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px]">
							<li>
								<NavigationMenuLink asChild>
									<a
										href="https://github.com/georgeyiakoumi/gykmi-design-system"
										className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-surface-raised"
									>
										<div className="text-sm font-medium leading-none text-text">Introduction</div>
										<p className="mt-1 text-sm leading-snug text-text-muted">
											A distributable, versioned design system.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink asChild>
									<a
										href="https://github.com/georgeyiakoumi/gykmi-design-system"
										className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-surface-raised"
									>
										<div className="text-sm font-medium leading-none text-text">Installation</div>
										<p className="mt-1 text-sm leading-snug text-text-muted">
											How to install and get started with the components.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px]">
							<li>
								<NavigationMenuLink asChild>
									<a
										href="https://github.com/georgeyiakoumi/gykmi-design-system"
										className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-surface-raised"
									>
										<div className="text-sm font-medium leading-none text-text">Button</div>
										<p className="mt-1 text-sm leading-snug text-text-muted">
											Trigger actions with variants and sizes.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	),
};
