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
 * @param {String} name Name of package
 * @returns {Object} Registered module data
 * @throws {RegistrationError} Throws when not able to find the specified module
 */
function addRegistry(name) {
	let tmpModule;
	try {
		console.log(`[INFO]   Attempt to require ${name}`)
		tmpModule = require(name);
		console.log(`[INFO] Attempted to require ${name}`)
	} catch(e) {
		console.log(e);
	}
	//throw new module.exports.Error.RegistrationError(`Could not find module at ${path}`);
};

/**
 * Load a module into the LiveStudio system with a path to the package
 * @module LiveStudio/Internal/Module
 * 
 * @param {String} path Path to module
 * @returns {Object} Registered module data
 * @throws {RegistrationError} Throws when not able to find the specified module
 */
function addRegistryPath(path) {
	/** @todo Do stuff like validate path, maybe get main file from package.json or just require it or something? */

	let tmpModule;
	try {
		console.log(`[INFO]   Attempt to require at ${path}`)
		tmpModule = require(path);
		console.log(`[INFO] Attempted to require at ${path}`)
	} catch(e) {
		console.log(e);
	}
	//throw new module.exports.Error.RegistrationError(`Could not find module at ${path}`);
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
		addRegistryPath: addRegistryPath,
		addRegistry: addRegistry
	}
}