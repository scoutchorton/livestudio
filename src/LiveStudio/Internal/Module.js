/**
 * @file Module.js
 * @desc Internal module management functions
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal/Module
 */
const path = require("path");

const {paths} = require("./File.js")

/**
 * Load a module into the LiveStudio system
 * @param {String} name Name of package
 * @returns {Object} Registered module data
 * @throws {RegistrationError} Throws when not able to find the specified module
 */
function addRegistry(name) {
	let tmpModule;
	try {
		//console.log(`[INFO]   Attempt to require ${name}`);
		console.log(`[INFO]   Attempt to require ${path.join(paths.folders.modules, name)}`);
		tmpModule = require(path.join(paths.folders.modules, name));
		//console.log(`[INFO] Attempted to require ${name}`, tmpModule);
		console.log(`[INFO] Attempted to require ${path.join(paths.folders.modules, name)}`, tmpModule);
	} catch(e) {
		console.log(e);
	}
	//throw new module.exports.Error.RegistrationError(`Could not find module at ${path}`);
};

/**
 * Load a module into the LiveStudio system with a path to the package
 * @param {String} path Path to module
 * @returns {Object} Registered module data
 * @throws {RegistrationError} Throws when not able to find the specified module
 */
/*
function addRegistryPath(modulePath) {
	// @todo Do stuff like validate path, maybe get main file from package.json or just require it or something?

	let tmpModule;
	try {
		console.log(`[INFO]   Attempt to require at ${modulePath}`)
		tmpModule = require(modulePath);
		console.log(`[INFO] Attempted to require at ${modulePath}`)
	} catch(e) {
		console.log(e);
	}
	//throw new module.exports.Error.RegistrationError(`Could not find module at ${path}`);
};
*/


module.exports = {
	addRegistry
}