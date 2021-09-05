const fs = require("fs").promises;
const { constants } = require("fs");
const os = require("os");
const pacote = require("pacote");
const path = require("path");

const { Internal } = require("../src/LiveStudio/LiveStudio.js");



function loadingMessage(msg) {
	let state = 0;
	let invtl = setInterval(() => {
		let line = ["|", "/", "-", "\\"][state];

		process.stdout.write(`\r${line} ${msg}`);

		state++;
		if(state > 3)
			state = 0;
	}, 100);
	return () => {
		process.stdout.write("\r" + " ".repeat(2 + msg.length));
		clearInterval(invtl);
	}
}

__modules_file = {
	add: async (name, details) => {
		moduleData = require(Internal.File.paths.files.modules);
		moduleData[name] = details;
		await fs.writeFile(Internal.File.paths.files.modules, JSON.stringify(moduleData, undefined, "\t"));
		return moduleData;
	},
	remove: async (name) => {
		moduleData = require(Internal.File.paths.files.modules);
		delete moduleData[name];
		await fs.writeFile(Internal.File.paths.files.modules, JSON.stringify(moduleData, undefined, "\t"));
		return moduleData;
	},
	has: async (name) => {
		moduleData = require(Internal.File.paths.files.modules);
		return Object.keys(moduleData).indexOf(name) === -1 ? false : true;
	}
}



async function install(pkg) {
	let clear;
	let manifest;
	let modulePath;
	let result;
	let moduleData;

	//Find package
	clear = loadingMessage(`Resolving ${pkg}...`);
	
	try {
		manifest = await pacote.manifest(pkg);
	} catch(err) {
		//TODO: make a more verbose output
		clear();
		process.stderr.write(`\rCould not resolve ${pkg}\n`);
		console.log(err);
		process.exit(1);
	}
	clear();

	if(manifest) {
		process.stdout.write(`\rResolved ${manifest.name}\n`);
	} else {
		process.stderr.write(`\rCould not resolve ${pkg}\n`);
		process.exit(1);
	}

	//Extract package
	clear = loadingMessage(`Extracting ${pkg}...`);

	try {
		modulePath = path.join(Internal.File.paths.folders.modules, manifest.name);
		result = await pacote.extract(pkg, modulePath);
	} catch(err) {
		//TODO: make a more verbose output
		clear();
		process.stderr.write(`\rCould not extract ${manifest.name}\n`);
		console.log(err);
		process.exit(1);
	}
	clear();

	process.stdout.write(`\rExtracted ${manifest.name} to ${modulePath}\n`);

	//Update modules.json
	__modules_file.add(manifest.name, manifest);
	process.stdout.write(`Installed ${manifest.name}@${manifest.version}\n`);
}

async function remove(pkg) {
	let clear;

	//Check if module exists
	clear = loadingMessage(`Removing ${pkg}...`);

	try {
		await fs.access(path.join(Internal.File.paths.folders.modules, pkg))
	} catch(err) {
		process.stderr.write(`\r${pkg} not installed\n`);
		process.exit(1);
	}

	//Remove module folder
	try {
		if(fs.rm)
			fs.rm(path.join(Internal.File.paths.folders.modules, pkg), {recursive: true, force: true});
		else
			fs.rmdir(path.join(Internal.File.paths.folders.modules, pkg), {recursive: true});
	} catch(err) {
		clear();
		process.stderr.write(`\rCould not remove ${pkg}\n`);
		console.log(err);
		process.exit(1);
	}
	
	//Update modules.json
	__modules_file.remove(pkg);
	clear();
	
	process.stdout.write(`\rRemoved ${pkg}\n`);
}



/**
 * @todo Better error messages
 * @todo Make a devoted function to managing modules.json (__modules_file)
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
	let clear;

	//Generate file structure
	await Internal.File.generateStructure();
	
	//Install?
	if(find_arg(args, ["install", "i"]).length > 0) {
		//Check if install command was at the end
		if(find_arg(args, ["install", "i"], true).indexOf(args.length - 1) === -1) {
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