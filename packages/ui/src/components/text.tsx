"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type TextVariant =
	| "body-xs"
	| "body-sm"
	| "body-base"
	| "body-lg"
	| "heading-xl"
	| "heading-2xl"
	| "heading-3xl"
	| "heading-4xl"
	| "label-xs"
	| "label-sm";

export type TextAs =
	| "p"
	| "span"
	| "div"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "label"
	| "li"
	| "dt"
	| "dd"
	| "figcaption"
	| "blockquote"
	| "cite"
	| "time"
	| "small"
	| "strong"
	| "em";

const variantStyles: Record<TextVariant, string> = {
	"body-xs": "text-xs font-normal leading-normal tracking-normal",
	"body-sm": "text-sm font-normal leading-normal tracking-normal",
	"body-base": "text-base font-normal leading-normal tracking-normal",
	"body-lg": "text-lg font-normal leading-normal tracking-normal",
	"heading-xl": "text-xl font-semibold leading-tight tracking-tight",
	"heading-2xl": "text-2xl font-semibold leading-tight tracking-tight",
	"heading-3xl": "text-3xl font-bold leading-tight tracking-tight",
	"heading-4xl": "text-4xl font-bold leading-tight tracking-tight",
	"label-xs": "text-xs font-medium leading-tight tracking-normal",
	"label-sm": "text-sm font-medium leading-tight tracking-normal",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
	/** HTML element to render */
	as?: TextAs;
	/** Typography variant from the type scale */
	variant?: TextVariant;
}

export const Text = forwardRef<HTMLElement, TextProps>(
	({ as: Tag = "p", variant = "body-base", className, ...props }, ref) => {
		return (
			<Tag
				// biome-ignore lint/suspicious/noExplicitAny: polymorphic ref
				ref={ref as any}
				className={cn(variantStyles[variant], className)}
				{...props}
			/>
		);
	},
);

Text.displayName = "Text";
