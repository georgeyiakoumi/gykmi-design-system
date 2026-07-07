"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { type ComponentPropsWithRef, createContext, forwardRef, useContext } from "react";
import { cn } from "../lib/cn";

export type AvatarSize = "sm" | "md" | "lg";

const sizeStyles: Record<AvatarSize, { root: string; fallback: string; icon: string }> = {
	sm: { root: "size-8", fallback: "text-xs", icon: "size-5" },
	md: { root: "size-12", fallback: "text-base", icon: "size-6" },
	lg: { root: "size-16", fallback: "text-2xl", icon: "size-8" },
};

const AvatarSizeContext = createContext<AvatarSize>("sm");

export interface AvatarProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Root> {
	/** Size of the avatar */
	size?: AvatarSize;
}

export const Avatar = forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	({ size = "sm", className, ...props }, ref) => {
		return (
			<AvatarSizeContext.Provider value={size}>
				<AvatarPrimitive.Root
					ref={ref}
					className={cn(
						"relative flex shrink-0 overflow-hidden rounded-full border border-border-weak",
						sizeStyles[size].root,
						className,
					)}
					{...props}
				/>
			</AvatarSizeContext.Provider>
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
	const size = useContext(AvatarSizeContext);
	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full bg-fill-weak font-medium text-text-weak",
				sizeStyles[size].fallback,
				className,
			)}
			{...props}
		/>
	);
});

AvatarFallback.displayName = "AvatarFallback";

export interface AvatarIconProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {}

export const AvatarIcon = forwardRef<
	React.ComponentRef<typeof AvatarPrimitive.Fallback>,
	AvatarIconProps
>(({ className, ...props }, ref) => {
	const size = useContext(AvatarSizeContext);
	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full bg-fill-weak text-icon-neutral",
				className,
			)}
			{...props}
		>
			<User className={sizeStyles[size].icon} />
		</AvatarPrimitive.Fallback>
	);
});

AvatarIcon.displayName = "AvatarIcon";
