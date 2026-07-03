"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../../lib/chart-container";
import { chartColors, chartFont, chartSpacing } from "../../lib/chart-tokens";
import { minMax } from "../../lib/chart-utils";

export interface CandlestickPoint {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
}

export interface CandlestickChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: CandlestickPoint[];
	title: string;
	loading?: boolean;
	height?: number;
	showGrid?: boolean;
	showTable?: boolean;
	upColor?: string;
	downColor?: string;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function CandlestickInner({
	data,
	width,
	height,
	showGrid = true,
	upColor = chartColors.success,
	downColor = chartColors.danger,
	onHover,
	onLeave,
	onFocus,
	onBlur,
}: {
	data: CandlestickPoint[];
	width: number;
	height: number;
	showGrid?: boolean;
	upColor?: string;
	downColor?: string;
	onHover?: (d: CandlestickPoint, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (d: CandlestickPoint, left: number, top: number) => void;
	onBlur?: () => void;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const xScale = scaleBand({
		domain: data.map((d) => d.date),
		range: [0, innerWidth],
		padding: 0.3,
	});
	const allPrices = data.flatMap((d) => [d.high, d.low]);
	const [minPrice, maxPrice] = minMax(allPrices);
	const yScale = scaleLinear({
		domain: [minPrice * 0.98, maxPrice * 1.02],
		range: [innerHeight, 0],
		nice: true,
	});

	return (
		<svg width={width} height={height} role="img">
			<title>Candlestick chart</title>
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
					const isUp = d.close >= d.open;
					const color = isUp ? upColor : downColor;
					const bodyTop = yScale(Math.max(d.open, d.close));
					const bodyBottom = yScale(Math.min(d.open, d.close));
					const bodyHeight = Math.max(1, bodyBottom - bodyTop);
					const x = (xScale(d.date) ?? 0) + xScale.bandwidth() / 2;
					return (
						<g
							key={d.date}
							tabIndex={0}
							style={{ cursor: "pointer" }}
							onMouseEnter={() => onHover?.(d, x + margin.left, bodyTop + margin.top)}
							onMouseLeave={() => onLeave?.()}
							onFocus={() => onFocus?.(d, x + margin.left, bodyTop + margin.top)}
							onBlur={() => onBlur?.()}
						>
							<line
								x1={x}
								x2={x}
								y1={yScale(d.high)}
								y2={yScale(d.low)}
								stroke={color}
								strokeWidth={1}
							/>
							<rect
								x={xScale(d.date) ?? 0}
								y={bodyTop}
								width={xScale.bandwidth()}
								height={bodyHeight}
								fill={color}
								rx={1}
							/>
						</g>
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

export const CandlestickChart = forwardRef<HTMLDivElement, CandlestickChartProps>(
	(
		{
			className,
			data,
			title,
			loading = false,
			height = 300,
			showGrid,
			showTable = false,
			upColor,
			downColor,
			formatValue,
			...props
		},
		ref,
	) => {
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<CandlestickPoint>
				title={title}
				ariaDescription={`candlestick chart with ${data.length} data points`}
				loading={loading}
				height={height}
				isEmpty={data.length === 0}
				showTable={showTable}
				tableContent={
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Date</th>
								<th>Open</th>
								<th>High</th>
								<th>Low</th>
								<th>Close</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr key={d.date}>
									<td>{d.date}</td>
									<td>{d.open}</td>
									<td>{d.high}</td>
									<td>{d.low}</td>
									<td>{d.close}</td>
								</tr>
							))}
						</tbody>
					</table>
				}
				renderTooltip={(d) => (
					<>
						<div className="font-medium">{d.date}</div>
						<div>
							O: {fmt(d.open)} H: {fmt(d.high)}
						</div>
						<div>
							L: {fmt(d.low)} C: {fmt(d.close)}
						</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<CandlestickInner
						data={data}
						width={width}
						height={h}
						showGrid={showGrid}
						upColor={upColor}
						downColor={downColor}
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

CandlestickChart.displayName = "CandlestickChart";
