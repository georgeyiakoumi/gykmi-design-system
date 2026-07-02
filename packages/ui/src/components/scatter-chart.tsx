"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { minMax } from "../lib/chart-utils";
import { cn } from "../lib/cn";

export interface ScatterPoint {
	x: number;
	y: number;
	label?: string;
	size?: number;
}

export interface ScatterChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: ScatterPoint[];
	title: string;
	xLabel?: string;
	yLabel?: string;
	loading?: boolean;
	height?: number;
	showGrid?: boolean;
	showTable?: boolean;
	color?: string;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function ScatterInner({
	data,
	width,
	height,
	showGrid = true,
	color = chartColors.primary,
	onHover,
	onLeave,
}: {
	data: ScatterPoint[];
	width: number;
	height: number;
	showGrid?: boolean;
	color?: string;
	onHover?: (d: ScatterPoint, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const [minX, maxX] = minMax(data.map((d) => d.x));
	const [minY, maxY] = minMax(data.map((d) => d.y));
	const xScale = scaleLinear({
		domain: [minX * 0.9, maxX * 1.1],
		range: [0, innerWidth],
		nice: true,
	});
	const yScale = scaleLinear({
		domain: [minY * 0.9, maxY * 1.1],
		range: [innerHeight, 0],
		nice: true,
	});

	return (
		<svg width={width} height={height} role="img">
			<title>Scatter chart</title>
			<Group left={margin.left} top={margin.top}>
				{showGrid && (
					<>
						<GridRows
							scale={yScale}
							width={innerWidth}
							stroke={chartColors.grid}
							strokeOpacity={0.5}
						/>
						<GridColumns
							scale={xScale}
							height={innerHeight}
							stroke={chartColors.grid}
							strokeOpacity={0.5}
						/>
					</>
				)}
				{data.map((d, i) => (
					<circle
						key={d.label ?? i}
						cx={xScale(d.x)}
						cy={yScale(d.y)}
						r={d.size ?? 5}
						fill={color}
						fillOpacity={0.7}
						stroke={color}
						strokeWidth={1}
						style={{ cursor: "pointer" }}
						onMouseEnter={() => onHover?.(d, xScale(d.x) + margin.left, yScale(d.y) + margin.top)}
						onMouseLeave={() => onLeave?.()}
					/>
				))}
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

export const ScatterChart = forwardRef<HTMLDivElement, ScatterChartProps>(
	(
		{
			className,
			data,
			title,
			loading = false,
			height = 300,
			showGrid,
			showTable = false,
			color,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			data: ScatterPoint;
			left: number;
			top: number;
		} | null>(null);

		if (loading)
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
		if (data.length === 0)
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
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div
					role="img"
					aria-label={`${title}: scatter chart with ${data.length} points`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<ScatterInner
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
						{tooltip.data.label && <div className="font-medium">{tooltip.data.label}</div>}
						<div>
							x: {fmt(tooltip.data.x)}, y: {fmt(tooltip.data.y)}
						</div>
					</ChartTooltip>
				)}
				{showTable && (
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>X</th>
								<th>Y</th>
								<th>Label</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d, i) => (
								<tr key={d.label ?? i}>
									<td>{d.x}</td>
									<td>{d.y}</td>
									<td>{d.label ?? ""}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	},
);

ScatterChart.displayName = "ScatterChart";
