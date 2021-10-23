/**
 * @file statusbar.js
 * @desc Code to handle interations with the statusbar via Vue.js
 * @author scoutchorton
 * @ignore
 */

Vue.component("statusbar", {
	template: getTemplate("statusbar"),
	data: () => {
		return {
			modules: {}
		};
	},
	methods: {
		alert: args => {
			window.alert(args);
		}
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