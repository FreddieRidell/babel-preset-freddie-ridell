const targets = {
	browsers: [
		">1%",
		"not ie 11",
		"not op_mini all",
		"maintained node versions",
	],
	node: true,
};

/*
 * options:
 *     ramdaUseEs: should ramda use its es imports
 *     emotion: should we use emotions
 *     modules: how should env package its modules
 *
 * env vars:
 *     MINIFY = true | false
 *     NODE_ENV = "production" | "develop" | "test" 
 */

module.exports = (_, { ramdaUseEs, emotion, modules }) => {
	if (process.env.BABEL_HELP) {
		console.log(`
@freddieridell/babel-preset:
    options:
        ramdaUseEs: should ramda use its es imports
        emotion: should we use emotions
        modules: how should env package its modules

    env vars:
        MINIFY = true | false
        NODE_ENV = "production" | "develop" | "test" 
		`);
	}

	return {
		comments: !process.env.NODE_ENV === "production" && process.env.MINIFY,
		presets: [
			"@babel/react",
			"@babel/flow",
			process.env.NODE_ENV === "production" &&
				process.env.MINIFY &&
				"minify",
			[
				"@babel/env",
				{
					targets,
					modules,
				},
			],
		].filter(Boolean),
		plugins: [
			"preval",
			emotion && "emotion",
			["ramda", { useEs: Boolean(ramdaUseEs) }],
			[
				"@babel/plugin-transform-runtime",
				{
					corejs: false,
					helpers: true,
					regenerator: true,
					useESModules: false,
				},
			],
		].filter(Boolean),
	};
};
