/**
 * @file LiveStudio base
 * @description Main exports for LiveStudio
 * @author scoutchorton
 * 
 * @module livestudio
 */
const fs = require('fs');
const { tmp } = require('npm');
const npm = require('npm');
const path = require('path');
const packagelock = require('../package-lock.json');

/**
 * Cache to store module data
 * @property moduleCache
 */
module.exports.moduleCache = {};

/**
 * Find and initalize modules
 * @method
 * 
 * @returns {Boolean}
 */
module.exports.initModules = () => {
	//Grab package directory listing
	let baseDir = npm.config.cwd;
	let packageDirs = Object.keys(packagelock.packages);
	let fullPackageDirs = packageDirs.map(p => {return baseDir + "/" + p});
	let packageDataPaths = fullPackageDirs.map(p => {return p + "/package.json"});

	//Iterate over packages for processing
	for(let dataPath of fullPackageDirs) {
		//Load data
		let tmpPackage;
		try {
			tmpPackage = require(dataPath + "/package.json");
		} catch {
			continue;
		}

		//Check that module is a livestudio module and load module
		console.log(tmpPackage.name);
		if(tmpPackage.livestudio)
			this.loadModule(dataPath);
			
		//console.log(JSON.stringify(tmpPackage));

		//Check for livestudio data
			//Read livestudio data
			//Import package under livestudio.name
	}

	return true;
};

/**
 * Load a module from a path
 * @method
 * 
 * @return {Boolean}
 */
module.exports.loadModule = (path) => {
	//Attempt to open package data
	let tmpPackage;
	try {
		tmpPackage = require(path + "/package.json");
	} catch {
		return false;
	}

	//Validate package
	if(tmpPackage.main === undefined)
		return false;
};