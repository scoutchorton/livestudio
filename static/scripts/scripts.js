const { ipcRenderer } = require("electron");
const path = require("path");
//const livestudio = require(path.join(__dirname, "..", "src/LiveStudio.js"));

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
	data: () => {
		return {
			devices: [],
			contextMenu: -1
		};
	},
	methods: {
		setState: (name, state) => {
			statusbar.$set(statusbar.devices.filter((device) => {return device.name === name})[0], "state", state);
		},
		toggleContentMenu: () => {
			statusbar.$set(statusbar.$data, "contextMenu", -1);
		},
		addDevice: (settings) => {
			//Check for required values
			if(settings === undefined)
				return false;
			else if(settings.name === undefined || settings.name == "")
				return false;
			else if(settings.iconURL === undefined || settings.iconURL == "")
				return false;

			//Search for existing device
			if(statusbar.$data.devices.find(dev => dev.name == settings.name) !== undefined)
				throw new Error(`Device ${settings.name} already exists. Please remove device before adding it back.`); /** @todo Add reload device with new settings? */

			//Set default values
			settings.state = settings.state || 0;
			settings.menu = settings.menu || [];

			//Current device
			let device = statusbar.$set(statusbar.$data.devices, statusbar.$data.devices.length, settings);

			return device;
		},
		removeDevice: (device) => {
			/*
			//Argument check
			if(name === undefined || name === "")
				return false
			
			//Find name in list
			let device = undefined;
			/*
			statusbar.$data.devices.forEach(d => {
				console.log(device);
				if(device.name === name) {

				}
			});
			console.log("devices", statusbar.$data.devices.find(dev => dev.name == name))
			*/
			console.log(device, device.__proto__);
		}
	}
});

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