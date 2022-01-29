/**
 * @module LiveStudio/GUI
 */

import { BrowserWindow } from 'electron';

/**
 * Register an item in the status bar
 * @param settings Options for status bar item
 * @param {String} settings.name Name of the status bar item
 * @param {String} settings.iconURL Path to display icon
 * @param {Array} settings.iconURL Items for the context menu
 * @async
 */
export async function registerStatusbar(settings: Record<string,unknown>): Promise<void> {
	const win: BrowserWindow = BrowserWindow.getAllWindows()[0];

	//Check if a window was found
	if(win === null)
		throw Error('Could not get BrowserWindow.'); //Move to Internal/Errors
	
	console.log(settings, win);
	win.webContents.send('AddStatusbar', settings);

	return;
}

/**
 * Register a pane
 * @param settings Options for pane
 * @async 
 */
export async function registerPane(settings: Record<string,unknown>): Promise<void> {
	const win: BrowserWindow = BrowserWindow.getAllWindows()[0];

	//Check if a window was found
	if(win === null)
		throw Error('Could not get BrowserWindow.'); //Move to a new error class

	console.log(settings, win);
	win.webContents.send('RegisterPane', settings);

	return;
}