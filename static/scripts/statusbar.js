/**
 * @file statusbar.js
 * @desc Code to handle interations with the statusbar via Vue.js
 * @author scoutchorton
 * @ignore
 */

function initStatusbar() {
	window.statusbar = new Vue({
		el: "#statusbar",
		data: () => {
			return {
				modules: {}
			}
		}
	});
	
	return statusbar
}