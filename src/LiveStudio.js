/**
 * @file LiveStudio.js
 * @desc Base functions for LiveStudio modules
 * @author scoutchorton
 * 
 * @module LiveStudio
 */
const { ipcMain } = require("electron");

/**
 * Register a menu item in the status bar
 * @method
 * 
 * @param {Object} settings Options for the menu item
 * @param {String} settings.name Name to display for the menu item
 * @param {String} settings.iconURL Icon to show
 * @param {Array} settings.menu Context menu data
 * 
 * @returns {Boolean} True on success, false on error
 */
function registerMenuItem(settings) {
	//Argument processing
	if(settings === undefined)
		throw "settings undefined";
	
	console.log("REGISTERING MENU", settings);
	
	ipcMain.send("reigster-device", settings);
}

/**
 * Open a pane within the LiveStudio window
 * @method
 * 
 * @param {Objects} settings Options for Pane
 */
function createPane(settings) {
	//Argument processing
	if(settings === undefined)
		throw "settings undefined";
	
	console.log("REGISTERING MENU", settings);

	ipcMain.send("create-pane", settings);
}

module.exports = this;