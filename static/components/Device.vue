
<template id="tmpl-status-icon">
	<device class="{{ activeClass }}">
		<img src="{{ iconURL }}">
		<status></status>
	</device>
</template>

<script>
modules.exports = {
	data: () => {
		return {
			activeClass: '',
			iconURL: '',
			name: ''
		};
	},
	methods: {
		active: (status) => {
			this.activeClass = (status) ? 'active' : '';
		}
	}
};
</script>