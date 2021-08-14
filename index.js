/**
 * @file index.js
 * @description Main entrypoint for LiveStudio interface
 * @author scoutchorton
 * @ignore
 */
const { app, BrowserWindow, dialog, globalShortcut, ipcMain } = require("electron");
const path = require("path");
const init = require(path.join(__dirname, "src/init.js"));
const LiveStudio = require('./src/LiveStudio.js');

/*
 * Electron
 */
function createWindow() {
	//Create window
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			devTools: true,
			contextIsolation: false //New as of Electron 12. Since local code is used, there would be a larger problem if this was needed. I assume this is for something like Discord which could use the actual Discord web app inside the Electron app.
		},
		icon: "static/assets/square_logo-64.png",
		center: true
	});

	//Setup window
	win.loadFile(path.join(app.getAppPath(), "static/index.html"));
	win.setMenu(null);
	win.maximize();

	//Open developer tools with the proper argument
	if(process.argv.indexOf("--debug") >= 0 || process.argv.indexOf("-d") >= 0)
		win.webContents.openDevTools();

	return win;
}

//Launch application once loaded
app.whenReady().then(createWindow).catch(err => {
	app.quit();
	throw err;
});

/*
 * Run Electron window
 */
if(require.main === module) {
	//Mac specific events
	app.on("window-all-closed", () => {
		if(process.platform !== "darwin")
			app.quit();
	});
	app.on("activate", () => {
		if(BrowserWindow.getAllWindows().length === 0)
			createWindow();
	});

	//Test
	LiveStudio.testMe();

	//Initalization listener
	ipcMain.on("init", async (e) => {
		await init.initModules();
		e.reply("init", {status: true})
	});
}