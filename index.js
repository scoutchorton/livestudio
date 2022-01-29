const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

const LiveStudio = require('./dist/api/LiveStudio');

function createWindow() {
	console.log('[ELECTRON MAIN] [createWindow] Creating window...');
	
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
	win.loadFile(path.join(app.getAppPath(), 'dist/livestudio/index.html'));
	win.setMenu(null);
	win.maximize();

	//Open dev tools
	if(process.env.NODE_ENV == 'development') {
		win.webContents.openDevTools();

		//Load Angular DevTools if a path is provided in the environment variables
		if(process.env.ANGULAR_DEVTOOLS_PATH) {
			/** @todo Angular DevTools can't detect Angular app */
			session.defaultSession.loadExtension(process.env.ANGULAR_DEVTOOLS_PATH);
		}
	}

	return win;
}

//Mac specific events
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
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

ipcMain.handle('PageLoad', async (e) => {
	console.log('[ELECTRON MAIN] [PageLoad] Page loaded!');

	console.log('[ELECTRON MAIN] [PageLoad] Loading modules...');
	await LiveStudio.Core.initModules();

	return true;
});