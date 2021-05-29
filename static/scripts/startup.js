window.addEventListener('load', () => {
	const livestudio = require('../src/LiveStudio.js');

	//Load modules n stuff
	livestudio.initModules().then(res => {
		console.log("Done loading!", res);
		document.getElementById('preload').classList.add("hidden");
	});
});