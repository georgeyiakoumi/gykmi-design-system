"use client";

import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { ChartContainer } from "../../lib/chart-container";
import { chartColors, chartFont } from "../../lib/chart-tokens";

export interface BulletChartProps extends Omit<ComponentPropsWithRef<"div">, "children"> {
	actual: number;
	target: number;
	ranges: [number, number, number];
	title: string;
	label?: string;
	loading?: boolean;
	height?: number;
	/** Format value for tooltip display */
	formatValue?: (value: number) => string;
}

function BulletInner({
	actual,
	target,
	ranges,
	width,
	height,
	label,
	onHover,
	onLeave,
	onFocus,
	onBlur,
}: {
	actual: number;
	target: number;
	ranges: [number, number, number];
	width: number;
	height: number;
	label?: string;
	onHover?: (actual: number, target: number, left: number, top: number) => void;
	onLeave?: () => void;
	onFocus?: (actual: number, target: number, left: number, top: number) => void;
	onBlur?: () => void;
}) {
	const margin = { top: 8, right: 20, bottom: 20, left: label ? 80 : 20 };
	const innerWidth = Math.max(0, width - margin.left - margin.right);
	const innerHeight = Math.max(0, height - margin.top - margin.bottom);
	if (innerWidth <= 0 || innerHeight <= 0) return null;

	const max = Math.max(...ranges, actual, target) * 1.1;
	const xScale = scaleLinear({ domain: [0, max], range: [0, innerWidth] });
	const barHeight = innerHeight * 0.6;
	const barY = (innerHeight - barHeight) / 2;

	const rangeColors = [chartColors.grid, `${chartColors.grid}88`, `${chartColors.grid}44`];

	return (
		<svg width={width} height={height} role="img">
			<title>Bullet chart</title>
			<Group left={margin.left} top={margin.top}>
				{label && (
					<text
						x={-8}
						y={innerHeight / 2}
						dy="0.33em"
						textAnchor="end"
						fontSize={chartFont.size.label}
						fill={chartColors.textMuted}
					>
						{label}
					</text>
				)}
				{[...ranges].reverse().map((r, i) => (
					<rect
						// biome-ignore lint/suspicious/noArrayIndexKey: static ordered range bars
						key={`range-${i}`}
						x={0}
						y={barY - 4}
						width={xScale(r)}
						height={barHeight + 8}
						fill={rangeColors[2 - i]}
						rx={2}
					/>
				))}
				<rect
					x={0}
					y={barY + barHeight * 0.15}
					width={xScale(actual)}
					height={barHeight * 0.7}
					fill={chartColors.primary}
					rx={2}
					tabIndex={0}
					style={{ cursor: "pointer" }}
					onMouseEnter={() =>
						onHover?.(actual, target, xScale(actual) / 2 + margin.left, barY + margin.top)
					}
					onMouseLeave={() => onLeave?.()}
					onFocus={() =>
						onFocus?.(actual, target, xScale(actual) / 2 + margin.left, barY + margin.top)
					}
					onBlur={() => onBlur?.()}
				/>
				<line
					x1={xScale(target)}
					x2={xScale(target)}
					y1={barY - 6}
					y2={barY + barHeight + 6}
					stroke={chartColors.text}
					strokeWidth={2}
				/>
			</Group>
		</svg>
	);
}

export const BulletChart = forwardRef<HTMLDivElement, BulletChartProps>(
	(
		{
			className,
			actual,
			target,
			ranges,
			title,
			label,
			loading = false,
			height = 60,
			formatValue,
			...props
		},
		ref,
	) => {
		const fmt = formatValue ?? ((v: number) => v.toLocaleString());

		return (
			<ChartContainer<{ actual: number; target: number }>
				title={title}
				ariaDescription={`actual ${actual}, target ${target}`}
				loading={loading}
				height={height}
				isEmpty={false}
				renderTooltip={(d) => (
					<>
						<div className="font-medium">Actual: {fmt(d.actual)}</div>
						<div>Target: {fmt(d.target)}</div>
					</>
				)}
				className={className}
				ref={ref}
				{...props}
			>
				{({ width, height: h, onHover, onLeave, onFocus, onBlur }) => (
					<BulletInner
						actual={actual}
						target={target}
						ranges={ranges}
						width={width}
						height={h}
						label={label}
						onHover={(a, t, left, top) => onHover({ actual: a, target: t }, left, top)}
						onLeave={onLeave}
						onFocus={(a, t, left, top) => onFocus({ actual: a, target: t }, left, top)}
						onBlur={onBlur}
					/>
				)}
			</ChartContainer>
		);
	},
);

BulletChart.displayName = "BulletChart";
