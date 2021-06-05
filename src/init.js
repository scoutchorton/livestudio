/**
 * @file init.js
 * @description Methods and properties needed to load the LiveStudio environment
 * @author scoutchorton
 * 
 * @module livestudio
 */
 const fs = require('fs');
 const npm = require('npm');
 const path = require('path');
 const packagelock = require('../package-lock.json');
 
 /**
  * Cache to store module data
  * @property moduleCache
  */
 var moduleCache = {};
 
 /**
  * Find and initalize modules
  * @method
  * @async
  * 
  * @returns {Boolean}
  */
 async function initModules() {
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
		 if(tmpPackage.livestudio) {
			 console.log(tmpPackage.name);
			 await this.loadModule(dataPath);
		 }
			 
		 //console.log(JSON.stringify(tmpPackage));
 
		 //Check for livestudio data
			 //Read livestudio data
			 //Import package under livestudio.name
	 }
 
	 console.log(this.moduleCache);
 
	 return true;
 };
 
 /**
  * Load a module from a path
  * @method
  * @async
  * 
  * @return {Boolean}
  */
 async function loadModule(path) {
	 console.log(`Loading a package at ${path}`);
 
	 //Attempt to open package data
	 let tmpPackage;
	 try {
		 tmpPackage = require(path + "/package.json");
	 } catch {
		 return false;
	 }
 
	 //Validate package
	 if(tmpPackage.main === undefined) /** @todo Search for path + "/index.js". When running `node .`, it will execute `node ./index.js` or error if not existant, so loading a module should work the same. */
		 return false;
	 else if(tmpPackage.livestudio === undefined || tmpPackage.livestudio == false)
		 return false;
	 
	 //Find if module has been loaded already
	 if(Object.keys(this.moduleCache).indexOf(tmpPackage.name) > -1)
		 return false;
	 console.log(path);
	 this.moduleCache[tmpPackage.name] = require(path);
 
	 console.log(`Loading ${tmpPackage.name}`);
 
	 return this.moduleCache;
 };
 
 /**
  * Exports
  */
 module.exports = {
	 //Properties
	 moduleCache: moduleCache,
 
	 //Methods
	 initModules: initModules,
	 loadModule: loadModule
 }