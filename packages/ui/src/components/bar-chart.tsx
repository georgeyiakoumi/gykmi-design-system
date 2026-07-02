"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { type ChartDataPoint, chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { minMax } from "../lib/chart-utils";
import { cn } from "../lib/cn";

export interface BarChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Chart data points */
	data: ChartDataPoint[];
	/** Chart title for accessibility */
	title: string;
	/** Whether the chart is loading */
	loading?: boolean;
	/** Custom height */
	height?: number;
	/** Show grid lines */
	showGrid?: boolean;
	/** Bar colour */
	color?: string;
	/** Show accessible data table fallback */
	showTable?: boolean;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function BarChartInner({
	data,
	width,
	height,
	showGrid = true,
	color = chartColors.primary,
	onHover,
	onLeave,
}: {
	data: ChartDataPoint[];
	width: number;
	height: number;
	showGrid?: boolean;
	color?: string;
	onHover?: (d: ChartDataPoint, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);

	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const xScale = scaleBand({
		domain: data.map((d) => d.label),
		range: [0, innerWidth],
		padding: 0.3,
	});

	const [, maxVal] = minMax(data.map((d) => d.value));
	const yScale = scaleLinear({
		domain: [0, maxVal * 1.1],
		range: [innerHeight, 0],
		nice: true,
	});

	return (
		<svg width={width} height={height} role="img">
			<title>Bar chart</title>
			<Group left={margin.left} top={margin.top}>
				{showGrid && (
					<GridRows
						scale={yScale}
						width={innerWidth}
						stroke={chartColors.grid}
						strokeOpacity={0.5}
					/>
				)}
				{data.map((d) => {
					const barWidth = xScale.bandwidth();
					const barHeight = innerHeight - (yScale(d.value) ?? 0);
					const barX = xScale(d.label) ?? 0;
					const barY = innerHeight - barHeight;
					return (
						<Bar
							key={d.label}
							x={barX}
							y={barY}
							width={barWidth}
							height={barHeight}
							fill={color}
							rx={4}
							style={{ cursor: "pointer" }}
							onMouseEnter={() =>
								onHover?.(d, barX + barWidth / 2 + margin.left, barY + margin.top)
							}
							onMouseLeave={() => onLeave?.()}
						/>
					);
				})}
				<AxisBottom
					top={innerHeight}
					scale={xScale}
					stroke={chartColors.grid}
					tickStroke={chartColors.grid}
					tickLabelProps={{
						fill: chartColors.textMuted,
						fontSize: chartFont.size.tick,
						textAnchor: "middle",
					}}
				/>
				<AxisLeft
					scale={yScale}
					stroke={chartColors.grid}
					tickStroke={chartColors.grid}
					tickLabelProps={{
						fill: chartColors.textMuted,
						fontSize: chartFont.size.tick,
						textAnchor: "end",
						dx: "-0.25em",
						dy: "0.25em",
					}}
				/>
			</Group>
		</svg>
	);
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
	(
		{
			className,
			data,
			title,
			loading = false,
			height = 300,
			showGrid = true,
			color,
			showTable = false,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			data: ChartDataPoint;
			left: number;
			top: number;
		} | null>(null);

		if (loading) {
			return (
				<div
					ref={ref}
					className={cn("animate-pulse rounded-lg bg-surface-raised", className)}
					style={{ height }}
					role="img"
					aria-label={`${title} loading`}
					{...props}
				/>
			);
		}

		if (data.length === 0) {
			return (
				<div
					ref={ref}
					className={cn(
						"flex items-center justify-center rounded-lg border border-border text-text-muted",
						className,
					)}
					style={{ height }}
					role="img"
					aria-label={`${title} — no data`}
					{...props}
				>
					No data available
				</div>
			);
		}

		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div
					role="img"
					aria-label={`${title}: bar chart with ${data.length} data points`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<BarChartInner
								data={data}
								width={w}
								height={height}
								showGrid={showGrid}
								color={color}
								onHover={(d, left, top) => setTooltip({ data: d, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">{tooltip.data.label}</div>
						<div>{fmt(tooltip.data.value)}</div>
					</ChartTooltip>
				)}
				{showTable && (
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Label</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr key={d.label}>
									<td>{d.label}</td>
									<td>{d.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	},
);

BarChart.displayName = "BarChart";
