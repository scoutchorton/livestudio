/**
 * @module LiveStudio/Internal/Module
 */

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
	__req:NodeRequire;
	base_dir:string; /** @member base_dir Path to module base directory */
	name:string; /** @member name Module name */

	/**
	 * @param mod_pkg package.json from the module
	 * @param mod_path Path to module
	 */
	constructor(mod_pkg:NodeRequire, mod_path:string) {
		this.__req = mod_pkg;
		this.base_dir = mod_path;
		this.name = mod_pkg.name as string;
	}

	/**
	 * Make a path a full path based on the module's base directory
	 * @param pth Path to be processed
	 * @returns Absolute path to resource
	 */
	url(pth:string):string {
		return path.join(this.base_dir, pth);
	}
}

export function addRegistry(name:string):Record<string,unknown> {
	const mod_path:string = path.join(paths.folders.modules, name);
	let mod_req:any;

	/**
	 * @todo Import main file/index.js if none given. You can't just `import()` a directory, so the package should be parsed for the entrypoint.
	 */
	
	//Attempt to get module
	try {
		mod_req = import(mod_path);
	} catch(err:unknown) {
		console.error(err); 
		throw new Errors.RegistrationError(`Could not find module at ${mod_path}`);
	}
	const ls_mod:LS_Module = new LS_Module(mod_req, mod_path);

	//Go through registration (add more stages like with npm?)
	if(mod_req.register)
		mod_req.register(ls_mod);
	
	//Add module to registry
	module_cache[name] = ls_mod;
	return module_cache;
}