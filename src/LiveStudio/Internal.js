/**
 * @file Internal.js
 * @desc Internal functions not intended for module developers to use
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal
 */

const fs = require("fs").promises;
const path = require("path");



/*
 * Internal variables 
 */
var module_cache = {};
let __data_dir = path.join((process.platform == "win32") ? process.env.APPDATA : process.env.HOME, ".livestudio");


/*    File submodule    */


/**
 * @module LiveStudio/Internal/File
 * @member {Object} paths Important directories
 * @member {String} paths.folders.data Base folder for saved data
 * @member {String} paths.folders.modules Location of installed modules
 * @member {String} paths.files.settings User and module based settings
 * @member {String} paths.files.modules Listing of packages installed in dirs.folders.modules
 */
let paths = {
	folders: {
		data: __data_dir,
		modules: path.join(__data_dir, "modules")
	},
	files: {
		settings: path.join(__data_dir, "settings.json"),
		modules: path.join(__data_dir, "modules.json")
	}
};

/**
 * Generate required file and folder structure needed for LiveStudio
 * @module LiveStudio/Internal/File
 * @async
 */
async function generateStructure() {
	//Iterate over needed folders
	for(let folder of Object.values(paths.folders)) {
		try {
			await fs.mkdir(folder);
		} catch(err) {
			//Ignore if file exists
			if(err.code == 'EEXIST')
				continue

			//Otherwise log error
			console.log(err);
		}
	}

	//Iterate over needed files
	for(let file of Object.values(paths.files)) {
		let fh; //FileHandle
		let fileData;

		try {
			fh = await fs.open(file, "a");
		} catch(err) {
			console.log(err);
		} finally {
			fh.close();
		}

		//Initalize JSON file
		try {
			if(/\.json$/.test(file)) {
				fileData = await fs.readFile(file);
				if(fileData.length === 0) {
					await fs.writeFile(file, "{}");
				}
			}
		} catch(err) {
			console.err(`Could not initalize JSON file ${file}`);
			throw err;
		}
	}
}


/*    Module submodule    */


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


/*    Error submodule    */


/**
 * Issues with registering a module
 * @module LiveStudio/Internal/Error
 * @extends Error
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
	Error: {RegistrationError},
	Module: {addRegistryPath, addRegistry},
	File: {generateStructure, paths}
}