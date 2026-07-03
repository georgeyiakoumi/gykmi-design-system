"use client";

import { curveMonotoneX } from "@visx/curve";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors, chartSpacing } from "../../lib/chart-tokens";
import { ChartTooltip } from "../../lib/chart-tooltip";
import { minMax } from "../../lib/chart-utils";
import { cn } from "../../lib/cn";

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
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function SparklineInner({
	data,
	width,
	height,
	color = chartColors.primary,
	onHover,
	onLeave,
	onFocus,
	onBlur,
}: {
	data: number[];
	width: number;
	height: number;
	color?: string;
	onHover?: (index: number, value: number, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (index: number, value: number, left: number, top: number) => void;
	onBlur?: () => void;
}) {
	const margin = chartSpacing.sparklineMargin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);

	if (innerWidth <= 0 || innerHeight <= 0 || data.length < 2) return null;

	const xScale = scaleLinear({
		domain: [0, data.length - 1],
		range: [margin.left, width - margin.right],
	});

	const [minVal, maxVal] = minMax(data);
	const yScale = scaleLinear({
		domain: [minVal, maxVal],
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
			{points.map((pt) => (
				<circle
					key={`hover-${pt.x}`}
					cx={xScale(pt.x)}
					cy={yScale(pt.y)}
					r={8}
					fill="transparent"
					tabIndex={0}
					style={{ cursor: "pointer" }}
					onMouseEnter={() => onHover?.(pt.x, pt.y, xScale(pt.x), yScale(pt.y))}
					onMouseLeave={() => onLeave?.()}
					onFocus={() => onFocus?.(pt.x, pt.y, xScale(pt.x), yScale(pt.y))}
					onBlur={() => onBlur?.()}
				/>
			))}
		</svg>
	);
}

export const Sparkline = forwardRef<HTMLDivElement, SparklineProps>(
	(
		{
			className,
			data,
			label,
			color,
			height = 32,
			width: fixedWidth,
			loading = false,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			index: number;
			value: number;
			left: number;
			top: number;
		} | null>(null);
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());
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

		const handleHover = (index: number, value: number, left: number, top: number) =>
			setTooltip({ index, value, left, top });
		const handleLeave = () => setTooltip(null);

		return (
			<div
				ref={ref}
				className={cn("relative inline-block", className)}
				style={{ height, width: fixedWidth ?? "100%" }}
				role="img"
				aria-label={`${label}: sparkline showing trend from ${data[0]} to ${data[data.length - 1]}`}
				{...props}
			>
				{fixedWidth ? (
					<SparklineInner
						data={data}
						width={fixedWidth}
						height={height}
						color={color}
						onHover={handleHover}
						onLeave={handleLeave}
						onFocus={handleHover}
						onBlur={handleLeave}
					/>
				) : (
					<ParentSize>
						{({ width: w }) => (
							<SparklineInner
								data={data}
								width={w}
								height={height}
								color={color}
								onHover={handleHover}
								onLeave={handleLeave}
								onFocus={handleHover}
								onBlur={handleLeave}
							/>
						)}
					</ParentSize>
				)}
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">#{tooltip.index}</div>
						<div>{fmt(tooltip.value)}</div>
					</ChartTooltip>
				)}
			</div>
		);
	},
);

Sparkline.displayName = "Sparkline";
