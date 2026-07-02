"use client";

import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleOrdinal } from "@visx/scale";
import { Pie } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { type ChartDataPoint, chartColors, chartFont } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { cn } from "../lib/cn";

const defaultPalette = [
	chartColors.primary,
	chartColors.secondary,
	chartColors.tertiary,
	chartColors.quaternary,
	chartColors.danger,
	chartColors.muted,
];

export interface DonutChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: ChartDataPoint[];
	title: string;
	loading?: boolean;
	height?: number;
	innerRadiusRatio?: number;
	showLabels?: boolean;
	showTable?: boolean;
	colors?: string[];
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function DonutChartInner({
	data,
	width,
	height,
	innerRadiusRatio = 0.6,
	showLabels = true,
	colors = defaultPalette,
	onHover,
	onLeave,
}: {
	data: ChartDataPoint[];
	width: number;
	height: number;
	innerRadiusRatio?: number;
	showLabels?: boolean;
	colors?: string[];
	onHover?: (d: ChartDataPoint, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const radius = Math.min(width, height) / 2;
	const innerRadius = radius * innerRadiusRatio;
	const centerX = width / 2;
	const centerY = height / 2;

	const colorScale = scaleOrdinal({
		domain: data.map((d) => d.label),
		range: colors,
	});

	const total = data.reduce((sum, d) => sum + d.value, 0);

	return (
		<svg width={width} height={height} role="img">
			<title>Donut chart</title>
			<Group top={centerY} left={centerX}>
				<Pie
					data={data}
					pieValue={(d) => d.value}
					outerRadius={radius}
					innerRadius={innerRadius}
					padAngle={0.02}
				>
					{(pie) =>
						pie.arcs.map((arc) => {
							const [centroidX, centroidY] = pie.path.centroid(arc);
							const pct = ((arc.data.value / total) * 100).toFixed(0);
							return (
								<g
									key={arc.data.label}
									style={{ cursor: "pointer" }}
									onMouseEnter={() => onHover?.(arc.data, centroidX + centerX, centroidY + centerY)}
									onMouseLeave={() => onLeave?.()}
								>
									<path d={pie.path(arc) ?? ""} fill={colorScale(arc.data.label)} />
									{showLabels && (
										<text
											x={centroidX}
											y={centroidY}
											dy=".33em"
											fill="white"
											fontSize={chartFont.size.tick}
											textAnchor="middle"
											pointerEvents="none"
										>
											{pct}%
										</text>
									)}
								</g>
							);
						})
					}
				</Pie>
			</Group>
		</svg>
	);
}

export const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(
	(
		{
			className,
			data,
			title,
			loading = false,
			height = 300,
			innerRadiusRatio,
			showLabels,
			showTable = false,
			colors,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			data: ChartDataPoint;
			left: number;
			top: number;
		} | null>(null);

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
		const total = data.reduce((sum, d) => sum + d.value, 0);
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div
					role="img"
					aria-label={`${title}: donut chart with ${data.length} segments`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<DonutChartInner
								data={data}
								width={w}
								height={height}
								innerRadiusRatio={innerRadiusRatio}
								showLabels={showLabels}
								colors={colors}
								onHover={(d, left, top) => setTooltip({ data: d, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">{tooltip.data.label}</div>
						<div>
							{fmt(tooltip.data.value)} ({((tooltip.data.value / total) * 100).toFixed(0)}%)
						</div>
					</ChartTooltip>
				)}
				{showTable && (
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
				)}
			</div>
		);
	},
);

DonutChart.displayName = "DonutChart";
