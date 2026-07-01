"use client";

import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface RegulatoryNoticeProps extends ComponentPropsWithRef<"footer"> {
	/** The regulatory body or framework (e.g. "FCA", "MiFID II", "SOX") */
	framework?: string;
	/** Reference number or identifier */
	reference?: string;
}

export const RegulatoryNotice = forwardRef<HTMLElement, RegulatoryNoticeProps>(
	({ framework, reference, className, children, ...props }, ref) => {
		return (
			<footer
				ref={ref}
				role="contentinfo"
				className={cn(
					"border-t border-border px-4 py-3 text-xs text-text-muted leading-relaxed",
					className,
				)}
				{...props}
			>
				{(framework || reference) && (
					<div className="mb-1 flex items-center gap-2 font-medium text-text">
						{framework && <span>{framework}</span>}
						{reference && <span className="text-text-muted">Ref: {reference}</span>}
					</div>
				)}
				{children}
			</footer>
		);
	},
);

RegulatoryNotice.displayName = "RegulatoryNotice";
