"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scalePoint } from "@visx/scale";
import { AreaClosed, LinePath } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { chartColors, chartFont, chartSpacing, type TimeSeriesPoint } from "../lib/chart-tokens";
import { cn } from "../lib/cn";

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
}

function LineChartInner({
	data,
	width,
	height,
	showArea = false,
	showGrid = true,
}: {
	data: TimeSeriesPoint[];
	width: number;
	height: number;
	showArea?: boolean;
	showGrid?: boolean;
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

	const yScale = scaleLinear({
		domain: [
			Math.min(...data.map((d) => d.value)) * 0.9,
			Math.max(...data.map((d) => d.value)) * 1.1,
		],
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
						r={3}
						fill={chartColors.primary}
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
			...props
		},
		ref,
	) => {
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

		return (
			<div ref={ref} className={cn("w-full", className)} {...props}>
				<div
					role="img"
					aria-label={`${title}: line chart with ${data.length} data points`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<LineChartInner
								data={data}
								width={w}
								height={height}
								showArea={showArea}
								showGrid={showGrid}
							/>
						)}
					</ParentSize>
				</div>
				{showTable && (
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
				)}
			</div>
		);
	},
);

LineChart.displayName = "LineChart";
