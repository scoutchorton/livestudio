(() => {
	const { ipcRenderer } = require("electron");

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

	statusbar.addDevice({
		name: "LiveStudio",
		iconURL: 'assets/square_logo-64.png',
		menu: [
			{
				name: "Reload",
				type: "button",
				callback: () => {
					window.location.reload();
				}
			},
			{
				type: "spacer",
			},
			{
				name: "Quit",
				type: "button",
				callback: () => {
					if(confirm("Are you sure you want to close Live Studio?"))
						window.close();
				}
			}
		]
	});
	statusbar.setState('LiveStudio', 2);
})();