"use client";

import type { ReactNode } from "react";
import { chartColors, chartFont } from "./chart-tokens";

export interface ChartTooltipProps {
	top: number;
	left: number;
	children: ReactNode;
}

/**
 * Styled tooltip for chart components.
 * Positioned absolutely relative to the chart container.
 */
export function ChartTooltip({ top, left, children }: ChartTooltipProps) {
	return (
		<div
			style={{
				position: "absolute",
				top,
				left,
				transform: "translate(-50%, -100%)",
				pointerEvents: "none",
				backgroundColor: chartColors.text,
				color: chartColors.background,
				padding: "6px 10px",
				borderRadius: 6,
				fontSize: chartFont.size.tick,
				fontFamily: chartFont.family,
				whiteSpace: "nowrap",
				zIndex: 10,
				boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
				marginTop: -8,
			}}
		>
			{children}
		</div>
	);
}
