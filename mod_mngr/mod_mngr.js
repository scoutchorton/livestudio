const fs = require("fs").promises;
const { constants } = require("fs");
const npm = require("npm");
const os = require("os");
const pacote = require("pacote");
const PackageJson = require('@npmcli/package-json');
const path = require("path");

const { Internal } = require("../src/LiveStudio/LiveStudio.js");



/*
 * Package management
 */

async function install(pkg, installDir) {
	/**
	 * @todo: consult pacote for metadata to determine if the module is for livestudio or not
	 */

	//Install via npm
	npm.prefix = installDir || Internal.File.paths.folders.data;
	await npm.commands.install([pkg], () => {});
}

async function remove(pkg, installDir) {
	//Remove via npm
	npm.prefix = installDir || Internal.File.paths.folders.data;
	await npm.commands.uninstall([pkg], () => {});
}

/*
 * User management
 */

function find_arg(argv, args, positional) {
	let parsed;

	//Convert args to array
	if(args.constructor === String)
		args = [args];
	
	//Get filtered arguments
	parsed = args.map(arg => {return argv.indexOf(arg) === -1 ? undefined : arg;});

	//Return array of indexes based on positional
	if(positional === true)
		return parsed.map(arg => {return (arg === undefined) ? undefined : argv.indexOf(arg);});
	
	//Remove undefined values
	return parsed.filter(arg => {return arg !== undefined});
}

//Only run when being executed
if(require.main === module) {(async function() {
	let args = process.argv.slice(2);

	//Initialization
	await Internal.File.generateStructure();
	await npm.load();

	//Install?
	if(find_arg(args, ["install", "i", "update", "u"]).length > 0) {
		//Check if install command was at the end
		if(find_arg(args, ["install", "i", "update", "u"], true).indexOf(args.length - 1) === -1) {
			await install(args.slice(-1)[0]);
		} else {
			console.error("No package given");
			process.exit(1);
		}
	}
	
	//Remove?
	if(find_arg(args, ["remove", "r"]).length > 0) {
		//Check if install command was at the end
		if(find_arg(args, ["remove", "r"], true).indexOf(args.length - 1) === -1) {
			await remove(args.slice(-1)[0]);
		} else {
			console.error("No package given");
			process.exit(1);
		}
	}
})()}

module.exports = {install, remove};