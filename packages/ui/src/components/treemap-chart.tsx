"use client";

import { Group } from "@visx/group";
import { hierarchy, Treemap, treemapSquarify } from "@visx/hierarchy";
import { ParentSize } from "@visx/responsive";
import { scaleOrdinal } from "@visx/scale";
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

export interface TreemapChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	data: ChartDataPoint[];
	title: string;
	loading?: boolean;
	height?: number;
	showTable?: boolean;
	colors?: string[];
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function TreemapInner({
	data,
	width,
	height,
	colors = defaultPalette,
	onHover,
	onLeave,
}: {
	data: ChartDataPoint[];
	width: number;
	height: number;
	colors?: string[];
	onHover?: (d: ChartDataPoint, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const margin = { top: 4, right: 4, bottom: 4, left: 4 };
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const colorScale = scaleOrdinal({ domain: data.map((d) => d.label), range: colors });
	const root = hierarchy<{
		label?: string;
		value?: number;
		children?: { label: string; value: number }[];
	}>({
		children: data.map((d) => ({ label: d.label, value: d.value })),
	})
		.sum((d) => d.value ?? 0)
		.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

	return (
		<svg width={width} height={height} role="img">
			<title>Treemap chart</title>
			<Treemap
				root={root}
				size={[innerWidth, innerHeight]}
				tile={treemapSquarify}
				padding={2}
				round
			>
				{(treemap) => (
					<Group left={margin.left} top={margin.top}>
						{treemap
							.descendants()
							.filter((n) => n.depth === 1)
							.map((node, i) => {
								const nw = node.x1 - node.x0;
								const nh = node.y1 - node.y0;
								const d = node.data as unknown as ChartDataPoint;
								return (
									<g key={d?.label ?? i}>
										<rect
											x={node.x0}
											y={node.y0}
											width={nw}
											height={nh}
											fill={colorScale(d?.label ?? "")}
											rx={4}
											style={{ cursor: "pointer" }}
											onMouseEnter={() =>
												d && onHover?.(d, node.x0 + nw / 2 + margin.left, node.y0 + margin.top)
											}
											onMouseLeave={() => onLeave?.()}
										/>
										{nw > 40 && nh > 20 && (
											<text
												x={node.x0 + 6}
												y={node.y0 + 16}
												fontSize={chartFont.size.tick}
												fill="white"
												pointerEvents="none"
											>
												{d?.label}
											</text>
										)}
									</g>
								);
							})}
					</Group>
				)}
			</Treemap>
		</svg>
	);
}

export const TreemapChart = forwardRef<HTMLDivElement, TreemapChartProps>(
	(
		{
			className,
			data,
			title,
			loading = false,
			height = 300,
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
		if (data.length === 0)
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
		return (
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div
					role="img"
					aria-label={`${title}: treemap chart with ${data.length} segments`}
					style={{ height }}
				>
					<ParentSize>
						{({ width: w }) => (
							<TreemapInner
								data={data}
								width={w}
								height={height}
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
						<div>{fmt(tooltip.data.value)}</div>
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

TreemapChart.displayName = "TreemapChart";
