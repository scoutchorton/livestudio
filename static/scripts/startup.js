/**
 * @file startup.js
 * @desc Handle client-side startup functions for LiveStudio
 */

(() => {
	const { ipcRenderer } = require("electron");

	//Wait until page finishes loading and start initalization
	window.addEventListener("load", async () => {
		res = await ipcRenderer.invoke("PageLoad");
		if(res)
			document.getElementById("preload").classList.add("hidden");
		else
			alert("Unable to load LiveStudio! Please restart the application.");
	});
})();





















/*
	//Add default LiveStudio view
	statusbar.addDevice({
		name: "LiveStudio",
		iconURL: "assets/square_logo-64.png",
		menu: [
			{
				label: "Reload",
				type: "button",
				callback: () => {
					window.location.reload();
				}
			}, {
				type: "divider",
			}, {
				label: "Quit",
				type: "button",
				callback: () => {
					if(confirm("Are you sure you want to close Live Studio?"))
						window.close();
				}
			}
		]
	});
	oof = statusbar.addDevice({
		name: "oof",
		iconURL: "assets/square_logo-64.png",
		menu: [
			{
				label: "Reload",
				type: "button",
				callback: () => {}
			}, {
				type: "divider",
			}, {
				label: "Quit",
				type: "button",
				callback: () => {}
			}
		]
	});
	statusbar.setState("LiveStudio", 2);

	//Initalize modules
	ipcRenderer.send("init");

	//Display loaded view
	document.getElementById("preload").classList.add("hidden");
	*/