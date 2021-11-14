/**
 * @module LiveStudio/Core
 */

import "path";

import { default as Internal } from "../Internal/Internal"

export async function initModules():Promise<void> {
	console.log("Initializing modules...");

	//Make sure folders exists
	await Internal.File.generateStructure();

	//Iterate over all packages
	const __package_path:string = Internal.File.paths.files.package;
	const modules:NodeRequire = await import(__package_path);

	return;
}