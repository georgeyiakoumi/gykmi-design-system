"use client";

import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { minMax } from "../lib/chart-utils";
import { cn } from "../lib/cn";

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
}: {
	data: HeatmapRow[];
	columnLabels?: string[];
	width: number;
	height: number;
	colorFrom?: string;
	colorTo?: string;
	onHover?: (row: string, col: string, count: number, left: number, top: number) => void;
	onLeave?: () => void;
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
		const [tooltip, setTooltip] = useState<{
			row: string;
			col: string;
			count: number;
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
				<div role="img" aria-label={`${title}: heatmap chart`} style={{ height }}>
					<ParentSize>
						{({ width: w }) => (
							<HeatmapInner
								data={data}
								columnLabels={columnLabels}
								width={w}
								height={height}
								colorFrom={colorFrom}
								colorTo={colorTo}
								onHover={(row, col, count, left, top) => setTooltip({ row, col, count, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">
							{tooltip.row} / {tooltip.col}
						</div>
						<div>{fmt(tooltip.count)}</div>
					</ChartTooltip>
				)}
				{showTable && (
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
				)}
			</div>
		);
	},
);

HeatmapChart.displayName = "HeatmapChart";
