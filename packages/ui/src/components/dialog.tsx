"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export interface DialogOverlayProps extends ComponentPropsWithRef<typeof DialogPrimitive.Overlay> {}

export const DialogOverlay = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Overlay>,
	DialogOverlayProps
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Overlay
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

DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends ComponentPropsWithRef<typeof DialogPrimitive.Content> {}

export const DialogContent = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Content>,
	DialogContentProps
>(({ className, children, ...props }, ref) => {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
					"rounded-lg border border-border bg-surface p-6 shadow-lg",
					"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
					"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
					"motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});

DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends ComponentPropsWithRef<"div"> {}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
				{...props}
			/>
		);
	},
);

DialogHeader.displayName = "DialogHeader";

export interface DialogTitleProps extends ComponentPropsWithRef<typeof DialogPrimitive.Title> {}

export const DialogTitle = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Title>,
	DialogTitleProps
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Title
			ref={ref}
			className={cn("text-lg font-semibold leading-none tracking-tight text-text", className)}
			{...props}
		/>
	);
});

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
	extends ComponentPropsWithRef<typeof DialogPrimitive.Description> {}

export const DialogDescription = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Description>,
	DialogDescriptionProps
>(({ className, ...props }, ref) => {
	return (
		<DialogPrimitive.Description
			ref={ref}
			className={cn("text-sm text-text-muted", className)}
			{...props}
		/>
	);
});

DialogDescription.displayName = "DialogDescription";
