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
	SheetFooter,
	SheetHeader,
	SheetTitle,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	ThemeToggle,
} from "@gykmi/ui";
import { Save } from "lucide-react";
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
			<SheetContent side="right" className="flex flex-col">
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription>Manage your account and notification preferences.</SheetDescription>
				</SheetHeader>
				<Tabs defaultValue="account" className="mt-6 flex flex-1 flex-col">
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
					</TabsContent>
					<TabsContent value="notifications" className="mt-4 space-y-4">
						{notificationOptions.map((item) => (
							<div key={item.key} className="flex items-center justify-between gap-4">
								<div className="space-y-0.5">
									<Label className="text-sm">{item.label}</Label>
									<p className="text-xs text-text-weak">{item.desc}</p>
								</div>
								<Switch
									checked={notifications[item.key]}
									onCheckedChange={(checked) =>
										setNotifications((prev) => ({ ...prev, [item.key]: !!checked }))
									}
								/>
							</div>
						))}
					</TabsContent>
				</Tabs>
				<SheetFooter>
					<Button
						className="w-full"
						iconLeft={<Save size={16} />}
						onClick={() => {
							const enabled = Object.values(notifications).filter(Boolean).length;
							onSave({
								title: "Settings saved",
								description: "Your preferences have been updated.",
							});
							onOpenChange(false);
						}}
					>
						Save
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
