module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
			chainWebpackMainProcess: (config) => {
				//console.log(config);
				//console.dir(config);
				config.module
					.rule("vue")
					.test(/\.vue$/)
					.use("vue-loader")
						.loader("vue-loader");
			},
			mainProcessFile: "./src/main.ts",
			renderProcessFile: "./src/background.ts"
		}
	},
	/*
	entry: {
		frontend: {
			import: "./src/main.ts",
			library: {
				name: "electron",
				type: "umd"
			}
		},
		backend: {
			import: "./api/LiveStudio.ts",
			library: {
				name: "livestudio",
				type: "commonjs"
			}
		}
	}
	*/
	/*
	configureWebpack: [
		{
			target: "node",
			entry: "./api/LiveStudio.ts"
		},
		{
			target: "web",
			entry: "./src/main.ts"
		}
	],
	*/
	/*
	configureWebpack: () => {
		return [
			{
				entry: "./api/LiveStudio.ts",
				target: "electron-main",
				name: "api"
			},
			{
				entry: "./src/main.ts",
				target: "electron-renderer",
				name: "electron"
			},
		]
		return {
			entry: "./src/main.ts",
			target: "electron-renderer",
			name: "electron"
		}
	},
	*/
	lintOnSave: false
}
