"use client";

import { curveMonotoneX } from "@visx/curve";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { chartColors, chartSpacing } from "../lib/chart-tokens";
import { cn } from "../lib/cn";

export interface SparklineProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Numeric data values */
	data: number[];
	/** Accessible label */
	label: string;
	/** Line colour */
	color?: string;
	/** Custom height */
	height?: number;
	/** Custom width (defaults to 100%) */
	width?: number;
	/** Whether the chart is loading */
	loading?: boolean;
}

function SparklineInner({
	data,
	width,
	height,
	color = chartColors.primary,
}: {
	data: number[];
	width: number;
	height: number;
	color?: string;
}) {
	const margin = chartSpacing.sparklineMargin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);

	if (innerWidth <= 0 || innerHeight <= 0 || data.length < 2) return null;

	const xScale = scaleLinear({
		domain: [0, data.length - 1],
		range: [margin.left, width - margin.right],
	});

	const yScale = scaleLinear({
		domain: [Math.min(...data), Math.max(...data)],
		range: [height - margin.bottom, margin.top],
	});

	const points = data.map((value, i) => ({ x: i, y: value }));

	return (
		<svg width={width} height={height} role="img">
			<title>Sparkline</title>
			<LinePath
				data={points}
				x={(d) => xScale(d.x)}
				y={(d) => yScale(d.y)}
				stroke={color}
				strokeWidth={1.5}
				curve={curveMonotoneX}
			/>
		</svg>
	);
}

export const Sparkline = forwardRef<HTMLDivElement, SparklineProps>(
	(
		{ className, data, label, color, height = 32, width: fixedWidth, loading = false, ...props },
		ref,
	) => {
		if (loading) {
			return (
				<div
					ref={ref}
					className={cn("animate-pulse rounded bg-surface-raised", className)}
					style={{ height, width: fixedWidth ?? "100%" }}
					role="img"
					aria-label={`${label} loading`}
					{...props}
				/>
			);
		}

		if (data.length < 2) {
			return (
				<div
					ref={ref}
					className={cn("text-text-muted text-xs", className)}
					style={{ height, width: fixedWidth ?? "100%" }}
					role="img"
					aria-label={`${label} — insufficient data`}
					{...props}
				>
					—
				</div>
			);
		}

		return (
			<div
				ref={ref}
				className={cn("inline-block", className)}
				style={{ height, width: fixedWidth ?? "100%" }}
				role="img"
				aria-label={`${label}: sparkline showing trend from ${data[0]} to ${data[data.length - 1]}`}
				{...props}
			>
				{fixedWidth ? (
					<SparklineInner data={data} width={fixedWidth} height={height} color={color} />
				) : (
					<ParentSize>
						{({ width: w }) => (
							<SparklineInner data={data} width={w} height={height} color={color} />
						)}
					</ParentSize>
				)}
			</div>
		);
	},
);

Sparkline.displayName = "Sparkline";
