import { app, protocol, BrowserWindow, ipcMain } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import "path";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
//import * as Backend from "./backend";

import { default as LiveStudio } from "../api/LiveStudio"

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
]);

async function createWindow():Promise<BrowserWindow> {
	console.log("Creating window...");
	
	//Create window
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			devTools: true,
			contextIsolation: false
		},
		icon: "./build/icons/icon.png",
		center: true
	});

	//Setup window
	win.setMenu(null);
	win.maximize();

	//Load the url of the dev server if in development mode
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	//Load the index.html when not in development
	} else {
		createProtocol('app')
		win.loadURL('app://./index.html')
	}

	return win;
}

//Run Electron if being required as main module
if(module.children.length === 0) {
	//Exit cleanly on request from parent process in development mode.
	if(isDevelopment) {
		if(process.platform === 'win32') {
			process.on('message', (data) => {
				if(data === 'graceful-exit')
					app.quit();
			});
		} else {
			process.on('SIGTERM', () => {
				app.quit();
			});
		}
	}

	//Wait for app to be ready before creating main window
	app.on("ready", async () => {
		if(isDevelopment && !process.env.IS_TEST) {
			//Install Vue Devtools
			try {
				await installExtension(VUEJS_DEVTOOLS);
			} catch (e) {
				console.error('Vue Devtools failed to install:', (e as Error).toString());
			}
		}
		createWindow();
	});

	//macOS specific events
	app.on("window-all-closed", () => {
		if(process.platform !== "darwin")
			app.quit();
	});
	app.on("activate", () => {
		if(BrowserWindow.getAllWindows().length === 0)
			createWindow();
	});

	//IPC Handlers

	//Load modules after the page loads
	ipcMain.handle("PageLoad", async ():Promise<boolean> => {
		console.log("Page loaded. Starting to load modules...");
		LiveStudio.Core.initModules();
		return true;
	});
}

//Export module as default
export default {
	LiveStudio
}