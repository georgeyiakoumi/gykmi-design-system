"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";

export type DisclaimerVariant = "info" | "warning" | "regulatory";

export interface DisclaimerProps extends ComponentPropsWithRef<"aside"> {
	/** Visual variant */
	variant?: DisclaimerVariant;
	/** Short title for the disclaimer */
	title?: string;
}

const variantStyles: Record<DisclaimerVariant, string> = {
	info: "border-border bg-surface-raised text-text-muted",
	warning: "border-warning bg-warning/5 text-text",
	regulatory: "border-action/30 bg-action/5 text-text",
};

const variantIcons: Record<DisclaimerVariant, string> = {
	info: "ℹ",
	warning: "⚠",
	regulatory: "§",
};

export const Disclaimer = forwardRef<HTMLElement, DisclaimerProps>(
	({ variant = "info", title, className, children, ...props }, ref) => {
		return (
			<aside
				ref={ref}
				role="note"
				className={cn(
					"rounded-md border px-4 py-3 text-xs leading-relaxed",
					variantStyles[variant],
					className,
				)}
				{...props}
			>
				{title && (
					<p className="mb-1 font-semibold">
						<span aria-hidden="true">{variantIcons[variant]} </span>
						{title}
					</p>
				)}
				{children}
			</aside>
		);
	},
);

Disclaimer.displayName = "Disclaimer";
