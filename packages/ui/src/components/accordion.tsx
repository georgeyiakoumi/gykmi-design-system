"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const Accordion = AccordionPrimitive.Root;

export interface AccordionItemProps extends ComponentPropsWithRef<typeof AccordionPrimitive.Item> {}

export const AccordionItem = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Item>,
	AccordionItemProps
>(({ className, ...props }, ref) => {
	return (
		<AccordionPrimitive.Item
			ref={ref}
			className={cn("border-b border-border", className)}
			{...props}
		/>
	);
});

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
	extends ComponentPropsWithRef<typeof AccordionPrimitive.Trigger> {}

export const AccordionTrigger = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Trigger>,
	AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					"flex flex-1 items-center justify-between py-4 font-medium transition-all duration-150",
					"hover:underline",
					"[&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					className="shrink-0 transition-transform duration-150"
					aria-hidden="true"
				>
					<title>toggle</title>
					<path
						d="M4 6L8 10L12 6"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
});

AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps
	extends ComponentPropsWithRef<typeof AccordionPrimitive.Content> {}

export const AccordionContent = forwardRef<
	React.ComponentRef<typeof AccordionPrimitive.Content>,
	AccordionContentProps
>(({ className, children, ...props }, ref) => {
	return (
		<AccordionPrimitive.Content
			ref={ref}
			className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			{...props}
		>
			<div className={cn("pb-4 pt-0", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
});

AccordionContent.displayName = "AccordionContent";
