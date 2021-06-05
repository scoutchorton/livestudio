/**
 * @file LiveStudio.js
 * @description Base functions for LiveStudio modules
 * @author scoutchorton
 * 
 * @module LiveStudio
 */
const { ipcRenderer } = require("electron");

/**
 * @function registerMenuItem
 * @description Register a menu item in the status bar
 * 
 * @argument settings Options for the menu item
 */
function registerMenuItem(settings) {
	//Argument processing
	if(settings === undefined)
		throw "settings undefined";
}


/**
 * Exports
 */
module.exports = {
	registerMenuItem: this.registerMenuItem
}