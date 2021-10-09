/**
 * @file Core.js
 * @desc Functions needed by module developers to interact with LiveStudio
 * @author scoutchorton
 * 
 * @module Core
 */

const path = require("path");

const Internal = require("../Internal/Internal.js");



/**
 * Initalize all modules
 * @async
 * 
 * @returns { undefined }
 */
async function initModules() {
	console.log("Initalizing modules...");

	//Make sure folders exist
	await Internal.File.generateStructure();

	//Iterate over all packages
	let modules = require(Internal.File.paths.files.package).dependencies;
	console.log(modules);
	for(let mod in modules) {
		console.log(`module: ${mod}`)
		Internal.Module.addRegistry(mod);
	}
}



module.exports = {
	initModules
}