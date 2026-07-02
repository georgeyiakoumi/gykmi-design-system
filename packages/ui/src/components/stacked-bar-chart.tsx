"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors, chartFont, chartSpacing } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { minMax } from "../lib/chart-utils";
import { cn } from "../lib/cn";

const defaultPalette = [
	chartColors.primary,
	chartColors.secondary,
	chartColors.tertiary,
	chartColors.quaternary,
];

export interface StackedBarChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: Record<string, string | number>[];
	keys: string[];
	indexKey: string;
	title: string;
	loading?: boolean;
	height?: number;
	showGrid?: boolean;
	showTable?: boolean;
	colors?: string[];
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function StackedBarInner({
	data,
	keys,
	indexKey,
	width,
	height,
	showGrid = true,
	colors = defaultPalette,
	onHover,
	onLeave,
}: {
	data: Record<string, string | number>[];
	keys: string[];
	indexKey: string;
	width: number;
	height: number;
	showGrid?: boolean;
	colors?: string[];
	onHover?: (key: string, value: number, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const margin = chartSpacing.margin;
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const xScale = scaleBand({
		domain: data.map((d) => String(d[indexKey])),
		range: [0, innerWidth],
		padding: 0.3,
	});
	const totals = data.map((d) => keys.reduce((sum, k) => sum + (Number(d[k]) || 0), 0));
	const [, maxTotal] = minMax(totals);
	const yScale = scaleLinear({
		domain: [0, maxTotal * 1.1],
		range: [innerHeight, 0],
		nice: true,
	});
	const colorScale = scaleOrdinal({ domain: keys, range: colors });

	return (
		<svg width={width} height={height} role="img">
			<title>Stacked bar chart</title>
			<Group left={margin.left} top={margin.top}>
				{showGrid && (
					<GridRows
						scale={yScale}
						width={innerWidth}
						stroke={chartColors.grid}
						strokeOpacity={0.5}
					/>
				)}
				<BarStack
					data={data}
					keys={keys}
					// biome-ignore lint/suspicious/noExplicitAny: visx passes original datum to x accessor
					x={(d: any) => String(d[indexKey])}
					xScale={xScale}
					yScale={yScale}
					color={colorScale}
				>
					{(barStacks) =>
						barStacks.map((barStack) =>
							barStack.bars.map((bar) => (
								<rect
									key={`${barStack.index}-${bar.index}`}
									x={bar.x}
									y={bar.y}
									width={bar.width}
									height={bar.height}
									fill={bar.color}
									rx={2}
									style={{ cursor: "pointer" }}
									onMouseEnter={() =>
										onHover?.(
											barStack.key,
											Number(bar.bar.data[barStack.key]) || 0,
											bar.x + bar.width / 2 + margin.left,
											bar.y + margin.top,
										)
									}
									onMouseLeave={() => onLeave?.()}
								/>
							)),
						)
					}
				</BarStack>
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

export const StackedBarChart = forwardRef<HTMLDivElement, StackedBarChartProps>(
	(
		{
			className,
			data,
			keys,
			indexKey,
			title,
			loading = false,
			height = 300,
			showGrid,
			showTable = false,
			colors,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			key: string;
			value: number;
			left: number;
			top: number;
		} | null>(null);
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());
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
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div role="img" aria-label={`${title}: stacked bar chart`} style={{ height }}>
					<ParentSize>
						{({ width: w }) => (
							<StackedBarInner
								data={data}
								keys={keys}
								indexKey={indexKey}
								width={w}
								height={height}
								showGrid={showGrid}
								colors={colors}
								onHover={(key, value, left, top) => setTooltip({ key, value, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">{tooltip.key}</div>
						<div>{fmt(tooltip.value)}</div>
					</ChartTooltip>
				)}
				{showTable && (
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>{indexKey}</th>
								{keys.map((k) => (
									<th key={k}>{k}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((d, i) => (
								<tr key={String(d[indexKey]) || i}>
									<td>{String(d[indexKey])}</td>
									{keys.map((k) => (
										<td key={k}>{String(d[k])}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	},
);

StackedBarChart.displayName = "StackedBarChart";
