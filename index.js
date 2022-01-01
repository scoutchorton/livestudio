const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const LiveStudio = require("./dist/api/LiveStudio");

function createWindow() {
	console.log("Creating window...");
	
	//Create window
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			devTools: true,
			contextIsolation: false
		},
		center: true
	});

	//Set up window
	win.loadFile(path.join(app.getAppPath(), "dist/livestudio/index.html"));
	win.setMenu(null);
	win.maximize();

	//Open dev tools
	if(process.env.NODE_ENV == "development")
		win.webContents.openDevTools();

	return win;
}

//Mac specific events
app.on("window-all-closed", () => {
	if(process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if(BrowserWindow.getAllWindows().length === 0) createWindow();
});

//Create the main window when Electron has initialized
app.whenReady().then(createWindow).catch(err => {
	app.quit();
	throw err;
});

/*
 * IPC Handlers
 */

ipcMain.handle("PageLoad", async (e) => {
	console.log("Page loaded!");

	console.log("Loading modules...");
	LiveStudio.Core.initModules();
});