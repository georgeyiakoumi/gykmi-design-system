"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface CardProps extends ComponentPropsWithRef<"div"> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"rounded-lg bg-gradient-to-b from-surface-raised-from to-surface-raised-to border border-t-border-raised-from border-b-border-raised-to border-x-border-raised-from/50",
				className,
			)}
			{...props}
		/>
	);
});

Card.displayName = "Card";

export interface CardHeaderProps extends ComponentPropsWithRef<"div"> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex items-start justify-between gap-4 p-6", className)}
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
				className={cn("text-lg font-semibold leading-none tracking-tight text-text", className)}
				{...props}
			/>
		);
	},
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends ComponentPropsWithRef<"p"> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
	({ className, ...props }, ref) => {
		return <p ref={ref} className={cn("text-sm text-text-muted", className)} {...props} />;
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
