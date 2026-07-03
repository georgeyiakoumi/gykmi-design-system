"use client";

import { Shield } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "../badge";

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
				<div className="flex items-center gap-2">
					<Shield size={12} className="text-text-muted" aria-hidden="true" />
					{framework && <span className="font-medium text-text">{framework}</span>}
					{reference && (
						<Badge variant="default" label={reference} className="text-[10px] px-1.5 py-0" />
					)}
					{children && <span>{children}</span>}
				</div>
			</footer>
		);
	},
);

RegulatoryNotice.displayName = "RegulatoryNotice";
