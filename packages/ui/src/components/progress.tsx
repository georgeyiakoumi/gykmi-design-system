"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface ProgressProps extends ComponentPropsWithRef<typeof ProgressPrimitive.Root> {}

export const Progress = forwardRef<
	React.ComponentRef<typeof ProgressPrimitive.Root>,
	ProgressProps
>(({ className, value, ...props }, ref) => {
	return (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				"relative h-4 w-full overflow-hidden rounded-full bg-surface-raised",
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				className="h-full w-full flex-1 bg-action transition-all duration-150"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	);
});

Progress.displayName = "Progress";
