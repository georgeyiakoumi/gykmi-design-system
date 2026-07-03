"use client";

import { AlertTriangle, Info, ShieldAlert, X } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";

export type ComplianceSeverity = "info" | "warning" | "critical";

export interface ComplianceBannerProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Severity level */
	severity?: ComplianceSeverity;
	/** Short headline */
	title: string;
	/** Description text */
	description?: string;
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
	({ severity = "info", title, description, dismissible, onDismiss, className, ...props }, ref) => {
		const [dismissed, setDismissed] = useState(false);
		const config = severityConfig[severity];
		const Icon = config.icon;

		if (dismissed) return null;

		return (
			<div
				ref={ref}
				role="alert"
				aria-live={severity === "critical" ? "assertive" : "polite"}
				className={cn("relative border-b px-6 py-3", config.style, className)}
				{...props}
			>
				<div className="flex items-start gap-3">
					<Icon size={16} className="mt-0.5 shrink-0 text-text-muted" aria-hidden="true" />
					<div className="flex-1">
						<p className="text-sm font-semibold text-text">{title}</p>
						{description && (
							<p className="mt-1 text-xs text-text-muted leading-relaxed">{description}</p>
						)}
					</div>
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
							Dismiss
						</Button>
					)}
				</div>
			</div>
		);
	},
);

ComplianceBanner.displayName = "ComplianceBanner";
