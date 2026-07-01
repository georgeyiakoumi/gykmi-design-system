"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends ComponentPropsWithRef<"input"> {
	/** Show error styling */
	error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ error, className, ...props }, ref) => {
		return (
			<input
				ref={ref}
				aria-invalid={error || undefined}
				className={cn(
					"flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-text",
					"placeholder:text-text-muted",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
					"disabled:cursor-not-allowed disabled:opacity-50",
					error ? "border-danger" : "border-border",
					className,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
