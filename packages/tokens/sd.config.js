import StyleDictionary from "style-dictionary";

const primitiveSource = ["src/tokens/primitive.json"];

// Top-level groups that live in the semantic files (not in primitives)
const semanticGroups = new Set([
	"surface",
	"text",
	"border",
	"action",
	"danger",
	"success",
	"warning",
	"focus",
]);

/** @param {"light" | "dark"} theme */
function getSemanticConfig(theme) {
	return {
		log: { verbosity: "silent" },
		source: [...primitiveSource, `src/tokens/semantic.${theme}.json`],
		preprocessors: ["tokens-studio"],
		platforms: {
			css: {
				transformGroup: "css",
				buildPath: "dist/",
				files: [
					{
						destination: `tokens.${theme}.css`,
						format: "css/variables",
						filter: (token) => semanticGroups.has(token.path[0]),
						options: {
							selector: theme === "light" ? ':root, [data-theme="light"]' : '[data-theme="dark"]',
							outputReferences: true,
						},
					},
				],
			},
		},
	};
}

function getPrimitiveConfig() {
	return {
		source: primitiveSource,
		preprocessors: ["tokens-studio"],
		platforms: {
			css: {
				transformGroup: "css",
				buildPath: "dist/",
				files: [
					{
						destination: "tokens.primitive.css",
						format: "css/variables",
						options: {
							selector: ":root",
							outputReferences: false,
						},
					},
				],
			},
			ts: {
				transformGroup: "js",
				buildPath: "dist/",
				files: [
					{
						destination: "tokens.js",
						format: "javascript/es6",
					},
					{
						destination: "tokens.d.ts",
						format: "typescript/es6-declarations",
					},
				],
			},
		},
	};
}

async function build() {
	// Build primitives (CSS + TS)
	const primitiveSd = new StyleDictionary(getPrimitiveConfig());
	await primitiveSd.buildAllPlatforms();

	// Build light theme semantics
	const lightSd = new StyleDictionary(getSemanticConfig("light"));
	await lightSd.buildAllPlatforms();

	// Build dark theme semantics
	const darkSd = new StyleDictionary(getSemanticConfig("dark"));
	await darkSd.buildAllPlatforms();

	console.log("Token build complete.");
}

build();
