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
		category: String,
		name: String
	},
	data: () => {
		return {
			location: ""
		};
	},
	computed: {
		__location: () => {
			console.log(this, this.category, this.name);
			return path.join("assets", this.category || "", this.name + ".svg");
		}
	}
	/*
	watch: {
		category: category => {
			this.__location = path.join("assets", category || "", this.name + ".svg");
		},
		name: name => {
			this.__location = path.join("assets", this.category || "", name + ".svg");
		}
	}
	*/
});