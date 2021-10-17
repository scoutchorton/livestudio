/**
 * @file Module.js
 * @desc Internal module management functions
 * @author scoutchorton
 * 
 * @module Internal/Module
 */
const path = require("path");

const { paths } = require("./File.js");
const Error = require("./Error.js");


/*
 * Internal variables 
 */
var module_cache = {};



/**
 * @class Module
 */
class LS_Module {
	/**
	 * @param {Object} mod_pkg package.json from the module
	 * @param {String} mod_path Path to module
	 */
	constructor(mod_pkg, mod_path) {
		this.__req = mod_pkg;
		this.base_dir = mod_path; /** @member {String} base_dir Path to module base directory */
		this.name = mod_pkg.name; /** @member {String} name Module name */
	}

	/**
	 * @func url
	 * @param {String} pth Path to be processed
	 * @returns {String} Absolute path to resource
	 */
	url(pth) {
		return path.join(this.base_dir, pth);
	}
}

/**
 * Load a module into the LiveStudio system
 * @param {String} name Name of package
 * @returns {Object} Registered module data
 * @throws {RegistrationError} Throws when not able to find the specified module
 */
function addRegistry(name) {
	let mod_path = path.join(paths.folders.modules, name);
	let mod_req;
	let mod;

	//Attempt to get module
	try {
		mod_req = require(mod_path);
	} catch(e) {
		throw new Error.RegistrationError(`Could not find module at ${mod_path}`);
	}
	mod = new LS_Module(mod_req, mod_path);

	//Go through registration (add more stages like with npm?)
	if(mod_req.register)
		mod_req.register(mod);

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
	Module: LS_Module,
	addRegistry
}