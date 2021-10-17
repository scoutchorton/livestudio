/**
 * @file LiveStudio.js
 * @desc Client-side LiveStudio communication and interaction
 * @author scoutchorton
 * @ignore
 */

/*
 * Requires
 */
const { ipcRenderer, app } = require("electron");

ipcRenderer.on("AddStatusbar", (event, data) => {
	/*
	console.log("AddStatusbar");
	console.log(data);
	console.log(window.app);
	console.log(window.app.$refs.statusbar);
	console.log(window.app.$refs.statusbar.$data.modules);
	*/
	
	//Add data to Vue instance
	Vue.set(window.app.$refs.statusbar.modules, data.name, data);
});

/**
 * Get the HTML of a template
 * @param {string} id Template ID
 * @returns {string} Inner HTML of the template, or an empty string on error
 */
function getTemplate(id) {
	//Initalize the template cache if not yet
	cache = loadTemplateCache(id);
	return cache[id] || "";
}

/**
 * Loads <template>'s into the global templateCache
 * @param {String} [id] ID for the template
 * @returns {Object.<String,String>} Global template cache
 */
function loadTemplateCache(id) {
	let elements = document.querySelectorAll(id ? `template#${id}` : "template");
	window.templateCache ??= {};

	//Short circuit when no elements are found
	if(elements.length == 0)
		return window.templateCache;

	for(let element of elements) {
		//Skip templates without an ID
		if(element.id === "")
			continue

		//Apply new data
		window.templateCache[element.id] = element.innerHTML;
		element.remove();
	}

	return window.templateCache;
}