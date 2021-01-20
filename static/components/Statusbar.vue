<template>
	<div id="statusbar"></div>
</template>

<script>
const Device = require('Device.vue');
module.exports = {
	data: () => {
		return {
			devices: {}
		};
	},
	methods: {
		addDevice: (name, iconURL) => {
			this.devices[name] = new Vue({
				el: '#statusbar',
				components: Device,
				data: () => {
					return {
						activeClass: '',
						iconURL: iconURL,
						name: name
					}
				}
			});
		}
	}
}
</script>