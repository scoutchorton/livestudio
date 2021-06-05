/**
 * @file index.js
 * @description Main entrypoint for LiveStudio interface
 * @author scoutchorton
 * @ignore
 */
const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require("electron");
const init = require("./init");
const livestudio = require("./LiveStudio");

/*
 * Electron
 */

function createWindow() {
	//Create window
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			devTools: true,
			contextIsolation: false //New as of Electron 12. Since local code is used, there would be a larger problem if this was needed. I assume this is for something like Discord which could use the actual Discord web app inside the Electron app.
		},
		center: true
	});

	//Setup window
	win.loadFile("../static/index.html");
	win.setMenu(null);

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

//Mac specific events
app.on("window-all-closed", () => {
	if(process.platform !== "darwin")
		app.quit();
});
app.on("activate", () => {
	if(BrowserWindow.getAllWindows().length === 0)
		createWindow();
});

//Initalization listener
ipcMain.on("init", (e) => {
	console.log(e);
	init.initModules();
	e.reply("init", {status: true})
});