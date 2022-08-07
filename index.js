/*
 * Run Electron window
 */
const { app, BrowserWindow, /*dialog, globalShortcut,*/ ipcMain } = require('electron');
const path = require('path');

//const { Core } = require('./dist/api/LiveStudio.js');

function createWindow() {
	console.log('Creating window...');

	//Create window
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			devTools: true,
			contextIsolation: false //New as of Electron 12. Since local code is used, there would be a larger problem if this was needed. I assume this is for something like Discord which could use the actual Discord web app inside the Electron app.
		},
		center: true,
	});

	//Setup window
	win.loadFile(path.join(app.getAppPath(), 'dist/livestudio/index.html'));
	win.setMenu(null);
	win.maximize();

	//Open developer tools with the proper environment variable
	if(process.env.NODE_ENV == 'development')
		win.webContents.openDevTools();

	return win;
}

//Launch application once loaded
app.whenReady().then(createWindow).catch(err => {
	app.quit();
	throw err;
});

//Mac specific events
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin')
		app.quit();
});
app.on('activate', () => {
	if(BrowserWindow.getAllWindows().length === 0)
		createWindow();
});

//Initalization listener
ipcMain.handle('PageLoad', async (e) => {
	console.log('Page loaded. Starting to load modules...');
	//Core.initModules();
	return true;
});