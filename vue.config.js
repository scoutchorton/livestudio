module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		},
	},
	configureWebpack: [
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
		{
			target: "node",
			entry: "./api/LiveStudio.ts"
		},
		{
			target: "web",
			entry: "./src/main.ts"
		}
	],
	lintOnSave: false
}
