"use client";

import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Pie } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../../lib/chart-container";
import { type ChartDataPoint, chartColors, chartFont } from "../../lib/chart-tokens";

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
	onFocus,
	onBlur,
}: {
	data: ChartDataPoint[];
	width: number;
	height: number;
	innerRadiusRatio?: number;
	showLabels?: boolean;
	colors?: string[];
	onHover?: (d: ChartDataPoint, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (d: ChartDataPoint, left: number, top: number) => void;
	onBlur?: () => void;
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
									tabIndex={0}
									style={{ cursor: "pointer" }}
									onMouseEnter={() => onHover?.(arc.data, centroidX + centerX, centroidY + centerY)}
									onMouseLeave={() => onLeave?.()}
									onFocus={() => onFocus?.(arc.data, centroidX + centerX, centroidY + centerY)}
									onBlur={() => onBlur?.()}
								>
									<path d={pie.path(arc) ?? ""} fill={colorScale(arc.data.label)} />
									{showLabels && (
										<text
											x={centroidX}
											y={centroidY}
											dy=".33em"
											fill={chartColors.background}
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
		const total = data.reduce((sum, d) => sum + d.value, 0);
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<ChartDataPoint>
				title={title}
				ariaDescription={`donut chart with ${data.length} segments`}
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
						<div>
							{fmt(d.value)} ({((d.value / total) * 100).toFixed(0)}%)
						</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<DonutChartInner
						data={data}
						width={width}
						height={h}
						innerRadiusRatio={innerRadiusRatio}
						showLabels={showLabels}
						colors={colors}
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

DonutChart.displayName = "DonutChart";
