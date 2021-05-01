const fs = require('fs');
//const sass = require('sass');
const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require('electron');
const { exit } = require('process');
const npm = require('npm');





console.dir(require.cache, {depth: 0});

//console.dir(npm);
/*
npm.load((newnpm) => {
	npm.run('sass');
	exit();
});
*/
exit();

/**
 * Electron
 * @ignore
 */
function createWindow() {
	//Create window
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			devTools: true
		},
		center: true,
		fullscreen: true
	});

	//Setup window
	win.loadFile('../static/index.html');
	win.setMenu(null);

	//Open developer tools with the proper argument
	if(process.argv.indexOf('--debug') >= 0 || process.argv.indexOf('-d') >= 0)
		win.webContents.openDevTools();
}

/*

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

//Inter-process messages
ipcMain.on('button', (e, arg) => {
	//Process different buttons
	if(arg === 'auto')
		switcher.auto();
	else if(arg === 'cut')
		switcher.cut();
	else if(arg === 'fadeToBlack')
		switcher.fadeToBlack();
});

*/