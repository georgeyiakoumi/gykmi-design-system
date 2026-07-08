"use client";

/**
 * Chart colour palette derived from semantic tokens.
 * Used by all chart components for consistent theming.
 */
export const chartColors = {
	primary: "var(--fill-brand-strong, #2563eb)",
	secondary: "var(--color-blue-400, #60a5fa)",
	tertiary: "var(--color-green-500, #22c55e)",
	quaternary: "var(--color-amber-500, #f59e0b)",
	danger: "var(--fill-error-strong, #dc2626)",
	success: "var(--fill-success-strong, #22c55e)",
	warning: "var(--fill-warning-strong, #f59e0b)",
	muted: "var(--text-weak, #737373)",
	grid: "var(--border-weak, #e5e5e5)",
	background: "var(--surface-base, #ffffff)",
	text: "var(--text-strong, #171717)",
	textMuted: "var(--text-weak, #737373)",
	confidence: {
		band: "var(--fill-brand-strong, #2563eb)",
		bandOpacity: 0.15,
	},
} as const;

export const chartFont = {
	family: "var(--font-family-sans, Inter, system-ui, sans-serif)",
	size: {
		tick: 11,
		label: 12,
		title: 14,
	},
} as const;

export const chartSpacing = {
	margin: { top: 20, right: 20, bottom: 40, left: 50 },
	sparklineMargin: { top: 4, right: 4, bottom: 4, left: 4 },
} as const;

export type ChartDataPoint = {
	label: string;
	value: number;
};

export type TimeSeriesPoint = {
	date: string;
	value: number;
};

export type ConfidencePoint = {
	date: string;
	value: number;
	low: number;
	high: number;
};
