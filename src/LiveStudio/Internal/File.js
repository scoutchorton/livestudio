/**
 * @file File.js
 * @desc Internal file management functions
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal/File
 */
const fs = require("fs").promises;
const path = require("path");

//Internal variables
let __data_dir = path.join((process.platform == "win32") ? process.env.APPDATA : process.env.HOME, ".livestudio");

/**
 * @member {Object} paths Important directories
 * @member {String} paths.folders.data Base folder for saved data
 * @member {String} paths.folders.modules Location of installed modules
 * @member {String} paths.files.settings User and module based settings
 * @member {String} paths.files.modules Listing of packages installed in dirs.folders.modules
 */
let paths = {
	folders: {
		data: __data_dir,
		modules: path.join(__data_dir, "node_modules")
	},
	files: {
		settings: path.join(__data_dir, "settings.json"),
		package: path.join(__data_dir, "package.json"),
	}
};

/**
 * Generate required file and folder structure needed for LiveStudio
 * @async
 */
async function generateStructure() {
	let generated = [];

	//Iterate over needed folders
	for(let folder of Object.values(paths.folders)) {
		try {
			await fs.mkdir(folder);
			generated.push(folder);
		} catch(err) {
			//Ignore if file exists
			if(err.code == 'EEXIST')
				continue

			//Otherwise log error
			console.log(err);
		}
	}

	//Iterate over needed files
	for(let file of Object.values(paths.files)) {
		let fh; //FileHandle
		let fileData;

		//Create file
		try {
			fh = await fs.open(file, "a");
		} catch(err) {
			console.log(err);
		} finally {
			fh.close();
		}

		//Initalize JSON file
		try {
			if(/\.json$/.test(file)) {
				fileData = await fs.readFile(file);
				if(fileData.length === 0) {
					await fs.writeFile(file, "{}");
				}
			}
		} catch(err) {
			console.err(`Could not initalize JSON file ${file}`);
			throw err;
		}
	}

	return generated;
}



module.exports = {
	paths,
	generateStructure
}