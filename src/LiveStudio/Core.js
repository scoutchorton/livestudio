/**
 * @file Core.js
 * @desc Functions needed by module developers to interact with LiveStudio
 * @author scoutchorton
 * 
 * @module LiveStudio/Core
 */

const path = require("path");

const Internal = require("./Internal.js");



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

	//Directories
	//console.log(`Processing ${path.join(__dirname, "..", "..", "node_modules", ".package-lock.json")}`);
	//let package_lock = require(path.join(__dirname, "..", "..", "node_modules", ".package-lock.json"));
	//let packages = package_lock.packages;
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
	/*
	for(let pkg in packages) {
		let tmpPackage = packages[pkg];
		if(tmpPackage.engines != undefined && tmpPackage.engines.livestudio != undefined && tmpPackage.engines.livestudio == true) {
			console.log(path.join(__dirname, "..", "..", pkg));
			Internal.Module.addRegistryPath(path.join(__dirname, "..", "..", pkg));
		}
	}
	*/

	/** @todo Work with new package manager */

	//Iterate over all packages
	let modules = require(Internal.File.paths.files.modules);
	for(let mod in modules) {
		console.log(`  Initalizing module ${mod}...`);
	}
}



module.exports = {initModules}