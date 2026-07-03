"use client";

import { Group } from "@visx/group";
import { Arc } from "@visx/shape";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../../lib/chart-container";
import { chartColors, chartFont } from "../../lib/chart-tokens";

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
	onFocus,
	onBlur,
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
	onFocus?: (value: number, left: number, top: number) => void;
	onBlur?: () => void;
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
					tabIndex={0}
					style={{ cursor: "pointer" }}
					onMouseEnter={() => onHover?.(value, centerX, centerY - radius)}
					onMouseLeave={() => onLeave?.()}
					onFocus={() => onFocus?.(value, centerX, centerY - radius)}
					onBlur={() => onBlur?.()}
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
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<number>
				title={title}
				ariaDescription={`${value} of ${max ?? 100}`}
				loading={loading}
				height={height}
				isEmpty={false}
				renderTooltip={(v) => (
					<>
						<div className="font-medium">{fmt(v)}</div>
						<div>
							{v} / {max ?? 100}
						</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<GaugeInner
						value={value}
						max={max}
						width={width}
						height={h}
						label={label}
						color={color}
						trackColor={trackColor}
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

GaugeChart.displayName = "GaugeChart";
