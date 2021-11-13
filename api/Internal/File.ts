/**
 * @module LiveStudio/Internal/File
 */

import * as fs from "fs/promises";
import * as path from "path";

interface FSError {
	code:string;
	errno:number;
	path:number;
	syscall:number;
	message:number;
	stack:number;
}

//Internal variables
const __home_dir:string = (process.platform == "win32") ? window.process.env.APPDATA as string : window.process.env.HOME as string;
const __data_dir:string = path.join((__home_dir as string), ".livestudio");

/**
 * @member {Object} paths Important directories
 * @member {String} paths.folders.data Base folder for saved data
 * @member {String} paths.folders.modules Location of installed modules
 * @member {String} paths.files.settings User and module based settings
 * @member {String} paths.files.modules Listing of packages installed in dirs.folders.modules
 */
export const paths = {
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
export async function generateStrcuture():Promise<Array<string>> {
	const generated:Array<string> = [];

	//Iterate over needed folders
	for(const folder of Object.values(paths.folders)) {
		try {
			await fs.mkdir(folder);
			generated.push(folder);
		} catch(err:unknown) {
			//Ignore if file exists
			if((err as FSError).code == 'EEXIST')
				continue

			//Otherwise log error
			console.log(err);
		}
	}

	//Iterate over needed files
	for(const file of Object.values(paths.files)) {
		let fh:fs.FileHandle|undefined = undefined;
		let fileData:Buffer;

		//Create file
		try {
			fh = await fs.open(file, "a");
		} catch(err:unknown) {
			console.log(err);
		} finally {
			if(fh != undefined)
				fh.close();
		}

		//Initalize JSON file
		try {
			//Check if files have data and if not create an empty JSON file
			if(/\.json$/.test(file)) {
				fileData = await fs.readFile(file);
				if(fileData.length === 0)
					await fs.writeFile(file, "{}");
			}
		} catch(err:unknown) {
			console.error(`Could not initialize JSON file ${file}`);
			throw err;
		}
	}

	return generated;
}