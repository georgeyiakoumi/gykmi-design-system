import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "GYKMI Dashboard",
	description: "Financial dashboard consuming @gykmi/ui",
};

const themeScript = `
(function() {
	try {
		var theme = localStorage.getItem('theme') || 'system';
		var resolved = theme;
		if (theme === 'system') {
			resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		document.documentElement.setAttribute('data-theme', resolved);
	} catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className="min-h-screen font-sans antialiased">{children}</body>
		</html>
	);
}
