"use client";

import { Group } from "@visx/group";
import { hierarchy, Treemap, treemapSquarify } from "@visx/hierarchy";
import { scaleOrdinal } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../lib/chart-container";
import { type ChartDataPoint, chartColors, chartFont } from "../lib/chart-tokens";

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
	onFocus,
	onBlur,
}: {
	data: ChartDataPoint[];
	width: number;
	height: number;
	colors?: string[];
	onHover?: (d: ChartDataPoint, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (d: ChartDataPoint, left: number, top: number) => void;
	onBlur?: () => void;
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
								// visx hierarchy types node.data as the root type (with optional fields + children),
								// but depth-1 nodes are always leaf data with required label/value.
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
											tabIndex={0}
											style={{ cursor: "pointer" }}
											onMouseEnter={() =>
												d && onHover?.(d, node.x0 + nw / 2 + margin.left, node.y0 + margin.top)
											}
											onMouseLeave={() => onLeave?.()}
											onFocus={() =>
												d && onFocus?.(d, node.x0 + nw / 2 + margin.left, node.y0 + margin.top)
											}
											onBlur={() => onBlur?.()}
										/>
										{nw > 40 && nh > 20 && (
											<text
												x={node.x0 + 6}
												y={node.y0 + 16}
												fontSize={chartFont.size.tick}
												fill={chartColors.background}
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
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<ChartDataPoint>
				title={title}
				ariaDescription={`treemap chart with ${data.length} segments`}
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
					<TreemapInner
						data={data}
						width={width}
						height={h}
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

TreemapChart.displayName = "TreemapChart";
