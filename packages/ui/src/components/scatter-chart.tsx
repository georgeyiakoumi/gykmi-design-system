"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../lib/chart-container";
import { chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { minMax } from "../lib/chart-utils";

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
	onFocus,
	onBlur,
}: {
	data: ScatterPoint[];
	width: number;
	height: number;
	showGrid?: boolean;
	color?: string;
	onHover?: (d: ScatterPoint, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (d: ScatterPoint, left: number, top: number) => void;
	onBlur?: () => void;
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
						tabIndex={0}
						style={{ cursor: "pointer" }}
						onMouseEnter={() => onHover?.(d, xScale(d.x) + margin.left, yScale(d.y) + margin.top)}
						onMouseLeave={() => onLeave?.()}
						onFocus={() => onFocus?.(d, xScale(d.x) + margin.left, yScale(d.y) + margin.top)}
						onBlur={() => onBlur?.()}
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
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<ScatterPoint>
				title={title}
				ariaDescription={`scatter chart with ${data.length} points`}
				loading={loading}
				height={height}
				isEmpty={data.length === 0}
				showTable={showTable}
				tableContent={
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
				}
				renderTooltip={(d) => (
					<>
						{d.label && <div className="font-medium">{d.label}</div>}
						<div>
							x: {fmt(d.x)}, y: {fmt(d.y)}
						</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<ScatterInner
						data={data}
						width={width}
						height={h}
						showGrid={showGrid}
						color={color}
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

ScatterChart.displayName = "ScatterChart";
