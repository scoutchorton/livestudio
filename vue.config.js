module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		},
	},
	configureWebpack: {
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.(ts|tsx)?$/,
					use: {
						loader: 'ts-loader'
					},
					exclude: /node_modules/
				}
			]
		}
	},
	lintOnSave: false
}
