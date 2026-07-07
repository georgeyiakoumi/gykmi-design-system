"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, forwardRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface RadioCardsProps extends ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {}

export const RadioCards = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Root>,
	RadioCardsProps
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-3", className)} {...props} />;
});

RadioCards.displayName = "RadioCards";

export interface RadioCardsItemProps
	extends ComponentPropsWithRef<typeof RadioGroupPrimitive.Item> {
	/** Icon displayed above the title */
	icon?: ReactNode;
	/** Card title */
	label: string;
	/** Optional description below the title */
	description?: string;
}

export const RadioCardsItem = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Item>,
	RadioCardsItemProps
>(({ className, icon, label, description, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex flex-col items-start gap-2 rounded-lg border border-border-weak bg-surface-base p-4 text-left",
				"transition-colors",
				"hover:bg-surface-raised",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				"data-[state=checked]:border-border-selected data-[state=checked]:ring-1 data-[state=checked]:ring-action",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{icon && <span className="text-text-weak">{icon}</span>}
			<span className="text-sm font-medium text-text-strong">{label}</span>
			{description && (
				<span className="text-xs text-text-weak leading-relaxed">{description}</span>
			)}
		</RadioGroupPrimitive.Item>
	);
});

RadioCardsItem.displayName = "RadioCardsItem";
