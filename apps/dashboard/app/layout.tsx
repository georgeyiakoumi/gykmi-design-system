import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "GYKMI Dashboard",
	description: "Financial dashboard consuming @gykmi/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="light">
			<body className="min-h-screen antialiased">{children}</body>
		</html>
	);
}
