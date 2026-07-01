"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface CardProps extends ComponentPropsWithRef<"div"> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn("rounded-lg border border-border bg-surface shadow-sm", className)}
			{...props}
		/>
	);
});

Card.displayName = "Card";

export interface CardHeaderProps extends ComponentPropsWithRef<"div"> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
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

export interface CardContentProps extends ComponentPropsWithRef<"div"> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
	},
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends ComponentPropsWithRef<"div"> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, ...props }, ref) => {
		return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
	},
);

CardFooter.displayName = "CardFooter";
