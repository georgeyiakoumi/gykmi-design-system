"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scalePoint } from "@visx/scale";
import { AreaClosed, LinePath } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { type ConfidencePoint, chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { cn } from "../lib/cn";

export interface ConfidenceChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Data points with value + confidence range (low/high) */
	data: ConfidencePoint[];
	/** Chart title for accessibility */
	title: string;
	/** Label for the confidence band in the legend */
	bandLabel?: string;
	/** Whether the chart is loading */
	loading?: boolean;
	/** Custom height */
	height?: number;
	/** Show grid lines */
	showGrid?: boolean;
	/** Show accessible data table fallback */
	showTable?: boolean;
	/** Show dashed line for estimated/projected values */
	estimatedAfter?: number;
}

function ConfidenceChartInner({
	data,
	width,
	height,
	showGrid = true,
	estimatedAfter,
}: {
	data: ConfidencePoint[];
	width: number;
	height: number;
	showGrid?: boolean;
	estimatedAfter?: number;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);

	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const allValues = data.flatMap((d) => [d.low, d.high, d.value]);
	const minY = Math.min(...allValues) * 0.95;
	const maxY = Math.max(...allValues) * 1.05;

	const xScale = scalePoint({
		domain: data.map((d) => d.date),
		range: [0, innerWidth],
		padding: 0.5,
	});

	const yScale = scaleLinear({
		domain: [minY, maxY],
		range: [innerHeight, 0],
		nice: true,
	});

	const splitIndex = estimatedAfter !== undefined ? estimatedAfter : data.length;
	const actualData = data.slice(0, splitIndex);
	const estimatedData = splitIndex < data.length ? data.slice(splitIndex - 1) : [];

	return (
		<svg width={width} height={height} role="img">
			<title>Confidence chart</title>
			<Group left={margin.left} top={margin.top}>
				{showGrid && (
					<GridRows
						scale={yScale}
						width={innerWidth}
						stroke={chartColors.grid}
						strokeOpacity={0.5}
					/>
				)}

				{/* Confidence band */}
				<AreaClosed
					data={data}
					x={(d) => xScale(d.date) ?? 0}
					y0={(d) => yScale(d.low)}
					y1={(d) => yScale(d.high)}
					yScale={yScale}
					curve={curveMonotoneX}
					fill={chartColors.confidence.band}
					fillOpacity={chartColors.confidence.bandOpacity}
				/>

				{/* Upper and lower confidence bounds */}
				<LinePath
					data={data}
					x={(d) => xScale(d.date) ?? 0}
					y={(d) => yScale(d.high)}
					stroke={chartColors.confidence.band}
					strokeWidth={1}
					strokeOpacity={0.3}
					strokeDasharray="4,4"
					curve={curveMonotoneX}
				/>
				<LinePath
					data={data}
					x={(d) => xScale(d.date) ?? 0}
					y={(d) => yScale(d.low)}
					stroke={chartColors.confidence.band}
					strokeWidth={1}
					strokeOpacity={0.3}
					strokeDasharray="4,4"
					curve={curveMonotoneX}
				/>

				{/* Actual value line (solid) */}
				{actualData.length > 1 && (
					<LinePath
						data={actualData}
						x={(d) => xScale(d.date) ?? 0}
						y={(d) => yScale(d.value)}
						stroke={chartColors.primary}
						strokeWidth={2}
						curve={curveMonotoneX}
					/>
				)}

				{/* Estimated value line (dashed) */}
				{estimatedData.length > 1 && (
					<LinePath
						data={estimatedData}
						x={(d) => xScale(d.date) ?? 0}
						y={(d) => yScale(d.value)}
						stroke={chartColors.primary}
						strokeWidth={2}
						strokeDasharray="6,4"
						curve={curveMonotoneX}
					/>
				)}

				{/* Data points */}
				{data.map((d, i) => (
					<circle
						key={d.date}
						cx={xScale(d.date) ?? 0}
						cy={yScale(d.value)}
						r={3}
						fill={i >= splitIndex ? chartColors.background : chartColors.primary}
						stroke={chartColors.primary}
						strokeWidth={i >= splitIndex ? 1.5 : 0}
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

export const ConfidenceChart = forwardRef<HTMLDivElement, ConfidenceChartProps>(
	(
		{
			className,
			data,
			title,
			bandLabel = "Confidence range",
			loading = false,
			height = 300,
			showGrid = true,
			showTable = false,
			estimatedAfter,
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
					aria-label={`${title}: confidence chart with ${data.length} data points showing value with ${bandLabel}`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<ConfidenceChartInner
								data={data}
								width={w}
								height={height}
								showGrid={showGrid}
								estimatedAfter={estimatedAfter}
							/>
						)}
					</ParentSize>
				</div>

				{/* Legend */}
				<div className="mt-2 flex items-center gap-4 text-xs text-text-muted">
					<span className="flex items-center gap-1">
						<span
							className="inline-block h-0.5 w-4"
							style={{ backgroundColor: chartColors.primary }}
						/>
						Actual
					</span>
					{estimatedAfter !== undefined && (
						<span className="flex items-center gap-1">
							<span
								className="inline-block h-0.5 w-4 border-t border-dashed"
								style={{ borderColor: chartColors.primary }}
							/>
							Estimated
						</span>
					)}
					<span className="flex items-center gap-1">
						<span
							className="inline-block h-3 w-4 rounded-sm"
							style={{
								backgroundColor: chartColors.confidence.band,
								opacity: chartColors.confidence.bandOpacity,
							}}
						/>
						{bandLabel}
					</span>
				</div>

				{showTable && (
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Date</th>
								<th>Value</th>
								<th>Low</th>
								<th>High</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr key={d.date}>
									<td>{d.date}</td>
									<td>{d.value}</td>
									<td>{d.low}</td>
									<td>{d.high}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	},
);

ConfidenceChart.displayName = "ConfidenceChart";
