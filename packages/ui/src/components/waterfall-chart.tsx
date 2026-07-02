"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { cn } from "../lib/cn";

export interface WaterfallItem {
	label: string;
	value: number;
	isTotal?: boolean;
}

export interface WaterfallChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: WaterfallItem[];
	title: string;
	loading?: boolean;
	height?: number;
	showGrid?: boolean;
	showTable?: boolean;
	positiveColor?: string;
	negativeColor?: string;
	totalColor?: string;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function WaterfallInner({
	data,
	width,
	height,
	showGrid = true,
	positiveColor = chartColors.success,
	negativeColor = chartColors.danger,
	totalColor = chartColors.primary,
	onHover,
	onLeave,
}: {
	data: WaterfallItem[];
	width: number;
	height: number;
	showGrid?: boolean;
	positiveColor?: string;
	negativeColor?: string;
	totalColor?: string;
	onHover?: (d: WaterfallItem, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0) return null;

	let running = 0;
	const cumulative = data.map((d) => {
		if (d.isTotal) return { ...d, start: 0, end: running };
		const start = running;
		running += d.value;
		return { ...d, start, end: running };
	});

	const allValues = cumulative.flatMap((d) => [d.start, d.end]);
	const xScale = scaleBand({
		domain: data.map((d) => d.label),
		range: [0, innerWidth],
		padding: 0.3,
	});
	const yScale = scaleLinear({
		domain: [Math.min(0, ...allValues) * 1.1, Math.max(...allValues) * 1.1],
		range: [innerHeight, 0],
		nice: true,
	});

	return (
		<svg width={width} height={height} role="img">
			<title>Waterfall chart</title>
			<Group left={margin.left} top={margin.top}>
				{showGrid && (
					<GridRows
						scale={yScale}
						width={innerWidth}
						stroke={chartColors.grid}
						strokeOpacity={0.5}
					/>
				)}
				{cumulative.map((d) => {
					const top = yScale(Math.max(d.start, d.end));
					const bottom = yScale(Math.min(d.start, d.end));
					const barHeight = Math.max(1, bottom - top);
					const color = d.isTotal ? totalColor : d.value >= 0 ? positiveColor : negativeColor;
					const barX = xScale(d.label) ?? 0;
					return (
						<rect
							key={d.label}
							x={barX}
							y={top}
							width={xScale.bandwidth()}
							height={barHeight}
							fill={color}
							rx={2}
							style={{ cursor: "pointer" }}
							onMouseEnter={() =>
								onHover?.(d, barX + xScale.bandwidth() / 2 + margin.left, top + margin.top)
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

export const WaterfallChart = forwardRef<HTMLDivElement, WaterfallChartProps>(
	(
		{
			className,
			data,
			title,
			loading = false,
			height = 300,
			showGrid,
			showTable = false,
			positiveColor,
			negativeColor,
			totalColor,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			data: WaterfallItem;
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
					aria-label={`${title}: waterfall chart with ${data.length} items`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<WaterfallInner
								data={data}
								width={w}
								height={height}
								showGrid={showGrid}
								positiveColor={positiveColor}
								negativeColor={negativeColor}
								totalColor={totalColor}
								onHover={(d, left, top) => setTooltip({ data: d, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">{tooltip.data.label}</div>
						<div>
							{tooltip.data.isTotal ? "Total" : tooltip.data.value >= 0 ? "+" : ""}
							{fmt(tooltip.data.value)}
						</div>
					</ChartTooltip>
				)}
				{showTable && (
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Label</th>
								<th>Value</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr key={d.label}>
									<td>{d.label}</td>
									<td>{d.value}</td>
									<td>{d.isTotal ? "Total" : d.value >= 0 ? "Increase" : "Decrease"}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	},
);

WaterfallChart.displayName = "WaterfallChart";
