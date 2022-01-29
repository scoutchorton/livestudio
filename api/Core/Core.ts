/**
 * @module LiveStudio/Core
 */

import { promises as fs } from 'fs';
import 'path';

import * as Internal from '../Internal/Internal';

export async function initModules(): Promise<void> {
	console.log('[LIVESTUDIO API] Initializing modules...');

	//Make sure folders exists
	await Internal.File.generateStructure();

	//Load package file
	const packageData = await fs.readFile(Internal.File.paths.files.package, {encoding: 'utf-8'});
	const modules = JSON.parse(packageData).dependencies;

	//Iterate over all packages
	for(const mod in modules)
		Internal.Module.addRegistry(mod);
}