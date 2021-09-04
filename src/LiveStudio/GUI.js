/**
 * @file GUI.js
 * @desc GUI functions to interact with the Electron front-end
 * @author scoutchorton
 * 
 * @module LiveStudio/GUI
 */



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
	return true;
}

/**
 * Register a pane
 * @async
 * 
 * @param {Object} settings Options for pane
 * @returns Pane object
 */
async function registerPane(settings) {
	return {};
}


/*
 * Exports
 */

module.exports = {registerStatusbar, registerPane}