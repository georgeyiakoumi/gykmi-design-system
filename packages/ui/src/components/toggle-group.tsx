"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type ComponentPropsWithRef, createContext, forwardRef, useContext } from "react";
import { cn } from "../lib/cn";
import type { ToggleSize, ToggleVariant } from "./toggle";

const ToggleGroupContext = createContext<{ variant?: ToggleVariant; size?: ToggleSize }>({});

export type ToggleGroupProps = React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root> & {
	variant?: ToggleVariant;
	size?: ToggleSize;
};

export const ToggleGroup = forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
	ToggleGroupProps
>(({ className, variant = "default", size = "md", children, ...props }, ref) => {
	return (
		<ToggleGroupPrimitive.Root
			ref={ref}
			className={cn("flex items-center justify-center gap-1", className)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
});

ToggleGroup.displayName = "ToggleGroup";

const variantStyles: Record<ToggleVariant, string> = {
	default: "bg-transparent",
	outline: "border border-border-weak bg-transparent hover:bg-surface-raised",
};

const sizeStyles: Record<ToggleSize, string> = {
	sm: "h-8 px-2 min-w-8",
	md: "h-10 px-3 min-w-10",
	lg: "h-12 px-4 min-w-12",
};

export interface ToggleGroupItemProps
	extends ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item> {
	variant?: ToggleVariant;
	size?: ToggleSize;
}

export const ToggleGroupItem = forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
	ToggleGroupItemProps
>(({ className, variant, size, ...props }, ref) => {
	const context = useContext(ToggleGroupContext);
	const v = variant ?? context.variant ?? "default";
	const s = size ?? context.size ?? "md";

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center rounded-md text-sm font-medium text-text-weak",
				"ring-offset-surface-base transition-colors duration-150",
				"hover:bg-surface-raised hover:text-text-strong",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				"data-[state=on]:bg-surface-raised data-[state=on]:text-text-strong",
				variantStyles[v],
				sizeStyles[s],
				className,
			)}
			{...props}
		/>
	);
});

ToggleGroupItem.displayName = "ToggleGroupItem";
