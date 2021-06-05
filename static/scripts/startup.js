(() => {
	let { ipcRenderer } = require("electron");

	//Wait until document finishes loading
	window.addEventListener("load", () => {
		//Deal with initalization response
		ipcRenderer.once("init", (e, res) => {
			console.log("init status", res);
			if(res.status)
				document.getElementById("preload").classList.add("hidden");
			else
				alert("An error occurred while loading LiveStudio.");
		});

		//Initalize modules
		ipcRenderer.send("init");
	});
})();