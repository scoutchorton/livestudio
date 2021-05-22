const fs = require('fs');
const npm = require('npm');
const path = require('path');
const packagelock = require('../package-lock.json');

/*
(async () => {
	_ = await npm.config.load();
})();
*/

/**
 * Document later
 */
module.exports.loadModules = () => {
	//Grab package directory listing
	let baseDir = npm.config.cwd;
	let packageDirs = Object.keys(packagelock.packages);
	let fullPackageDirs = packageDirs.map(p => {return baseDir + "/" + p});
	let packageDataPaths = fullPackageDirs.map(p => {return p + "/package.json"});


	//Iterate over packages for processing
	for(let dataPath of packageDataPaths) {
		//Load data
		let tmpPackage;
		try {
			tmpPackage = require(dataPath);
		} catch {
			continue;
		}
		//console.log(tmpPackage.name, tmpPackage.livestudio);
		if(tmpPackage.name === "demolivestudiomodule")
			console.log(JSON.stringify(tmpPackage));

		//Check for livestudio data
			//Read livestudio data
			//Import package under livestudio.name
	}
};