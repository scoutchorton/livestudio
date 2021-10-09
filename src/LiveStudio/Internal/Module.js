/**
 * @file Module.js
 * @desc Internal module management functions
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal/Module
 */
const path = require("path");

const {paths} = require("./File.js");
const Error = require("./Error.js");


/*
 * Internal variables 
 */
var module_cache = {};



/**
 * Load a module into the LiveStudio system
 * @param {String} name Name of package
 * @returns {Object} Registered module data
 * @throws {RegistrationError} Throws when not able to find the specified module
 */
function addRegistry(name) {
	let mod;
	try {
		//console.log(`[INFO]   Attempt to require ${name}`);
		console.log(`[INFO]   Attempt to require ${path.join(paths.folders.modules, name)}`);
		mod = require(path.join(paths.folders.modules, name));
		//console.log(`[INFO] Attempted to require ${name}`, tmpModule);
		console.log(`[INFO] Attempted to require ${path.join(paths.folders.modules, name)}`, mod);
		console.log(modData)
	} catch(e) {
		console.log(e);
		throw new Error.RegistrationError(`Could not find module at ${path}`);
	}

	//Go through registration (add more stages like with npm?)
	if(mod.register)
		mod.register();

	//Add module to registry
	module_cache[name] = mod;
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