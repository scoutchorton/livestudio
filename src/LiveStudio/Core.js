/**
 * @file Core.js
 * @desc Functions needed by module developers to interact with LiveStudio
 * @author scoutchorton
 * 
 * @module LiveStudio/Core
 */

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

	//console.log("baseDir:", packageDirs.map(p => {return baseDir + "/" + p}));
	//console.log("__dirname: ", packageDirs.map(p => {return __dirname + "/" + p}));
	//console.log(baseDir, __dirname, path.join(__dirname, "..", ".."));
	//console.log("Package base: ", path.join(__dirname, "..", ".."));
}



module.exports = {
	initModules: initModules
}