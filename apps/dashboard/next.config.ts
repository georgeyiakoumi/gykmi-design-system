import { resolve } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	transpilePackages: ["@gykmi/ui", "@gykmi/tokens"],
	turbopack: {
		// Ensure Turbopack watches the entire monorepo, not just apps/dashboard
		root: resolve(__dirname, "../.."),
	},
};

export default nextConfig;
