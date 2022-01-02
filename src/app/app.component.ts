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
			console.log('AddStatusbar', e);
		});

		ipcRenderer.on('RegisterPane', e => {
			console.log('RegisterPane', e);
		});
	}

	async ngOnInit(): Promise<void> {
		console.log('Initialized AppComponent');
		console.log('Initializing LiveStudio...');
		await ipcRenderer.invoke('PageLoad');
	}
}
