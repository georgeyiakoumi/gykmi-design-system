"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface SliderProps extends ComponentPropsWithRef<typeof SliderPrimitive.Root> {}

export const Slider = forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
	({ className, ...props }, ref) => {
		return (
			<SliderPrimitive.Root
				ref={ref}
				className={cn("relative flex w-full touch-none select-none items-center", className)}
				{...props}
			>
				<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-raised">
					<SliderPrimitive.Range className="absolute h-full bg-fill-brand-strong" />
				</SliderPrimitive.Track>
				<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-border-selected bg-surface-base ring-offset-surface-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
			</SliderPrimitive.Root>
		);
	},
);

Slider.displayName = "Slider";
