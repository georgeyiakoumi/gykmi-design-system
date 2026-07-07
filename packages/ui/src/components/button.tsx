"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef, type ReactNode } from "react";
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
		"bg-fill-brand-strong text-text-inverse-strong",
		"hover:opacity-90",
		"active:opacity-80",
	].join(" "),
	secondary: [
		"bg-surface-raised text-text-strong border border-border-weak",
		"hover:bg-surface-overlay hover:border-border-strong",
		"active:bg-surface-base",
	].join(" "),
	danger: [
		"bg-fill-error-strong text-text-inverse-strong",
		"hover:opacity-90",
		"active:opacity-80",
	].join(" "),
	ghost: [
		"bg-transparent text-text-strong",
		"hover:bg-fill-hover",
		"active:bg-surface-overlay",
	].join(" "),
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
		{
			variant = "default",
			size = "md",
			asChild,
			loading,
			disabled,
			iconLeft,
			iconRight,
			className,
			children,
			...props
		},
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
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
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
						{iconLeft && (
							<span className={cn("shrink-0", iconClass)} aria-hidden="true">
								{iconLeft}
							</span>
						)}
						{children}
						{iconRight && (
							<span className={cn("shrink-0", iconClass)} aria-hidden="true">
								{iconRight}
							</span>
						)}
					</>
				)}
			</Comp>
		);
	},
);

Button.displayName = "Button";
