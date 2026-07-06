"use client";

import {
	Button,
	Checkbox,
	Input,
	Label,
	Separator,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	ThemeToggle,
} from "@gykmi/ui";
import { useState } from "react";

const notificationOptions = [
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
];

type NotificationKey = (typeof notificationOptions)[number]["key"];

interface SettingsSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (message: { title: string; description: string }) => void;
}

export function SettingsSheet({ open, onOpenChange, onSave }: SettingsSheetProps) {
	const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
		limitBreach: true,
		dailySummary: true,
		modelDrift: false,
		dataStale: true,
	});

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
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
								onSave({
									title: "Profile updated",
									description: "Your account details have been saved.",
								});
								onOpenChange(false);
							}}
						>
							Save changes
						</Button>
					</TabsContent>
					<TabsContent value="notifications" className="mt-4 space-y-4">
						{notificationOptions.map((item) => (
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
								onSave({
									title: "Notifications updated",
									description: `${enabled} alert type${enabled !== 1 ? "s" : ""} enabled.`,
								});
								onOpenChange(false);
							}}
						>
							Save preferences
						</Button>
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
}
