import { ipcMain } from "electron";
import { default as LiveStudio } from "../api/LiveStudio";

function registerHandlers():void {
	//Initialization listener
	ipcMain.on("PageLoad", async ():Promise<boolean> => {
		console.log("Page loaded. Starting to load modules...");
		LiveStudio.Core.initModules();
		return true;
	});

	return;
}

export {
	registerHandlers
}