"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "default" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
	/** Visual style variant */
	variant?: ButtonVariant;
	/** Size of the button */
	size?: ButtonSize;
	/** Render as child element (Radix Slot polymorphism) */
	asChild?: boolean;
	/** Show loading state */
	loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
	default: ["bg-action text-action-text", "hover:bg-action-hover", "active:bg-action-active"].join(
		" ",
	),
	secondary: [
		"bg-surface-raised text-text border border-border",
		"hover:bg-surface-overlay hover:border-border-strong",
		"active:bg-surface",
	].join(" "),
	danger: ["bg-danger text-danger-text", "hover:bg-danger-hover", "active:bg-danger-active"].join(
		" ",
	),
	ghost: ["bg-transparent text-text", "hover:bg-surface-raised", "active:bg-surface-overlay"].join(
		" ",
	),
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-sm rounded-sm gap-1.5",
	md: "h-10 px-4 text-base rounded-md gap-2",
	lg: "h-12 px-6 text-lg rounded-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = "default", size = "md", asChild, loading, disabled, className, children, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const isDisabled = disabled || loading;

		return (
			<Comp
				ref={ref}
				disabled={isDisabled}
				aria-disabled={isDisabled || undefined}
				aria-busy={loading || undefined}
				className={cn(
					// Base styles
					"inline-flex items-center justify-center font-medium",
					"transition-colors duration-150",
					// Focus ring driven by token
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
					// Disabled state
					"disabled:pointer-events-none disabled:opacity-50",
					// Reduced motion
					"motion-reduce:transition-none",
					// Variant + size
					variantStyles[variant],
					sizeStyles[size],
					className,
				)}
				{...props}
			>
				{loading ? (
					<>
						<span
							className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
							aria-hidden="true"
						/>
						<span>{children}</span>
					</>
				) : (
					children
				)}
			</Comp>
		);
	},
);

Button.displayName = "Button";
