"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export interface AlertDialogCancelProps
	extends ComponentPropsWithRef<typeof AlertDialogPrimitive.Cancel> {}

export const AlertDialogCancel = forwardRef<
	React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
	AlertDialogCancelProps
>(({ className, ...props }, ref) => {
	return (
		<AlertDialogPrimitive.Cancel
			ref={ref}
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium",
				"bg-surface-raised text-text-strong border border-border-weak",
				"hover:bg-surface-overlay hover:border-border-strong",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				className,
			)}
			{...props}
		/>
	);
});

AlertDialogCancel.displayName = "AlertDialogCancel";

export interface AlertDialogActionProps
	extends ComponentPropsWithRef<typeof AlertDialogPrimitive.Action> {}

export const AlertDialogAction = forwardRef<
	React.ComponentRef<typeof AlertDialogPrimitive.Action>,
	AlertDialogActionProps
>(({ className, ...props }, ref) => {
	return (
		<AlertDialogPrimitive.Action
			ref={ref}
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium",
				"bg-fill-brand-strong text-text-inverse-strong",
				"hover:bg-fill-brand-strong",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
				className,
			)}
			{...props}
		/>
	);
});

AlertDialogAction.displayName = "AlertDialogAction";

export interface AlertDialogOverlayProps
	extends ComponentPropsWithRef<typeof AlertDialogPrimitive.Overlay> {}

export const AlertDialogOverlay = forwardRef<
	React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
	AlertDialogOverlayProps
>(({ className, ...props }, ref) => {
	return (
		<AlertDialogPrimitive.Overlay
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-black/50",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
});

AlertDialogOverlay.displayName = "AlertDialogOverlay";

export interface AlertDialogContentProps
	extends ComponentPropsWithRef<typeof AlertDialogPrimitive.Content> {}

export const AlertDialogContent = forwardRef<
	React.ComponentRef<typeof AlertDialogPrimitive.Content>,
	AlertDialogContentProps
>(({ className, children, ...props }, ref) => {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
					"rounded-3xl border border-border-weak bg-surface-overlay p-6 shadow-2xl space-y-8",
					"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
					"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
					className,
				)}
				{...props}
			>
				{children}
			</AlertDialogPrimitive.Content>
		</AlertDialogPortal>
	);
});

AlertDialogContent.displayName = "AlertDialogContent";

export interface AlertDialogHeaderProps extends ComponentPropsWithRef<"div"> {}

export const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
				{...props}
			/>
		);
	},
);

AlertDialogHeader.displayName = "AlertDialogHeader";

export interface AlertDialogFooterProps extends ComponentPropsWithRef<"div"> {}

export const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2", className)}
				{...props}
			/>
		);
	},
);

AlertDialogFooter.displayName = "AlertDialogFooter";

export interface AlertDialogTitleProps
	extends ComponentPropsWithRef<typeof AlertDialogPrimitive.Title> {}

export const AlertDialogTitle = forwardRef<
	React.ComponentRef<typeof AlertDialogPrimitive.Title>,
	AlertDialogTitleProps
>(({ className, ...props }, ref) => {
	return (
		<AlertDialogPrimitive.Title
			ref={ref}
			className={cn("text-lg font-semibold text-text-strong", className)}
			{...props}
		/>
	);
});

AlertDialogTitle.displayName = "AlertDialogTitle";

export interface AlertDialogDescriptionProps
	extends ComponentPropsWithRef<typeof AlertDialogPrimitive.Description> {}

export const AlertDialogDescription = forwardRef<
	React.ComponentRef<typeof AlertDialogPrimitive.Description>,
	AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
	return (
		<AlertDialogPrimitive.Description
			ref={ref}
			className={cn("text-sm text-text-weak", className)}
			{...props}
		/>
	);
});

AlertDialogDescription.displayName = "AlertDialogDescription";
