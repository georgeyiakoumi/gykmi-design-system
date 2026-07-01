"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface LabelProps extends ComponentPropsWithRef<typeof LabelPrimitive.Root> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
	return (
		<LabelPrimitive.Root
			ref={ref}
			className={cn(
				"text-sm font-medium leading-none text-text peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				className,
			)}
			{...props}
		/>
	);
});

Label.displayName = "Label";
