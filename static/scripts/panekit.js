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
		//Create blank settings to avoid errors
		settings = settings || {};

		//Create pane element if not existant
		if(settings.id === undefined) {
			let temp = document.createElement('div');
			document.body.appendChild(temp);
			temp.id = `pane-${new Date().getTime()}`;
			settings.id = temp.id;
		}

		//Add default template if none given
		if(settings.template === undefined)
			settings.template = '';
		
		//Add content based on type
		if(settings.content === undefined)
			settings.content = '';
		else if(settings.content.constructor == String)
			settings.content = settings.content;
		else if(settings.content instanceof HTMLTemplateElement)
		settings.content = settings.content.cloneNode(true).firstElementChild.outerHTML;
		else if(settings.content instanceof HTMLElement)
			settings.content = settings.content.outerHTML;
		else
			settings.content = '';

		//Initalize Vue instance
		this.vm = new Vue({
			el: `#${settings.id}`,
			template: settings.template,
			data: () => {
				return {
					name: settings.name || 'PaneKit',
					content: settings.content,
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
				//Handle when the titlebar is dragged
				__dragstart_handler: (e) => {
					this.vm.$set(this.vm.$data.__offsets, "x", e.clientX - this.vm.$data.x);

					if(!this.vm.$data.minimized)
						this.vm.$set(this.vm.$data.__offsets, "y", e.clientY - this.vm.$data.y);
					else
						this.vm.$set(this.vm.$data.__offsets, "y", 0);
				},
				//Handle when the titlebar is dropped
				__dragend_handler: (e) => {
					this.vm.$set(this.vm.$data, "x", e.clientX - this.vm.$data.__offsets.x);
					
					if(!this.vm.$data.minimized)
						this.vm.$set(this.vm.$data, "y", e.clientY - this.vm.$data.__offsets.y);
				}
			}
		});

		//Add listeners for pane
	}
}