/**
 * @file GUI.js
 * @desc GUI functions to interact with the Electron front-end
 * @author scoutchorton
 * 
 * @module GUI
 */

const { BrowserWindow } = require("electron");



/**
 * Register an item in the status bar
 * @async
 * 
 * @param {Object} settings Options for status bar item
 * @param {String} settings.name Name of the status bar item
 * @param {String} settings.iconURL Path to display icon
 * @param {Array} settings.menu Items for the context menu
 */
async function registerStatusbar(settings) {
	let win = BrowserWindow.getFocusedWindow();

	//Check if a window was found
	if(win === null)
		throw Error("Could not get BrowserWindow."); //Move to a new error class

	console.log(settings, win);
	win.webContents.send("AddStatusbar", settings);

	return null;
}

/**
 * Register a pane
 * @async
 * 
 * @param {Object} settings Options for pane
 * @returns Pane object
 */
async function registerPane(settings) {
	let win = BrowserWindow.getFocusedWindow();

	//Check if a window was found
	if(win === null)
		throw Error("Could not get BrowserWindow."); //Move to a new error class

	console.log(settings, win);
	win.webContents.send("RegisterPane", settings);

	return null;
}



module.exports = {
	registerStatusbar,
	registerPane
}