"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Separator,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
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
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	ThemeToggle,
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
import { PageHeader } from "./page-header";

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
	const [notifications, setNotifications] = useState({
		limitBreach: true,
		dailySummary: true,
		modelDrift: false,
		dataStale: true,
	});
	const [exportFormat, setExportFormat] = useState("pdf");
	const [exportSections, setExportSections] = useState({
		summary: true,
		flagged: true,
		exposure: true,
		activity: true,
	});

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
			<Sheet open={showSettings} onOpenChange={setShowSettings}>
				<SheetContent side="right">
					<SheetHeader>
						<SheetTitle>Settings</SheetTitle>
						<SheetDescription>Manage your account and notification preferences.</SheetDescription>
					</SheetHeader>
					<Tabs defaultValue="account" className="mt-6">
						<TabsList className="w-full">
							<TabsTrigger value="account" className="flex-1">
								Account
							</TabsTrigger>
							<TabsTrigger value="notifications" className="flex-1">
								Notifications
							</TabsTrigger>
						</TabsList>
						<TabsContent value="account" className="mt-4 space-y-4">
							<div className="space-y-2">
								<Label htmlFor="settings-name">Full name</Label>
								<Input id="settings-name" defaultValue="Nadia Kowalski" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="settings-email">Email</Label>
								<Input id="settings-email" defaultValue="nadia@meridian.com" type="email" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="settings-role">Role</Label>
								<Input id="settings-role" defaultValue="Risk Analyst" disabled />
							</div>
							<Separator />
							<div className="space-y-2">
								<Label className="text-sm font-medium">Theme</Label>
								<ThemeToggle />
							</div>
							<Separator />
							<Button
								className="w-full"
								onClick={() => {
									toast({
										title: "Profile updated",
										description: "Your account details have been saved.",
										variant: "success",
									});
									setShowSettings(false);
								}}
							>
								Save changes
							</Button>
						</TabsContent>
						<TabsContent value="notifications" className="mt-4 space-y-4">
							{[
								{
									key: "limitBreach" as const,
									label: "Limit breach alerts",
									desc: "When a counterparty exceeds its exposure limit",
								},
								{
									key: "dailySummary" as const,
									label: "Daily summary",
									desc: "Morning risk summary delivered at 08:00",
								},
								{
									key: "modelDrift" as const,
									label: "Model drift warnings",
									desc: "When model confidence drops below threshold",
								},
								{
									key: "dataStale" as const,
									label: "Stale data alerts",
									desc: "When a data source hasn't refreshed in 24h",
								},
							].map((item) => (
								<div key={item.key} className="flex items-center justify-between gap-4">
									<div className="space-y-0.5">
										<Label className="text-sm">{item.label}</Label>
										<p className="text-xs text-text-muted">{item.desc}</p>
									</div>
									<Switch
										checked={notifications[item.key]}
										onCheckedChange={(checked) =>
											setNotifications((prev) => ({ ...prev, [item.key]: !!checked }))
										}
									/>
								</div>
							))}
							<Separator />
							<Button
								className="w-full"
								onClick={() => {
									const enabled = Object.values(notifications).filter(Boolean).length;
									toast({
										title: "Notifications updated",
										description: `${enabled} alert type${enabled !== 1 ? "s" : ""} enabled.`,
										variant: "success",
									});
									setShowSettings(false);
								}}
							>
								Save preferences
							</Button>
						</TabsContent>
					</Tabs>
				</SheetContent>
			</Sheet>

			{/* Export report dialog */}
			<Dialog open={showExport} onOpenChange={setShowExport}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Export report</DialogTitle>
						<DialogDescription>
							Choose a format and select which sections to include in the export.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 space-y-6">
						<div className="space-y-3">
							<Label className="text-sm font-medium">Format</Label>
							<RadioGroup
								value={exportFormat}
								onValueChange={setExportFormat}
								className="flex gap-4"
							>
								{[
									{ value: "pdf", label: "PDF" },
									{ value: "csv", label: "CSV" },
									{ value: "xlsx", label: "Excel" },
								].map((opt) => (
									<div key={opt.value} className="flex items-center gap-2">
										<RadioGroupItem value={opt.value} id={`format-${opt.value}`} />
										<Label
											htmlFor={`format-${opt.value}`}
											className="text-sm font-normal cursor-pointer"
										>
											{opt.label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>
						<Separator />
						<div className="space-y-3">
							<Label className="text-sm font-medium">Sections</Label>
							{[
								{ key: "summary" as const, label: "Risk summary & key metrics" },
								{ key: "flagged" as const, label: "Flagged items" },
								{ key: "exposure" as const, label: "Exposure trend" },
								{ key: "activity" as const, label: "Activity & data sources" },
							].map((section) => (
								<div key={section.key} className="flex items-center gap-2">
									<Checkbox
										id={`section-${section.key}`}
										checked={exportSections[section.key]}
										onCheckedChange={(checked) =>
											setExportSections((prev) => ({ ...prev, [section.key]: !!checked }))
										}
									/>
									<Label
										htmlFor={`section-${section.key}`}
										className="text-sm font-normal cursor-pointer"
									>
										{section.label}
									</Label>
								</div>
							))}
						</div>
					</div>
					<div className="mt-6 flex justify-end gap-2">
						<Button variant="secondary" onClick={() => setShowExport(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								const selectedCount = Object.values(exportSections).filter(Boolean).length;
								toast({
									title: "Report exported",
									description: `${selectedCount} section${selectedCount !== 1 ? "s" : ""} exported as ${exportFormat.toUpperCase()}.`,
									variant: "success",
								});
								setShowExport(false);
							}}
						>
							Export
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Toaster toasts={toasts} onDismiss={dismiss} />
		</SidebarProvider>
	);
}
