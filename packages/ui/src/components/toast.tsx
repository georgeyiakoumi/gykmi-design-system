"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export type ToastVariant = "default" | "success" | "danger";

export const ToastProvider = ToastPrimitive.Provider;

export interface ToastViewportProps extends ComponentPropsWithRef<typeof ToastPrimitive.Viewport> {}

export const ToastViewport = forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Viewport>,
	ToastViewportProps
>(({ className, ...props }, ref) => {
	return (
		<ToastPrimitive.Viewport
			ref={ref}
			className={cn(
				"fixed top-0 z-[var(--z-index-toast,500)] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
				className,
			)}
			{...props}
		/>
	);
});

ToastViewport.displayName = "ToastViewport";

const toastVariantStyles: Record<ToastVariant, string> = {
	default: "border-border-weak bg-surface-base text-text-strong",
	success: "border-success bg-fill-success-weak text-text-success",
	danger: "border-danger bg-fill-error-weak text-text-error",
};

export interface ToastProps extends ComponentPropsWithRef<typeof ToastPrimitive.Root> {
	variant?: ToastVariant;
}

export const Toast = forwardRef<React.ComponentRef<typeof ToastPrimitive.Root>, ToastProps>(
	({ className, variant = "default", ...props }, ref) => {
		return (
			<ToastPrimitive.Root
				ref={ref}
				className={cn(
					"group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg",
					"transition-all duration-150",
					"data-[swipe=cancel]:translate-x-0",
					"data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
					"data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
					"data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
					"data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
					toastVariantStyles[variant],
					className,
				)}
				{...props}
			/>
		);
	},
);

Toast.displayName = "Toast";

export interface ToastTitleProps extends ComponentPropsWithRef<typeof ToastPrimitive.Title> {}

export const ToastTitle = forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Title>,
	ToastTitleProps
>(({ className, ...props }, ref) => {
	return (
		<ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
	);
});

ToastTitle.displayName = "ToastTitle";

export interface ToastDescriptionProps
	extends ComponentPropsWithRef<typeof ToastPrimitive.Description> {}

export const ToastDescription = forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Description>,
	ToastDescriptionProps
>(({ className, ...props }, ref) => {
	return (
		<ToastPrimitive.Description
			ref={ref}
			className={cn("text-sm opacity-90", className)}
			{...props}
		/>
	);
});

ToastDescription.displayName = "ToastDescription";

export interface ToastActionProps extends ComponentPropsWithRef<typeof ToastPrimitive.Action> {}

export const ToastAction = forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Action>,
	ToastActionProps
>(({ className, ...props }, ref) => {
	return (
		<ToastPrimitive.Action
			ref={ref}
			className={cn(
				"inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border-weak bg-transparent px-3 text-sm font-medium",
				"hover:bg-surface-raised",
				"focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
});

ToastAction.displayName = "ToastAction";

export interface ToastCloseProps extends ComponentPropsWithRef<typeof ToastPrimitive.Close> {}

export const ToastClose = forwardRef<
	React.ComponentRef<typeof ToastPrimitive.Close>,
	ToastCloseProps
>(({ className, ...props }, ref) => {
	return (
		<ToastPrimitive.Close
			ref={ref}
			className={cn(
				"absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity",
				"hover:text-text-strong",
				"focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-focus",
				"group-hover:opacity-100",
				className,
			)}
			toast-close=""
			{...props}
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<title>close</title>
				<path
					d="M12 4L4 12M4 4L12 12"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</ToastPrimitive.Close>
	);
});

ToastClose.displayName = "ToastClose";
