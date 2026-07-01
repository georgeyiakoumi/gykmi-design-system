"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface BoxProps extends ComponentPropsWithRef<"div"> {
	/** Render as child element */
	asChild?: boolean;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "div";
	return <Comp ref={ref} className={cn(className)} {...props} />;
});

Box.displayName = "Box";
