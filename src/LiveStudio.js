/**
 * @file LiveStudio.js
 * @desc Base functions for LiveStudio modules
 * @author scoutchorton
 * 
 * @module LiveStudio
 */
const { ipcMain } = require("electron");
const path = require("path");
const main = require(path.join(__dirname, "..", "index.js"));

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
module.exports.registerMenuItem = (settings) => {
	//Argument processing
	if(settings === undefined)
		throw "settings undefined";
	
	console.log("REGISTERING MENU", settings);
	
	main.win.webContents.send("reigster-device", settings);
};

/**
 * Open a pane within the LiveStudio window
 * @method
 * 
 * @param {Objects} settings Options for Pane
 */
module.exports.createPane = (settings) => {
	//Argument processing
	if(settings === undefined)
		throw "settings undefined";
	
	console.log("REGISTERING PANE", settings);

	main.win.webContents.send("create-pane", settings);
};