const { ipcRenderer } = require("electron");

//Debug
let quit = window.close;

/*
 * Input handling
 */
document.addEventListener("keyup", e => {
	//Close window prompt
	if((e.code === "KeyW" && e.ctrlKey) || (e.code === "KeyQ" && e.ctrlKey)) {
		e.preventDefault();
		if(window.confirm("Are you sure you want to close Live Studio?"))
			window.close();
	} else if(e.code === "F5") {
		e.preventDefault();
		window.location.reload();
	}
});
document.body.addEventListener("click", (e) => {
	statusbar.toggleContentMenu();
});
document.body.addEventListener("keyup", (e) => {
	if(e.key === "Escape")
		statusbar.toggleContentMenu();
});

/*
 * Vue initalization
 */
var statusbar = new Vue({
	el: "#statusbar",
	template: document.getElementById("tmpl-Statusbar").innerHTML,
	data: () => {
		return {
			devices: [],
			contextMenu: -1
		};
	},
	methods: {
		setState: (name, state) => {
			statusbar.$set(statusbar.devices.filter((device) => {return device.name === name})[0], 'state', state);
		},
		toggleContentMenu: () => {
			statusbar.$set(statusbar.$data, "contextMenu", -1);
		},
		addDevice: (settings) => {
			//Check for required values
			if(settings.name === undefined || settings.name == "")
				return false;
			else if(settings.iconURL === undefined || settings.iconURL == "")
				return false;

			//Set default values
			settings.state = settings.state || 0;
			settings.menu = settings.menu || [];

			statusbar.$set(statusbar.$data.devices, statusbar.$data.devices.length, settings);

			return true;
		}
	}
});
console.log(statusbar);

/*
 * Inter-process communication
 */
ipcRenderer.on("register-device", (e, settings) => {
	console.log("Registering device");
	statusbar.addDevice(settings);
});
ipcRenderer.on("create-pane", (e, settings) => {
	console.log("Creating pane");
	new Pane(settings);
});