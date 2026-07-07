"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface RadioGroupProps extends ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {}

export const RadioGroup = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Root>,
	RadioGroupProps
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />;
});

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
	extends ComponentPropsWithRef<typeof RadioGroupPrimitive.Item> {}

export const RadioGroupItem = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Item>,
	RadioGroupItemProps
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"aspect-square h-4 w-4 rounded-full border border-border-weak",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"data-[state=checked]:border-border-selected",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<span className="h-2.5 w-2.5 rounded-full bg-fill-brand-strong" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});

RadioGroupItem.displayName = "RadioGroupItem";
