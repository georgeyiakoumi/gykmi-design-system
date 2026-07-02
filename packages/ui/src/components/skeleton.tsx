"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface SkeletonProps extends ComponentPropsWithRef<"div"> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("animate-pulse rounded-md bg-surface-raised", className)}
				{...props}
			/>
		);
	},
);

Skeleton.displayName = "Skeleton";
