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
			console.log(this.devices)
			for(let device in this.devices) {
				console.log(device)
			}
		}
	}
});

statusbar.devices.push({
	name: "switcher",
	iconURL: "assets/atem_switcher.svg",
	state: 0
});
statusbar.setState('switcher', 2);

/**
 * Misc
 * @ignore
 */
/*
function timedReload(time) {
	console.log(`Reload at ${new Date(Date.now() + time).toLocaleTimeString()}`)
	reloadInterval = setTimeout(() => {
		window.location.reload();
	}, time);
}
*/

//timedReload(2500);

//console.log(ipcRenderer.send('startup'));

/*
document.getElementById('auto').addEventListener('click', e => {
	ipcRenderer.send('button', 'auto');
});
document.getElementById('cut').addEventListener('click', e => {
	ipcRenderer.send('button', 'cut');
});
document.getElementById('fadeToBlack').addEventListener('click', e => {
	ipcRenderer.send('button', 'fadeToBlack');
});
*/

/*
let demoPane = new Pane('demo');
demoPane.attach();
*/

