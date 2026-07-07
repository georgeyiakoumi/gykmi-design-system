"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface AvatarProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Root> {}

export const Avatar = forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	({ className, ...props }, ref) => {
		return (
			<AvatarPrimitive.Root
				ref={ref}
				className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
				{...props}
			/>
		);
	},
);

Avatar.displayName = "Avatar";

export interface AvatarImageProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Image> {}

export const AvatarImage = forwardRef<
	React.ComponentRef<typeof AvatarPrimitive.Image>,
	AvatarImageProps
>(({ className, ...props }, ref) => {
	return (
		<AvatarPrimitive.Image
			ref={ref}
			className={cn("aspect-square h-full w-full", className)}
			{...props}
		/>
	);
});

AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps
	extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {}

export const AvatarFallback = forwardRef<
	React.ComponentRef<typeof AvatarPrimitive.Fallback>,
	AvatarFallbackProps
>(({ className, ...props }, ref) => {
	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full bg-surface-raised text-sm font-medium text-text-weak",
				className,
			)}
			{...props}
		/>
	);
});

AvatarFallback.displayName = "AvatarFallback";
