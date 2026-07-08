"use client";

import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export type AlertVariant = "default" | "destructive";

export interface AlertProps extends ComponentPropsWithRef<"div"> {
	variant?: AlertVariant;
}

const variantStyles: Record<AlertVariant, string> = {
	default: "bg-surface-raised text-text-strong",
	destructive: "bg-surface-raised text-danger",
};

function Alert({ className, variant = "default", ...props }: AlertProps) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(
				"group/alert relative grid w-full gap-0.5 rounded-lg border border-border-weak px-2.5 py-2 text-left text-sm",
				"has-data-[slot=alert-action]:pr-18",
				"has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2",
				"*:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
				variantStyles[variant],
				className,
			)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn("font-medium group-has-[>svg]/alert:col-start-2", className)}
			{...props}
		/>
	);
}

function AlertDescription({ className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn("text-sm text-balance text-text-weak", className)}
			{...props}
		/>
	);
}

function AlertAction({ className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div data-slot="alert-action" className={cn("absolute top-2 right-2", className)} {...props} />
	);
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
