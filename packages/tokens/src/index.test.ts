import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const distDir = resolve(import.meta.dirname, "../dist");

describe("token build output", () => {
	it("emits combined tokens.css", () => {
		expect(existsSync(resolve(distDir, "tokens.css"))).toBe(true);
	});

	it("emits tokens.js with primitive exports", () => {
		const js = readFileSync(resolve(distDir, "tokens.js"), "utf8");
		expect(js).toContain("ColorNeutral0");
		expect(js).toContain("Spacing4");
	});

	it("emits tokens.d.ts with type declarations", () => {
		const dts = readFileSync(resolve(distDir, "tokens.d.ts"), "utf8");
		expect(dts).toContain("export const ColorNeutral0: string");
	});

	it("light theme uses var() references to primitives", () => {
		const css = readFileSync(resolve(distDir, "tokens.light.css"), "utf8");
		expect(css).toContain("--surface-default: var(--color-neutral-0)");
		expect(css).toContain("--action-default: var(--color-blue-600)");
	});

	it("dark theme uses var() references to primitives", () => {
		const css = readFileSync(resolve(distDir, "tokens.dark.css"), "utf8");
		expect(css).toContain("--surface-default: var(--color-neutral-900)");
		expect(css).toContain('[data-theme="dark"]');
	});

	it("semantic tokens never contain raw hex values", () => {
		const light = readFileSync(resolve(distDir, "tokens.light.css"), "utf8");
		const dark = readFileSync(resolve(distDir, "tokens.dark.css"), "utf8");
		// Skip the auto-generated comment lines, check only var declarations
		const lightVars = light.split("\n").filter((l) => l.includes("--") && l.includes(":"));
		const darkVars = dark.split("\n").filter((l) => l.includes("--") && l.includes(":"));
		for (const line of [...lightVars, ...darkVars]) {
			expect(line).toMatch(/var\(--/);
		}
	});
});
