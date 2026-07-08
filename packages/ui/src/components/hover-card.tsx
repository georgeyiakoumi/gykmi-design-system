"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export interface HoverCardContentProps
	extends ComponentPropsWithRef<typeof HoverCardPrimitive.Content> {}

export const HoverCardContent = forwardRef<
	React.ComponentRef<typeof HoverCardPrimitive.Content>,
	HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
	return (
		<HoverCardPrimitive.Portal>
			<HoverCardPrimitive.Content
				ref={ref}
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-64 rounded-md border border-border-weak bg-surface-base p-4 shadow-md outline-none",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
					"data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			/>
		</HoverCardPrimitive.Portal>
	);
});

HoverCardContent.displayName = "HoverCardContent";
