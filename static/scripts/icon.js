/**
 * @file icon.js
 * @desc Vue component constructing an icon
 * @author scoutchorton
 * @ignore
 */

const path = require("path");

const LiveStudio = require("../src/LiveStudio/LiveStudio.js");

Vue.component("icon", {
	template: "<img v-bind:src=\"__location\" class=\"livestudio-icon\"/>",
	props: {
		module: String,
		name: String
	},
	computed: {
		__location: () => {
			console.log(this);
			return path.join(this.module || "", this.name + ".svg");
		}
	}
});