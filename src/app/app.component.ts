//Angular libraries
import { Component, OnInit } from '@angular/core';

//Third-party Angular libraries

//Other imports
import { ipcRenderer } from 'electron';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	title = 'livestudio';
	loading = true;

	constructor() {
		ipcRenderer.on('AddStatusbar', e => {
			console.log('[AppComponent] AddStatusbar', e);
		});

		ipcRenderer.on('RegisterPane', e => {
			console.log('[AppComponent] RegisterPane', e);
		});
	}

	ngOnInit(): void {
		console.log('[AppComponent] [ngOnInit] Initialized AppComponent');
		console.log('[AppComponent] [ngOnInit] Initializing LiveStudio...');
		ipcRenderer.invoke('PageLoad').then((res) => {
			console.log('[AppComponent] [ngOnInit] Done loading!');
			this.loading = false;
		});
	}
}
