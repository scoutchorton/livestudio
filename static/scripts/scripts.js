const { ipcRenderer } = require('electron');
//var Statusbar = require('./components/Statusbar.vue');

/**
 * Key handling
 * @ignore
 */
document.addEventListener('keyup', e => {
	//Close window prompt
	if((e.code === 'KeyW' && e.ctrlKey) || (e.code === 'KeyQ' && e.ctrlKey)) {
		e.preventDefault();
		if(window.confirm('Are you sure you want to close Live Studio?'))
			window.close();
	} else if(e.code === 'F5') {
		e.preventDefault();
		ipcRenderer.send('compileSass');
		window.location.reload();
	}
});

/**
 * Vue components
 * @ignore
 */
/*
const Device = {
	template: document.querySelector('#tmpl-Device').innerHTML,
	data: () => {
		return {
			activeClass: '',
			iconURL: '',
			name: ''
		};
	},
	methods: {
		active: (status) => {
			this.activeClass = (status) ? 'active' : '';
		}
	}
}
*/
const Statusbar = {
	data: () => {
		return {
			devices: []
		};
	},
	methods: {
		addDevice: (name, iconURL) => {
			/*
			this.devices[name] = new Vue({
				el: '#statusbar',
				components: Device,
				data: () => {
					return {
						activeClass: '',
						iconURL: iconURL,
						name: name
					}
				}
			});
			*/
		}
	}
}

/**
 * Vue
 */
var statusbar = new Vue({
	el: '#statusbar',
	template: document.getElementById('tmpl-Statusbar').innerHTML,
	data: () => {
		return {devices: []};
	},
	methods: {
		setState: (name, state) => {
			console.log(statusbar.devices);
			for(let device of statusbar.devices) {
				console.log(device);
			}
		},
		toggleContentMenu: (name) => {
			for(let device of statusbar.devices) {
				if(device.name === name)
					device.contextMenu = (device.contextMenu) ? false : true;
				else
					device.contextMenu = false;
			}
		}
	}
});

statusbar.devices.push({
	name: "switcher",
	iconURL: "assets/atem_switcher.svg",
	state: 0,
	contextMenu: false,
	menu: [
		{
			name: "Setup",
			type: "button",
			callback: () => {
				alert('Hello world!');
			}
		}, {
			type: 'spacer'
		}, {
			name: "Mixer Panel",
			type: 'button',
			callback: () => {
				alert('Opening Mixer Panel...');
			}
		}
	]
});
statusbar.devices.push({
	name: "Side Camera",
	iconURL: "assets/ptz_camera.svg",
	state: 0,
	contextMenu: false,
	menu: [
		{
			name: "Connect",
			type: "button",
			callback: () => {
				alert('Connecting to camera...');
			}
		}, {
			name: "Movement",
			type: 'button',
			callback: () => {
				alert('Control the camera position');
			}
		}, {
			type: 'spacer'
		}, {
			name: "Settings",
			type: 'button',
			callback: () => {
				alert('Opening settings Panel...');
			}
		}
	]
});
statusbar.setState('switcher', 2);
//statusbar.toggleContentMenu('switcher');

document.body.addEventListener('click', (e) => {
	statusbar.toggleContentMenu();
});
document.body.addEventListener('keyup', (e) => {
	if(e.key === 'Escape')
		statusbar.toggleContentMenu();
});

switcherControls = new Pane({
	template: document.getElementById('tmpl-Pane').innerHTML,
	name: 'Switcher Controls'
});
switcherControls.vm.x = 100;
switcherControls.vm.y = 100;