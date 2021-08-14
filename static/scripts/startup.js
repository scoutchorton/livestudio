let oof = undefined;

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

		//Add default LiveStudio view
		statusbar.addDevice({
			name: "LiveStudio",
			iconURL: "assets/square_logo-64.png",
			menu: [
				{
					label: "Reload",
					type: "button",
					callback: () => {
						window.location.reload();
					}
				}, {
					type: "divider",
				}, {
					label: "Quit",
					type: "button",
					callback: () => {
						if(confirm("Are you sure you want to close Live Studio?"))
							window.close();
					}
				}
			]
		});
		oof = statusbar.addDevice({
			name: "oof",
			iconURL: "assets/square_logo-64.png",
			menu: [
				{
					label: "Reload",
					type: "button",
					callback: () => {}
				}, {
					type: "divider",
				}, {
					label: "Quit",
					type: "button",
					callback: () => {}
				}
			]
		});
		statusbar.setState("LiveStudio", 2);

		//Initalize modules
		ipcRenderer.send("init");

		//Display loaded view
		document.getElementById("preload").classList.add("hidden");
	});
})();