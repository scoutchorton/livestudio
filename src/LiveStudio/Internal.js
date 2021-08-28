/**
 * @file Internal.js
 * @desc Internal functions not intended for module developers to use
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal
 */

var module_cache = {};



/**
 * Load a module into the LiveStudio system
 * @module LiveStudio/Internal/Module
 * 
 * @param {String} name Name of the module to register (name of npm package)
 * @returns {Object} Registered module data
 * @throws Throws when not able to find the specified module
 */
function registerModule(name) {

};



/**
 * Issues with registering a module
 */
class RegistrationError extends Error {
	constructor(msg) {
		super(msg);
		this.name = "RegistrationError";
	}
}



/*
 * Exports
 */
module.exports = {
	Error: {
		RegistrationError
	},
	Module: {
		registerModule: registerModule
	}
}