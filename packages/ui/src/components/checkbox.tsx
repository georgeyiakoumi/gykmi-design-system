"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {}

export const Checkbox = forwardRef<
	React.ComponentRef<typeof CheckboxPrimitive.Root>,
	CheckboxProps
>(({ className, ...props }, ref) => {
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				"peer h-4 w-4 shrink-0 rounded-sm border border-border-weak",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"data-[state=checked]:bg-fill-brand-strong data-[state=checked]:border-border-selected data-[state=checked]:text-text-inverse-strong",
				"data-[state=indeterminate]:bg-fill-brand-strong data-[state=indeterminate]:border-border-selected data-[state=indeterminate]:text-text-inverse-strong",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
					<title>check</title>
					<path
						d="M10 3L4.5 8.5L2 6"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
});

Checkbox.displayName = "Checkbox";
