"use client";

import {
	Bell,
	Building2,
	ChevronsUpDown,
	ClipboardCheck,
	FileText,
	History,
	LogOut,
	Moon,
	Scale,
	Sun,
	UserCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PageHeader } from "./page-header";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeparator,
	ThemeToggle,
} from "@gykmi/ui";

interface NavItem {
	label: string;
	icon: typeof ClipboardCheck;
	href: string | null;
	badge?: number;
	soon?: boolean;
}

const NAV_ITEMS: { overview: NavItem[]; compliance: NavItem[] } = {
	overview: [
		{ label: "Morning review", icon: ClipboardCheck, href: "/", badge: 3 },
		{ label: "Counterparties", icon: Building2, href: "/counterparties", badge: 2 },
	],
	compliance: [
		{ label: "Audit trail", icon: History, href: null, soon: true },
		{ label: "Reports", icon: FileText, href: null, soon: true },
		{ label: "Regulatory", icon: Scale, href: null, soon: true },
	],
};

// Flat lookup: pathname → label
const ROUTE_LABELS: Record<string, string> = Object.values(NAV_ITEMS)
	.flat()
	.filter((item) => item.href)
	.reduce(
		(acc, item) => {
			acc[item.href as string] = item.label;
			return acc;
		},
		{} as Record<string, string>,
	);

export function DashboardShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	// Derive breadcrumbs from pathname
	const pageLabel = ROUTE_LABELS[pathname] ?? "Overview";
	const isRoot = pathname === "/";
	const breadcrumbs = isRoot
		? [{ label: "Overview" }, { label: pageLabel }]
		: [{ label: "Overview", href: "/" }, { label: pageLabel }];

	return (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SidebarHeader className="p-4">
					<div className="flex items-center gap-2">
						<span className="text-sm font-bold">M</span>
						<div className="flex flex-col group-data-[collapsible=icon]:hidden">
							<span className="text-sm font-semibold">Meridian</span>
							<span className="text-[10px] text-text-muted">Risk platform</span>
						</div>
					</div>
				</SidebarHeader>
				<SidebarSeparator />
				<SidebarContent>
					{Object.entries(NAV_ITEMS).map(([group, items]) => (
						<SidebarGroup key={group}>
							<SidebarGroupLabel className="capitalize">{group}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{items.map((item) => (
										<SidebarMenuItem key={item.label}>
											{item.href ? (
												<SidebarMenuButton isActive={pathname === item.href} tooltip={item.label} asChild>
													<a href={item.href}>
														<item.icon size={16} />
														<span>{item.label}</span>
													</a>
												</SidebarMenuButton>
											) : (
												<SidebarMenuButton tooltip={item.label}>
													<item.icon size={16} />
													<span>{item.label}</span>
												</SidebarMenuButton>
											)}
											{item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
											{item.soon && (
												<SidebarMenuBadge className="text-[10px] text-text-muted">Soon</SidebarMenuBadge>
											)}
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarSeparator />
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton size="lg" tooltip="Nadia K.">
										<Avatar className="h-8 w-8">
											<AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" alt="Nadia K." />
											<AvatarFallback>NK</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">Nadia K.</span>
											<span className="truncate text-xs text-text-muted">nadia@meridian.com</span>
										</div>
										<ChevronsUpDown className="ml-auto size-4" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
									side="top"
									align="start"
									sideOffset={4}
								>
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8">
												<AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" alt="Nadia K." />
												<AvatarFallback>NK</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">Nadia K.</span>
												<span className="truncate text-xs text-text-muted">nadia@meridian.com</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<UserCircle className="mr-2 size-4" />
											Account
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Bell className="mr-2 size-4" />
											Notifications
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
											<div className="flex w-full items-center justify-between px-2 py-1.5">
												<div className="flex items-center gap-2">
													<Sun className="size-4 dark:hidden" />
													<Moon className="hidden size-4 dark:block" />
													<span>Theme</span>
												</div>
												<ThemeToggle />
											</div>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<LogOut className="mr-2 size-4" />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>

			<SidebarInset>
				<PageHeader breadcrumbs={breadcrumbs} action={<Button variant="secondary" size="sm">Export report</Button>} />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
