"use client";

import { AlertTriangle, Info, Scale } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";

export type DisclaimerVariant = "info" | "warning" | "regulatory";

export interface DisclaimerProps extends ComponentPropsWithRef<"aside"> {
	/** Visual variant */
	variant?: DisclaimerVariant;
	/** Short title for the disclaimer */
	title?: string;
}

const variantConfig: Record<DisclaimerVariant, { style: string; icon: typeof Info }> = {
	info: { style: "border-border bg-surface-raised text-text-muted", icon: Info },
	warning: { style: "border-warning bg-warning/5 text-text", icon: AlertTriangle },
	regulatory: { style: "border-action/30 bg-action/5 text-text", icon: Scale },
};

export const Disclaimer = forwardRef<HTMLElement, DisclaimerProps>(
	({ variant = "info", title, className, children, ...props }, ref) => {
		const config = variantConfig[variant];
		const Icon = config.icon;

		return (
			<aside
				ref={ref}
				role="note"
				className={cn(
					"flex gap-2.5 rounded-md border px-4 py-3 text-xs leading-relaxed",
					config.style,
					className,
				)}
				{...props}
			>
				<Icon size={14} className="mt-0.5 shrink-0 opacity-60" aria-hidden="true" />
				<div>
					{title && <p className="mb-1 font-semibold">{title}</p>}
					{children}
				</div>
			</aside>
		);
	},
);

Disclaimer.displayName = "Disclaimer";
