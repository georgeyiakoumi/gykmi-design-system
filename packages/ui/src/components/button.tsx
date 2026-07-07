"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";
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
	/** Icon rendered before the label */
	iconLeft?: ReactNode;
	/** Icon rendered after the label */
	iconRight?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
	default: [
		"bg-gradient-to-b from-action to-action-hover text-action-text",
		"shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
		"hover:from-action-hover hover:to-action-active",
		"active:from-action-active active:to-action-active active:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2)]",
	].join(" "),
	secondary: [
		"text-text border border-border",
		"hover:from-surface-overlay hover:to-surface-raised-to hover:border-border-strong",
		"active:from-surface-raised-to active:to-surface-raised-to",
	].join(" "),
	danger: [
		"bg-gradient-to-b from-danger to-danger-hover text-action-text",
		"hover:from-danger-hover hover:to-danger-active",
		"active:from-danger-active active:to-danger-active",
	].join(" "),
	ghost: ["bg-transparent text-text", "hover:bg-surface-raised", "active:bg-surface-overlay"].join(
		" ",
	),
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-sm rounded-sm gap-1.5",
	md: "h-10 px-4 text-base rounded-md gap-2",
	lg: "h-12 px-6 text-lg rounded-lg gap-2.5",
};

const iconSizeStyles: Record<ButtonSize, string> = {
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = "default", size = "md", asChild, loading, disabled, iconLeft, iconRight, className, children, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const isDisabled = disabled || loading;
		const iconClass = iconSizeStyles[size];

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
					<>
						{iconLeft && <span className={cn("shrink-0", iconClass)} aria-hidden="true">{iconLeft}</span>}
						{children}
						{iconRight && <span className={cn("shrink-0", iconClass)} aria-hidden="true">{iconRight}</span>}
					</>
				)}
			</Comp>
		);
	},
);

Button.displayName = "Button";
