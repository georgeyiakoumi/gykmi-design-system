"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { type ComponentPropsWithRef, forwardRef, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

type Theme = "system" | "light" | "dark";

export interface ThemeToggleProps extends Omit<ComponentPropsWithRef<"div">, "onChange"> {
	/** Default theme */
	defaultTheme?: Theme;
	/** Callback when theme changes */
	onChange?: (theme: Theme) => void;
}

const themes = [
	{ value: "system" as const, icon: Monitor, label: "System" },
	{ value: "light" as const, icon: Sun, label: "Light" },
	{ value: "dark" as const, icon: Moon, label: "Dark" },
];

function getSystemTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
	const resolved = theme === "system" ? getSystemTheme() : theme;
	document.documentElement.setAttribute("data-theme", resolved);
}

function getStoredTheme(fallback: Theme): Theme {
	if (typeof window === "undefined") return fallback;
	const stored = localStorage.getItem("theme");
	if (stored === "system" || stored === "light" || stored === "dark") return stored;
	return fallback;
}

export const ThemeToggle = forwardRef<HTMLDivElement, ThemeToggleProps>(
	({ defaultTheme = "system", onChange, className, ...props }, ref) => {
		const [active, setActive] = useState<Theme>(() => getStoredTheme(defaultTheme));

		useEffect(() => {
			applyTheme(active);
		}, [active]);

		useEffect(() => {
			if (active !== "system") return;
			const mql = window.matchMedia("(prefers-color-scheme: dark)");
			const handler = () => applyTheme("system");
			mql.addEventListener("change", handler);
			return () => mql.removeEventListener("change", handler);
		}, [active]);

		return (
			<div ref={ref} className={className} {...props}>
				<Tabs
					value={active}
					onValueChange={(value) => {
						const theme = value as Theme;
						setActive(theme);
						localStorage.setItem("theme", theme);
						onChange?.(theme);
					}}
				>
					<TabsList className="">
						{themes.map(({ value, icon: Icon, label }) => (
							<TabsTrigger key={value} value={value} aria-label={label}>
								<Icon size={16} />
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>
		);
	},
);

ThemeToggle.displayName = "ThemeToggle";
