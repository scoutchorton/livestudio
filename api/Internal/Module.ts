/**
 * @module LiveStudio/Internal/Module
 */

import * as fs from "fs/promises";
import * as path from "path";

import { paths } from "./File";
import * as Errors from "./Errors";

interface LS_Required_Module extends NodeRequire {
	register?:((mod:LS_Module)=>void);
}

//Internal variables
const module_cache:Record<string,LS_Module> = {};

/**
 * LiveStudio Module
 */
export class LS_Module {
	base_dir:string; /** @member base_dir Path to module base directory */
	name:string|undefined = undefined; /** @member name Module name */
	private package_data:Record<string,any> = {}; /** @member package_data Data from the package's package.json */
	//private main_import;

	/**
	 * @param mod_pkg package.json from the module
	 * @param mod_path Path to module
	 */
	constructor(mod_path:string) {
		console.log(mod_path);

		this.base_dir = mod_path;

		//Load module information
		fs.readFile(path.join(mod_path, "package.json"), {encoding: "utf-8"}).then(async raw_package_data =>{
			//Get package.json contents
			const parsed_package_data = JSON.parse(raw_package_data);

			//Assign data to class
			this.package_data = parsed_package_data;
			this.name = this.package_data.name;
			const module_path = path.join(this.base_dir, parsed_package_data.main || "index.js");
			console.log(`Required file: ${module_path}`);
			try {
				const imported_module = await import(module_path);
				console.log(typeof(imported_module));
			} catch(err:unknown) {
				console.error("Could not load module");
				console.error(err);
			}
		});

		/*
		this.__req = mod_pkg;
		this.base_dir = mod_path;
		this.name = mod_pkg.name as string;
		*/
	}

	/**
	 * Make a path a full path based on the module's base directory
	 * @param pth Path to be processed
	 * @returns Absolute path to resource
	 */
	url(pth:string):string {
		//return path.join(this.base_dir, pth);
		return ""
	}
}

export function addRegistry(name:string):Record<string,unknown> {
	const mod_path:string = path.join(paths.folders.modules, name);
	let loaded_module:LS_Module;

	/**
	 * @todo Import main file/index.js if none given. You can't just `import()` a directory, so the package should be parsed for the entrypoint.
	 */
	
	//Attempt to get module
	try {
		//mod_req = import(mod_path);
		loaded_module = new LS_Module(mod_path);
	} catch(err:unknown) {
		console.error(err); 
		throw new Errors.RegistrationError(`Could not find module at ${mod_path}`);
	}
	//const ls_mod:LS_Module = new LS_Module(mod_req, mod_path);

	//Go through registration (add more stages like with npm?)
	//if(loaded_module.register)
	//	loaded_module.register();
	//loaded_module.register(ls_mod);
	
	//Add module to registry
	module_cache[name] = loaded_module;
	return module_cache;
}