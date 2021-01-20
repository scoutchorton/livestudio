class Addon {
	constructor() {
		const addonInformation = require('./addon.json');
		this.icon = addonInformation.icon;
	}
}

//Exports
exports.LiveStudioAddon = Addon;