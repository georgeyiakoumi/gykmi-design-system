"use client";

import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../lib/chart-container";
import { chartColors } from "../lib/chart-tokens";
import { minMax } from "../lib/chart-utils";

export interface HeatmapBin {
	bin: number;
	count: number;
}

export interface HeatmapRow {
	label: string;
	bins: HeatmapBin[];
}

export interface HeatmapChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: HeatmapRow[];
	columnLabels?: string[];
	title: string;
	loading?: boolean;
	height?: number;
	showTable?: boolean;
	colorFrom?: string;
	colorTo?: string;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function HeatmapInner({
	data,
	columnLabels,
	width,
	height,
	colorFrom = "var(--surface-raised, #eef2ff)",
	colorTo = chartColors.primary,
	onHover,
	onLeave,
	onFocus,
	onBlur,
}: {
	data: HeatmapRow[];
	columnLabels?: string[];
	width: number;
	height: number;
	colorFrom?: string;
	colorTo?: string;
	onHover?: (row: string, col: string, count: number, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (row: string, col: string, count: number, left: number, top: number) => void;
	onBlur?: () => void;
}) {
	const margin = { top: 20, right: 20, bottom: 40, left: 60 };
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0 || data.length === 0) return null;

	const [, binCount] = minMax(data.map((d) => d.bins.length));
	const allCounts = data.flatMap((d) => d.bins.map((b) => b.count));
	const [, maxCount] = minMax([...allCounts, 1]);

	const xScale = scaleBand({
		domain: Array.from({ length: binCount }, (_, i) => i),
		range: [0, innerWidth],
		padding: 0.05,
	});
	const yScale = scaleBand({
		domain: data.map((d) => d.label),
		range: [0, innerHeight],
		padding: 0.05,
	});
	const colorScale = scaleLinear({
		domain: [0, maxCount],
		range: [colorFrom, colorTo] as [string, string],
	});

	return (
		<svg width={width} height={height} role="img">
			<title>Heatmap</title>
			<Group left={margin.left} top={margin.top}>
				{data.map((row) => (
					<Group key={row.label} top={yScale(row.label) ?? 0}>
						{row.bins.map((bin) => {
							const cellX = xScale(bin.bin) ?? 0;
							const colLabel = columnLabels?.[bin.bin] ?? String(bin.bin);
							return (
								<rect
									key={bin.bin}
									x={cellX}
									y={0}
									width={xScale.bandwidth()}
									height={yScale.bandwidth()}
									fill={colorScale(bin.count) as string}
									rx={2}
									tabIndex={0}
									style={{ cursor: "pointer" }}
									onMouseEnter={() =>
										onHover?.(
											row.label,
											colLabel,
											bin.count,
											cellX + xScale.bandwidth() / 2 + margin.left,
											(yScale(row.label) ?? 0) + margin.top,
										)
									}
									onMouseLeave={() => onLeave?.()}
									onFocus={() =>
										onFocus?.(
											row.label,
											colLabel,
											bin.count,
											cellX + xScale.bandwidth() / 2 + margin.left,
											(yScale(row.label) ?? 0) + margin.top,
										)
									}
									onBlur={() => onBlur?.()}
								/>
							);
						})}
					</Group>
				))}
				{/* Row labels */}
				{data.map((row) => (
					<text
						key={row.label}
						x={-8}
						y={(yScale(row.label) ?? 0) + yScale.bandwidth() / 2}
						dy="0.33em"
						textAnchor="end"
						fontSize={11}
						fill={chartColors.textMuted}
					>
						{row.label}
					</text>
				))}
				{/* Column labels */}
				{columnLabels?.map((label, i) => (
					<text
						key={label}
						x={(xScale(i) ?? 0) + xScale.bandwidth() / 2}
						y={innerHeight + 16}
						textAnchor="middle"
						fontSize={11}
						fill={chartColors.textMuted}
					>
						{label}
					</text>
				))}
			</Group>
		</svg>
	);
}

export const HeatmapChart = forwardRef<HTMLDivElement, HeatmapChartProps>(
	(
		{
			className,
			data,
			columnLabels,
			title,
			loading = false,
			height = 300,
			showTable = false,
			colorFrom,
			colorTo,
			formatValue,
			...props
		},
		ref,
	) => {
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<{ row: string; col: string; count: number }>
				title={title}
				ariaDescription="heatmap chart"
				loading={loading}
				height={height}
				isEmpty={data.length === 0}
				showTable={showTable}
				tableContent={
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Row</th>
								{columnLabels?.map((l) => (
									<th key={l}>{l}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((row) => (
								<tr key={row.label}>
									<td>{row.label}</td>
									{row.bins.map((b) => (
										<td key={b.bin}>{b.count}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				}
				renderTooltip={(d) => (
					<>
						<div className="font-medium">
							{d.row} / {d.col}
						</div>
						<div>{fmt(d.count)}</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<HeatmapInner
						data={data}
						columnLabels={columnLabels}
						width={width}
						height={h}
						colorFrom={colorFrom}
						colorTo={colorTo}
						onHover={(row, col, count, left, top) => onHover({ row, col, count }, left, top)}
						onLeave={onLeave}
						onFocus={(row, col, count, left, top) => onFocus({ row, col, count }, left, top)}
						onBlur={onBlur}
					/>
				)}
			</ChartContainer>
		);
	},
);

HeatmapChart.displayName = "HeatmapChart";
