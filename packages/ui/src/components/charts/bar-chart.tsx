"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../../lib/chart-container";
import { type ChartDataPoint, chartColors, chartFont, chartSpacing } from "../../lib/chart-tokens";
import { minMax } from "../../lib/chart-utils";

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
	onFocus,
	onBlur,
}: {
	data: ChartDataPoint[];
	width: number;
	height: number;
	showGrid?: boolean;
	color?: string;
	onHover?: (d: ChartDataPoint, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (d: ChartDataPoint, left: number, top: number) => void;
	onBlur?: () => void;
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
							tabIndex={0}
							style={{ cursor: "pointer" }}
							onMouseEnter={() =>
								onHover?.(d, barX + barWidth / 2 + margin.left, barY + margin.top)
							}
							onMouseLeave={() => onLeave?.()}
							onFocus={() => onFocus?.(d, barX + barWidth / 2 + margin.left, barY + margin.top)}
							onBlur={() => onBlur?.()}
						/>
					);
				})}
				<AxisBottom
					top={innerHeight}
					scale={xScale}
					stroke={chartColors.grid}
					tickStroke={chartColors.grid}
					tickFormat={(label) => {
						const maxChars = Math.max(4, Math.floor(xScale.bandwidth() / 6));
						return label.length > maxChars ? `${label.slice(0, maxChars - 1)}…` : label;
					}}
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
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<ChartDataPoint>
				title={title}
				ariaDescription={`bar chart with ${data.length} data points`}
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
				}
				renderTooltip={(d) => (
					<>
						<div className="font-medium">{d.label}</div>
						<div>{fmt(d.value)}</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<BarChartInner
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

BarChart.displayName = "BarChart";
