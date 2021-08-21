/**
 * @file init.js
 * @desc Methods and properties needed to load the LiveStudio environment
 * @author scoutchorton
 * @ignore
 */
const fs = require("fs");
const { ipcMain } = require("electron");
const npm = require("npm");
const path = require("path");

const packagelock = require(path.join(__dirname, "..", "package-lock.json"));
 
/**
 * Cache to store module data
 * @member
 * @ignore
 */
var moduleCache = {};
 
/**
 * Find and initalize modules
 * @method
 * @async
 * @ignore
 * 
 * @returns {Boolean}
 */
/*
module.exports.initModules = async () => {
	//Grab package directory listing
	let baseDir = npm.config.cwd;
	let packageDirs = Object.keys(packagelock.packages);
	let fullPackageDirs = packageDirs.map(p => {return baseDir + "/" + p});
	let packageDataPaths = fullPackageDirs.map(p => {return p + "/package.json"});

	//Iterate over packages for processing
	for(let dataPath of fullPackageDirs) {
		//Load package data
		let tmpPackage;
		try {
			tmpPackage = require(dataPath + "/package.json");
		} catch {
			continue;
		}

		//Check that module is a livestudio module and load module
		if(tmpPackage.livestudio) {
			console.log(tmpPackage.name);
			await loadModule(dataPath);
		}
	}

	console.log(moduleCache);

	return true;
};
*/
 
/**
 * Load a module from a path
 * @method
 * @async
 * @ignore
 * 
 * @param {String} packagePath A string with the path to a package location
 * 
 * @return {Object}
 */
/*
let loadModule = async (packagePath) => {
	console.log(`Loading a package at ${packagePath}`);

	//Attempt to open package data
	let tmpPackage;
	try {
		tmpPackage = require(path.join(packagePath, "/package.json"));
	} catch {
		return false;
	}

	//Validate package
	if(tmpPackage.main === undefined) // @todo Search for path + "/index.js". When running `node .`, it will execute `node ./index.js` or error if not existant, so loading a module should work the same.
		return false;
	else if(tmpPackage.livestudio === undefined || tmpPackage.livestudio == false)
		return false;
	 
	//Find if module has been loaded already
	if(Object.keys(moduleCache).indexOf(tmpPackage.name) > -1)
		return false;
	console.log(packagePath);
	moduleCache[tmpPackage.name] = require(packagePath);

	console.log(`Loading ${tmpPackage.name}`);

	//Error out if there is no init
	if(moduleCache[tmpPackage.name].init === undefined)
		throw `Invalid package ${tmpPackage.name}: no init method exported.`;
	
	//Initalize module
	moduleCache[tmpPackage.name].init();
	
	return moduleCache[tmpPackage.name];
};
*/