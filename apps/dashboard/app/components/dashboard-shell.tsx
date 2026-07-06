"use client";

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
	Toaster,
	useToast,
} from "@gykmi/ui";
import {
	Building2,
	ChevronsUpDown,
	ClipboardCheck,
	FileText,
	History,
	LogOut,
	Scale,
	UserCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { ExportDialog } from "./export-dialog";
import { PageHeader } from "./page-header";
import { SettingsSheet } from "./settings-sheet";

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

import { PageTitle, type StatusBadge } from "./page-title";

export function DashboardShell({
	children,
	badges,
}: {
	children: ReactNode;
	badges?: StatusBadge[];
}) {
	const pathname = usePathname();
	const { toasts, toast, dismiss } = useToast();
	const [showExport, setShowExport] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

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
						<div className="flex flex-col group-data-[collapsible=icon]:hidden">
							<span className="text-sm font-semibold">Meridian Risk Platform</span>
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
												<SidebarMenuButton
													isActive={pathname === item.href}
													tooltip={item.label}
													asChild
												>
													<a href={item.href}>
														<item.icon size={16} />
														<span>{item.label}</span>
													</a>
												</SidebarMenuButton>
											) : (
												<SidebarMenuButton tooltip={item.label} disabled>
													<item.icon size={16} />
													<span>{item.label}</span>
												</SidebarMenuButton>
											)}
											{item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
											{item.soon && (
												<SidebarMenuBadge className="text-[10px] text-text-muted">
													Soon
												</SidebarMenuBadge>
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
											<AvatarImage
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
												alt="Nadia K."
											/>
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
												<AvatarImage
													src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
													alt="Nadia K."
												/>
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
										<DropdownMenuItem onSelect={() => setShowSettings(true)}>
											<UserCircle className="mr-2 size-4" />
											Settings
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
				<PageHeader
					breadcrumbs={breadcrumbs}
					action={
						<Button variant="secondary" size="sm" onClick={() => setShowExport(true)}>
							Export report
						</Button>
					}
				/>
				<div className="flex flex-col space-y-8 p-6">
					<PageTitle title={pageLabel} badges={badges} />
					{children}
				</div>
				<footer className="border-t border-border px-6 py-3 text-xs text-text-muted">
					Demo only — fictional data, no real financial instruments or counterparties. Part of the{" "}
					<a
						href="https://github.com/georgeyiakoumi/gykmi-design-system"
						className="underline hover:text-text"
					>
						GYKMI Design System
					</a>
					.
				</footer>
			</SidebarInset>

			{/* Settings sheet */}
			<SettingsSheet
				open={showSettings}
				onOpenChange={setShowSettings}
				onSave={({ title, description }) => toast({ title, description, variant: "success" })}
			/>

			{/* Export report dialog */}
			<ExportDialog
				open={showExport}
				onOpenChange={setShowExport}
				onExport={(format, sections) => {
					toast({
						title: "Report exported",
						description: `${sections.length} section${sections.length !== 1 ? "s" : ""} exported as ${format.toUpperCase()}.`,
						variant: "success",
					});
				}}
			/>

			<Toaster toasts={toasts} onDismiss={dismiss} />
		</SidebarProvider>
	);
}
