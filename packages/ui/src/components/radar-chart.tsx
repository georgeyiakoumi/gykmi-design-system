"use client";

import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors, chartFont } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { cn } from "../lib/cn";

export interface RadarPoint {
	axis: string;
	value: number;
}

export interface RadarChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: RadarPoint[];
	title: string;
	max?: number;
	levels?: number;
	loading?: boolean;
	height?: number;
	showTable?: boolean;
	color?: string;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function RadarInner({
	data,
	width,
	height,
	max = 100,
	levels = 5,
	color = chartColors.primary,
	onHover,
	onLeave,
}: {
	data: RadarPoint[];
	width: number;
	height: number;
	max?: number;
	levels?: number;
	color?: string;
	onHover?: (d: RadarPoint, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const radius = Math.min(width, height) / 2 - 30;
	const centerX = width / 2;
	const centerY = height / 2;
	if (radius <= 0) return null;

	const angleSlice = (2 * Math.PI) / data.length;
	const rScale = scaleLinear({ domain: [0, max], range: [0, radius] });

	const getPoint = (value: number, index: number) => {
		const angle = angleSlice * index - Math.PI / 2;
		return { x: rScale(value) * Math.cos(angle), y: rScale(value) * Math.sin(angle) };
	};

	const pathData = data.map((d, i) => getPoint(d.value, i));
	const pathString = `${pathData.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} Z`;

	return (
		<svg width={width} height={height} role="img">
			<title>Radar chart</title>
			<Group top={centerY} left={centerX}>
				{/* Grid levels */}
				{Array.from({ length: levels }, (_, i) => {
					const r = (radius / levels) * (i + 1);
					const points = data.map((_, j) => {
						const angle = angleSlice * j - Math.PI / 2;
						return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
					});
					return (
						<polygon
							// biome-ignore lint/suspicious/noArrayIndexKey: grid levels have no semantic key
							key={`level-${i}`}
							points={points.join(" ")}
							fill="none"
							stroke={chartColors.grid}
							strokeOpacity={0.3}
						/>
					);
				})}
				{/* Axis lines */}
				{data.map((d, i) => {
					const p = getPoint(max, i);
					return (
						<line
							key={d.axis}
							x1={0}
							y1={0}
							x2={p.x}
							y2={p.y}
							stroke={chartColors.grid}
							strokeOpacity={0.3}
						/>
					);
				})}
				{/* Data area */}
				<path d={pathString} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={2} />
				{/* Data points */}
				{pathData.map((p, i) => (
					<circle key={data[i].axis} cx={p.x} cy={p.y} r={3} fill={color} />
				))}
				{/* Invisible hover targets */}
				{pathData.map((p, i) => (
					<circle
						key={`hover-${data[i].axis}`}
						cx={p.x}
						cy={p.y}
						r={10}
						fill="transparent"
						style={{ cursor: "pointer" }}
						onMouseEnter={() => onHover?.(data[i], p.x + centerX, p.y + centerY)}
						onMouseLeave={() => onLeave?.()}
					/>
				))}
				{/* Labels */}
				{data.map((d, i) => {
					const labelPoint = getPoint(max * 1.15, i);
					return (
						<text
							key={d.axis}
							x={labelPoint.x}
							y={labelPoint.y}
							dy="0.35em"
							textAnchor="middle"
							fontSize={chartFont.size.tick}
							fill={chartColors.textMuted}
						>
							{d.axis}
						</text>
					);
				})}
			</Group>
		</svg>
	);
}

export const RadarChart = forwardRef<HTMLDivElement, RadarChartProps>(
	(
		{
			className,
			data,
			title,
			max,
			levels,
			loading = false,
			height = 300,
			showTable = false,
			color,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			data: RadarPoint;
			left: number;
			top: number;
		} | null>(null);
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());
		if (loading)
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
		if (data.length < 3)
			return (
				<div
					ref={ref}
					className={cn(
						"flex items-center justify-center rounded-lg border border-border text-text-muted",
						className,
					)}
					style={{ height }}
					role="img"
					aria-label={`${title} — insufficient data`}
					{...props}
				>
					Need at least 3 axes
				</div>
			);
		return (
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div
					role="img"
					aria-label={`${title}: radar chart with ${data.length} axes`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<RadarInner
								data={data}
								width={w}
								height={height}
								max={max}
								levels={levels}
								color={color}
								onHover={(d, left, top) => setTooltip({ data: d, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">{tooltip.data.axis}</div>
						<div>{fmt(tooltip.data.value)}</div>
					</ChartTooltip>
				)}
				{showTable && (
					<table className="sr-only" aria-label={`${title} data`}>
						<thead>
							<tr>
								<th>Axis</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr key={d.axis}>
									<td>{d.axis}</td>
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

RadarChart.displayName = "RadarChart";
