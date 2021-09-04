const fs = require("fs").promises;
const pacote = require("pacote");
const os = require("os");
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
	add: (name, details) => {
		return;
	},
	update: (name, details) => {
		return;
	},
	remove: (name) => {
		return;
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
	} catch {
		//TODO: make a more verbose output
		clear();
		process.stderr.write(`\rCould not resolve ${pkg}\n`);
		process.exit(1);
	}
	clear();

	if(manifest)
		process.stdout.write(`\rResolved ${manifest.name}\n`);
	else
		process.stderr.write(`\rCould not resolve ${pkg}\n`);

	//Extract package
	clear = loadingMessage(`Extracting ${pkg}...`);

	try {
		modulePath = path.join(Internal.File.paths.folders.modules, manifest.name);
		result = await pacote.extract(pkg, modulePath);
	} catch(err) {
		//TODO: make a more verbose output
		clear();
		process.stderr.write(`\rCould not extract ${manifest.name}\n`);
		process.exit(1);
	}
	clear();

	process.stdout.write(`\rExtracted ${manifest.name} to ${modulePath}\n`);

	//Update modules.json
	moduleData = require(Internal.File.paths.files.modules);
	moduleData[manifest.name] = manifest;
	await fs.writeFile(Internal.File.paths.files.modules, JSON.stringify(moduleData));
	process.stdout.write(`Installed ${manifest.name}@${manifest.version}\n`);
}

/**
 * @todo Better error messages
 * @todo Prettify JSON output
 * @todo Make a devoted function to managing modules.json (__modules_file)
 */

//Only run when being executed
if(require.main === module) {
	let pkg = process.argv[2];

	//Generate file structure
	Internal.File.generateStructure();

	//Check if a package is listed
	if(pkg === undefined) {
		console.error("No package listed.");
		process.exit(1);
	}

	//Attempt to install package
	install(pkg);
}

module.exports = {install};