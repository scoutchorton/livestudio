/**
 * @file statusbar.js
 * @desc Code to handle interations with the statusbar via Vue.js
 * @author scoutchorton
 * @ignore
 */

//Wait until page finishes loading
Vue.component("statusbar", {
	template: getTemplate("statusbar"),
	data: () => {
		return {
			modules: {}
		};
	}
});

Vue.component("statusbar-module", {
	template: getTemplate("statusbar-module"),
	props: {
		options: Object
	},
	data: () => {
		return {};
	}
});