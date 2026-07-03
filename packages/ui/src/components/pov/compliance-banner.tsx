"use client";

import { AlertTriangle, Info, ShieldAlert, X } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../alert";
import { Button } from "../button";

export type ComplianceSeverity = "info" | "warning" | "critical";

export interface ComplianceBannerProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Severity level */
	severity?: ComplianceSeverity;
	/** Short headline */
	title: string;
	/** Description text */
	description?: string;
	/** Optional action element (e.g. a Button) */
	action?: ReactNode;
	/** Whether the banner can be dismissed */
	dismissible?: boolean;
	/** Callback when dismissed */
	onDismiss?: () => void;
}

const severityConfig: Record<ComplianceSeverity, { style: string; icon: typeof Info }> = {
	info: { style: "border-action/30 bg-action/5", icon: Info },
	warning: { style: "border-warning bg-warning/5", icon: AlertTriangle },
	critical: { style: "border-danger bg-danger/5", icon: ShieldAlert },
};

export const ComplianceBanner = forwardRef<HTMLDivElement, ComplianceBannerProps>(
	(
		{ severity = "info", title, description, action, dismissible, onDismiss, className, ...props },
		ref,
	) => {
		const [dismissed, setDismissed] = useState(false);
		const config = severityConfig[severity];
		const Icon = config.icon;

		if (dismissed) return null;

		return (
			<Alert
				ref={ref}
				aria-live={severity === "critical" ? "assertive" : "polite"}
				className={cn("rounded-none border-x-0 border-t-0 px-6", config.style, className)}
				{...props}
			>
				<Icon size={16} className="text-text-muted" />
				<AlertTitle>{title}</AlertTitle>
				{description && <AlertDescription>{description}</AlertDescription>}
				{(action || dismissible) && (
					<AlertAction>
						<div className="flex items-center gap-1">
							{action}
							{dismissible && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setDismissed(true);
										onDismiss?.();
									}}
									aria-label="Dismiss"
								>
									<X size={14} />
								</Button>
							)}
						</div>
					</AlertAction>
				)}
			</Alert>
		);
	},
);

ComplianceBanner.displayName = "ComplianceBanner";
