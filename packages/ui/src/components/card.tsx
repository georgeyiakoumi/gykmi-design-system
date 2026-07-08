"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type CardVariant = "default" | "sunken";

export interface CardProps extends ComponentPropsWithRef<"div"> {
	/** Visual variant */
	variant?: CardVariant;
}

const cardVariantStyles: Record<CardVariant, string> = {
	default: "bg-surface-raised",
	sunken: "bg-surface-sunken shadow-inner",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ variant = "default", className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("rounded-2xl border border-border-weak", cardVariantStyles[variant], className)}
				{...props}
			/>
		);
	},
);
Card.displayName = "Card";

export interface CardHeaderProps extends ComponentPropsWithRef<"div"> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("grid grid-cols-[1fr_auto] items-center gap-4 p-6", className)}
				{...props}
			/>
		);
	},
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends ComponentPropsWithRef<"h3"> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ className, ...props }, ref) => {
		return (
			<h3
				ref={ref}
				className={cn("font-semibold text-xs text-text-weak uppercase tracking-wider", className)}
				{...props}
			/>
		);
	},
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends ComponentPropsWithRef<"p"> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
	({ className, ...props }, ref) => {
		return <p ref={ref} className={cn("text-sm text-text-weak", className)} {...props} />;
	},
);
CardDescription.displayName = "CardDescription";

export interface CardActionProps extends ComponentPropsWithRef<"div"> {}

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
	({ className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("flex shrink-0 items-center gap-3", className)} {...props} />
		);
	},
);
CardAction.displayName = "CardAction";

export interface CardContentProps extends ComponentPropsWithRef<"div"> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("px-6 pt-0 last:pb-6", className)} {...props} />;
	},
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends ComponentPropsWithRef<"div"> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("flex items-center  p-6", className)} {...props} />;
	},
);
CardFooter.displayName = "CardFooter";