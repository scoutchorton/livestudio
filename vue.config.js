module.exports = {
	configureWebpack: {
		target: "async-node"
	},
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		},
	},
	lintOnSave: false
}
