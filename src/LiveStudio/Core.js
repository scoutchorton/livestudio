/**
 * @file Core.js
 * @desc Functions needed by module developers to interact with LiveStudio
 * @author scoutchorton
 * 
 * @module LiveStudio/Core
 */

const Internal = require("./Internal.js");
const path = require("path");



/**
 * Initalize all modules
 * @returns { undefined }
 */
function initModules() {
	console.log("Initalizing modules...");

	//Directories
	console.log(`Processing ${path.join(__dirname, "..", "..", "node_modules", ".package-lock.json")}`);
	let package_lock = require(path.join(__dirname, "..", "..", "node_modules", ".package-lock.json"));
	//let baseDir = path.join(__dirname, "..", "..");
	//let packageDirs = Object.keys(package_lock.packages);
	//let fullPackageDirs = packageDirs.map(p => { return baseDir + "/" + p});
	
	//Iterate over package paths
	/*
	for(let dataPath of fullPackageDirs) {
		//Load package details
		let tmpPackage;
		try {
			tmpPackage = require(path.join(dataPath, "package.json"));
		} catch {
			continue;
		}
		
		//Check if using LiveStudio
		//console.log(`Processing package ${dataPath}`);
		if(tmpPackage.engines != undefined && tmpPackage.engines.livestudio != undefined && tmpPackage.engines.livestudio == true) {
			//console.log(tmpPackage.name);
			//Internal.Module.addRegistry(tmpPackage.name);
			Internal.Module.addRegistryPath(dataPath);
		}
	}
	*/

	//Iterate over all packages
	for(let package in package_lock.package) {
		
	}
}



module.exports = {
	initModules: initModules
}