window.addEventListener('load', () => {
	const init = require('../src/init.js');

	//Load modules n stuff
	init.initModules().then(res => {
		console.log("Done loading!", res);
		document.getElementById('preload').classList.add("hidden");
	});
});