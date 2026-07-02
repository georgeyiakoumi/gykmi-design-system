"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../lib/chart-container";
import { chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { minMax } from "../lib/chart-utils";

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
	onFocus,
	onBlur,
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
	onFocus?: (d: WaterfallItem, left: number, top: number) => void;
	onBlur?: () => void;
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
	const [minCum, maxCum] = minMax([0, ...allValues]);
	const xScale = scaleBand({
		domain: data.map((d) => d.label),
		range: [0, innerWidth],
		padding: 0.3,
	});
	const yScale = scaleLinear({
		domain: [minCum * 1.1, maxCum * 1.1],
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
							tabIndex={0}
							style={{ cursor: "pointer" }}
							onMouseEnter={() =>
								onHover?.(d, barX + xScale.bandwidth() / 2 + margin.left, top + margin.top)
							}
							onMouseLeave={() => onLeave?.()}
							onFocus={() =>
								onFocus?.(d, barX + xScale.bandwidth() / 2 + margin.left, top + margin.top)
							}
							onBlur={() => onBlur?.()}
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
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<WaterfallItem>
				title={title}
				ariaDescription={`waterfall chart with ${data.length} items`}
				loading={loading}
				height={height}
				isEmpty={data.length === 0}
				showTable={showTable}
				tableContent={
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
				}
				renderTooltip={(d) => (
					<>
						<div className="font-medium">{d.label}</div>
						<div>
							{d.isTotal ? "Total" : d.value >= 0 ? "+" : ""}
							{fmt(d.value)}
						</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<WaterfallInner
						data={data}
						width={width}
						height={h}
						showGrid={showGrid}
						positiveColor={positiveColor}
						negativeColor={negativeColor}
						totalColor={totalColor}
						onHover={onHover}
						onLeave={onLeave}
						onFocus={onFocus}
						onBlur={onBlur}
					/>
				)}
			</ChartContainer>
		);
	},
);

WaterfallChart.displayName = "WaterfallChart";
