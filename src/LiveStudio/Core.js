/**
 * @file Core.js
 * @desc Functions needed by module developers to interact with LiveStudio
 * @author scoutchorton
 * 
 * @module LiveStudio/Core
 */

const Internal = require("./Internal.js");
const path = require("path");

const package_lock = require(path.join(__dirname, "..", "..", "node_modules", ".package-lock.json"));



/**
 * Initalize all modules
 * @returns { undefined }
 */
function initModules() {
	console.log("Initalizing modules...");

	//Directories
	let baseDir = path.join(__dirname, "..", "..");
	let packageDirs = Object.keys(package_lock.packages);
	let fullPackageDirs = packageDirs.map(p => { return baseDir + "/" + p});

	//Iterate over package paths
	for(let dataPath of fullPackageDirs) {
		//Load package details
		let tmpPackage;
		try {
			tmpPackage = require(path.join(dataPath, "package.json"));
		} catch {
			continue;
		}

		//Check if using LiveStudio
		if(tmpPackage.engines != undefined && tmpPackage.engines.livestudio != undefined && tmpPackage.engines.livestudio == true) {
			//console.log(tmpPackage.name);
			Internal.Module.addRegistry(tmpPackage.name);
		}
	}
}



module.exports = {
	initModules: initModules
}