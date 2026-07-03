import type { Preview } from "@storybook/react-vite";
import "../../../packages/tokens/dist/tokens.css";
import "../../../packages/ui/src/styles.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		theme: {
			description: "Theme",
			toolbar: {
				title: "Theme",
				icon: "circlehollow",
				items: [
					{ value: "light", title: "Light", icon: "sun" },
					{ value: "dark", title: "Dark", icon: "moon" },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: "light",
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme || "light";
			document.documentElement.setAttribute("data-theme", theme);
			return (
				<div
					style={{
						backgroundColor: "var(--surface-default)",
						color: "var(--text-default)",
						padding: "1rem",
						minHeight: "100%",
					}}
				>
					<Story />
				</div>
			);
		},
	],
};

export default preview;
