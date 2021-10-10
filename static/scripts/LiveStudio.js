/**
 * @file LiveStudio.js
 * @desc Client-side LiveStudio communication and interaction
 * @author scoutchorton
 * @ignore
 */

/*
 * Requires
 */
const { ipcRenderer } = require("electron");

ipcRenderer.on("AddStatusbar", (event, data) => {
	console.log("AddStatusbar");
	console.log(data);
	console.log(statusbar);
});