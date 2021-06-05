//const livestudio = require("../src/LiveStudio.js");

//Debug
let quit = window.close;

/**
 * Key handling
 * @ignore
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

/**
 * Vue
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
			console.log(statusbar.devices);
			for(let device of statusbar.devices) {
				console.log(device);
			}
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

statusbar.addDevice({
	name: "switcher",
	iconURL: "assets/atem_switcher.svg",
	state: 0,
	menu: [
		{
			name: "Setup",
			type: "button",
			callback: () => {
				alert("Hello world!");
			}
		}, {
			type: "spacer"
		}, {
			name: "Mixer Panel",
			type: "button",
			callback: () => {
				alert("Opening Mixer Panel...");
			}
		}
	]
});
statusbar.addDevice({
	name: "Side Camera",
	iconURL: "assets/ptz_camera.svg",
	state: 0,
	menu: [
		{
			name: "Connect",
			type: "button",
			callback: () => {
				alert("Connecting to camera...");
			}
		}, {
			name: "Movement",
			type: "button",
			callback: () => {
				alert("Control the camera position");
			}
		}, {
			type: "spacer"
		}, {
			name: "Settings",
			type: "button",
			callback: () => {
				alert("Opening settings Panel...");
			}
		}
	]
});
statusbar.setState("switcher", 2);

document.body.addEventListener("click", (e) => {
	statusbar.toggleContentMenu();
});
document.body.addEventListener("keyup", (e) => {
	if(e.key === "Escape")
		statusbar.toggleContentMenu();
});

switcherControls = new Pane({
	template: document.getElementById("tmpl-Pane").innerHTML,
	name: "Switcher Controls"
});
switcherControls.vm.x = 300;
switcherControls.vm.y = 300;