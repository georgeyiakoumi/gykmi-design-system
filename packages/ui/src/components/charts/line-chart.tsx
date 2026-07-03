"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";
import { AreaClosed, LinePath } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../../lib/chart-container";
import { chartColors, chartFont, chartSpacing, type TimeSeriesPoint } from "../../lib/chart-tokens";
import { minMax } from "../../lib/chart-utils";

export interface LineChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Chart data points */
	data: TimeSeriesPoint[];
	/** Whether to show filled area under the line */
	showArea?: boolean;
	/** Chart title for accessibility */
	title: string;
	/** Whether the chart is loading */
	loading?: boolean;
	/** Custom height */
	height?: number;
	/** Show grid lines */
	showGrid?: boolean;
	/** Show accessible data table fallback */
	showTable?: boolean;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function LineChartInner({
	data,
	width,
	height,
	showArea = false,
	showGrid = true,
	onHover,
	onLeave,
	onFocus,
	onBlur,
}: {
	data: TimeSeriesPoint[];
	width: number;
	height: number;
	showArea?: boolean;
	showGrid?: boolean;
	onHover?: (d: TimeSeriesPoint, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (d: TimeSeriesPoint, left: number, top: number) => void;
	onBlur?: () => void;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);

	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const xScale = scalePoint({
		domain: data.map((d) => d.date),
		range: [0, innerWidth],
		padding: 0.5,
	});

	const [minVal, maxVal] = minMax(data.map((d) => d.value));
	const yScale = scaleLinear({
		domain: [minVal * 0.9, maxVal * 1.1],
		range: [innerHeight, 0],
		nice: true,
	});

	return (
		<svg width={width} height={height} role="img">
			<title>Line chart</title>
			<Group left={margin.left} top={margin.top}>
				{showGrid && (
					<GridRows
						scale={yScale}
						width={innerWidth}
						stroke={chartColors.grid}
						strokeOpacity={0.5}
					/>
				)}
				{showArea && (
					<AreaClosed
						data={data}
						x={(d) => xScale(d.date) ?? 0}
						y={(d) => yScale(d.value)}
						yScale={yScale}
						curve={curveMonotoneX}
						fill={chartColors.primary}
						fillOpacity={0.1}
					/>
				)}
				<LinePath
					data={data}
					x={(d) => xScale(d.date) ?? 0}
					y={(d) => yScale(d.value)}
					stroke={chartColors.primary}
					strokeWidth={2}
					curve={curveMonotoneX}
				/>
				{data.map((d) => (
					<circle
						key={d.date}
						cx={xScale(d.date) ?? 0}
						cy={yScale(d.value)}
						r={5}
						fill={chartColors.primary}
						fillOpacity={0.8}
						stroke={chartColors.background}
						strokeWidth={2}
						tabIndex={0}
						style={{ cursor: "pointer" }}
						onMouseEnter={() =>
							onHover?.(d, (xScale(d.date) ?? 0) + margin.left, yScale(d.value) + margin.top)
						}
						onMouseLeave={() => onLeave?.()}
						onFocus={() =>
							onFocus?.(d, (xScale(d.date) ?? 0) + margin.left, yScale(d.value) + margin.top)
						}
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

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
	(
		{
			className,
			data,
			showArea = false,
			title,
			loading = false,
			height = 300,
			showGrid = true,
			showTable = false,
			formatValue,
			...props
		},
		ref,
	) => {
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<TimeSeriesPoint>
				title={title}
				ariaDescription={`line chart with ${data.length} data points`}
				loading={loading}
				height={height}
				isEmpty={data.length === 0}
				showTable={showTable}
				tableContent={
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Date</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr key={d.date}>
									<td>{d.date}</td>
									<td>{d.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				}
				renderTooltip={(d) => (
					<>
						<div className="font-medium">{d.date}</div>
						<div>{fmt(d.value)}</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<LineChartInner
						data={data}
						width={width}
						height={h}
						showArea={showArea}
						showGrid={showGrid}
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

LineChart.displayName = "LineChart";
