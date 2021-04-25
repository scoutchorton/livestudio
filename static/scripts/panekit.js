/**
 * Moveable panes within a page
 * @file
 * @author scoutchorton
 */

/**
 * Pane class
 * @class
 */
class Pane {
	/**
	 * New window on screen
	 */
	constructor(settings) {
		//Create pane element if not existant
		if(settings.id === undefined) {
			let temp = document.createElement('div');
			document.body.appendChild(temp);

			settings.id = `pane-${new Date().getTime()}`;
			temp.id = settings.id;
		}

		//Add default template if none given
		if(settings.template === undefined)
			settings.template = '';

		//Initalize Vue instance
		this.vm = new Vue({
			el: `#${settings.id}`,
			template: settings.template,
			data: () => {
				return {
					name: settings.name || 'PaneKit',
					minimized: false,
					focused: true,
					x: 0,
					y: 0,
					__offsets: {x: 0, y: 0}
				};
			},
			methods: {
				close: () => {
					console.log(this.vm.$el);
					console.dir(this.vm.$el);
					this.vm.$el.remove();
					this.vm.$destroy();
				},
				__dragend_handler: (e) => {
					this.vm.$set(this.vm.$data, "x", e.clientX - this.vm.$data.__offsets.x);
					this.vm.$set(this.vm.$data, "y", e.clientY - this.vm.$data.__offsets.y);
				},
				__dragstart_handler: (e) => {
					this.vm.$set(this.vm.$data.__offsets, "x", e.clientX - this.vm.$data.x);
					this.vm.$set(this.vm.$data.__offsets, "y", e.clientY - this.vm.$data.y);
				}
			}
		});

		//Add listeners for pane
		this.vm.$el.addEventListener('drag', (e) => {
			//console.log('Dragged', e);
			
		});
	}
}