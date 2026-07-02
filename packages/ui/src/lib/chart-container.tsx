"use client";

import { ParentSize } from "@visx/responsive";
import {
	type ComponentPropsWithRef,
	forwardRef,
	type ReactNode,
	useCallback,
	useState,
} from "react";
import { ChartTooltip } from "./chart-tooltip";
import { cn } from "./cn";

export interface ChartContainerProps<T> extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Chart title for accessibility */
	title: string;
	/** Accessible description (e.g. "bar chart with 5 data points") */
	ariaDescription: string;
	/** Whether the chart is loading */
	loading?: boolean;
	/** Custom height */
	height?: number;
	/** Whether data is empty */
	isEmpty?: boolean;
	/** Custom empty message */
	emptyMessage?: string;
	/** Show accessible data table fallback */
	showTable?: boolean;
	/** Accessible table content */
	tableContent?: ReactNode;
	/** Render tooltip content from tooltip data */
	renderTooltip?: (data: T) => ReactNode;
	/** The inner SVG chart render function */
	children: (props: {
		width: number;
		height: number;
		onHover: (data: T, left: number, top: number) => void;
		onLeave: () => void;
		/** Focus handler for keyboard a11y — mirror onHover on interactive SVG elements */
		onFocus: (data: T, left: number, top: number) => void;
		/** Blur handler for keyboard a11y — mirror onLeave on interactive SVG elements */
		onBlur: () => void;
	}) => ReactNode;
}

function ChartContainerInner<T>(
	{
		className,
		title,
		ariaDescription,
		loading = false,
		height = 300,
		isEmpty = false,
		emptyMessage = "No data available",
		showTable = false,
		tableContent,
		renderTooltip,
		children,
		...props
	}: ChartContainerProps<T>,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	// biome-ignore lint/correctness/useHookAtTopLevel: generic inner function passed to forwardRef
	const [tooltip, setTooltip] = useState<{
		data: T;
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

	if (isEmpty) {
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
				{emptyMessage}
			</div>
		);
	}

	// biome-ignore lint/correctness/useHookAtTopLevel: generic inner function passed to forwardRef
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape" && tooltip) {
				setTooltip(null);
			}
		},
		[tooltip],
	);

	const showTooltip = (data: T, left: number, top: number) => setTooltip({ data, left, top });
	const hideTooltip = () => setTooltip(null);

	return (
		<div
			ref={ref}
			className={cn("relative w-full", className)}
			onKeyDown={handleKeyDown}
			{...props}
		>
			<div role="img" aria-label={`${title}: ${ariaDescription}`} style={{ height }}>
				<ParentSize>
					{({ width: w }) =>
						children({
							width: w,
							height,
							onHover: showTooltip,
							onLeave: hideTooltip,
							onFocus: showTooltip,
							onBlur: hideTooltip,
						})
					}
				</ParentSize>
			</div>
			{tooltip && renderTooltip && (
				<ChartTooltip top={tooltip.top} left={tooltip.left}>
					{renderTooltip(tooltip.data)}
				</ChartTooltip>
			)}
			{showTable && tableContent}
		</div>
	);
}

// forwardRef doesn't support generics directly, so we cast
export const ChartContainer = forwardRef(ChartContainerInner) as <T>(
	props: ChartContainerProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;
