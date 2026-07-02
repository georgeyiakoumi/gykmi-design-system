"use client";

import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { Arc } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";
import { chartColors, chartFont } from "../lib/chart-tokens";
import { ChartTooltip } from "../lib/chart-tooltip";
import { cn } from "../lib/cn";

export interface GaugeChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	value: number;
	max?: number;
	title: string;
	label?: string;
	loading?: boolean;
	height?: number;
	color?: string;
	trackColor?: string;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function GaugeInner({
	value,
	max = 100,
	width,
	height,
	label,
	color = chartColors.primary,
	trackColor = chartColors.grid,
	onHover,
	onLeave,
}: {
	value: number;
	max?: number;
	width: number;
	height: number;
	label?: string;
	color?: string;
	trackColor?: string;
	onHover?: (value: number, left: number, top: number) => void;
	onLeave?: () => void;
}) {
	const radius = Math.min(width, height * 2) / 2 - 10;
	const centerX = width / 2;
	const centerY = height - 10;
	const startAngle = -Math.PI / 1.2;
	const endAngle = Math.PI / 1.2;
	const proportion = Math.min(value / max, 1);
	const valueAngle = startAngle + (endAngle - startAngle) * proportion;

	return (
		<svg width={width} height={height} role="img">
			<title>Gauge chart</title>
			<Group top={centerY} left={centerX}>
				<Arc
					innerRadius={radius - 16}
					outerRadius={radius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={trackColor}
				/>
				<Arc
					innerRadius={radius - 16}
					outerRadius={radius}
					startAngle={startAngle}
					endAngle={valueAngle}
					fill={color}
					cornerRadius={4}
					style={{ cursor: "pointer" }}
					onMouseEnter={() => onHover?.(value, centerX, centerY - radius)}
					onMouseLeave={() => onLeave?.()}
				/>
				<text
					textAnchor="middle"
					dy="-0.5em"
					fontSize={24}
					fontWeight={600}
					fill={chartColors.text}
				>
					{value}
				</text>
				{label && (
					<text
						textAnchor="middle"
						dy="1em"
						fontSize={chartFont.size.label}
						fill={chartColors.textMuted}
					>
						{label}
					</text>
				)}
			</Group>
		</svg>
	);
}

export const GaugeChart = forwardRef<HTMLDivElement, GaugeChartProps>(
	(
		{
			className,
			value,
			max,
			title,
			label,
			loading = false,
			height = 180,
			color,
			trackColor,
			formatValue,
			...props
		},
		ref,
	) => {
		const [tooltip, setTooltip] = useState<{
			value: number;
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
		return (
			<div ref={ref} className={cn("relative w-full", className)} {...props}>
				<div role="img" aria-label={`${title}: ${value} of ${max ?? 100}`} style={{ height }}>
					<ParentSize>
						{({ width: w }) => (
							<GaugeInner
								value={value}
								max={max}
								width={w}
								height={height}
								label={label}
								color={color}
								trackColor={trackColor}
								onHover={(v, left, top) => setTooltip({ value: v, left, top })}
								onLeave={() => setTooltip(null)}
							/>
						)}
					</ParentSize>
				</div>
				{tooltip && (
					<ChartTooltip top={tooltip.top} left={tooltip.left}>
						<div className="font-medium">{fmt(tooltip.value)}</div>
						<div>
							{tooltip.value} / {max ?? 100}
						</div>
					</ChartTooltip>
				)}
			</div>
		);
	},
);

GaugeChart.displayName = "GaugeChart";
