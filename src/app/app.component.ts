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

	async ngOnInit(): Promise<void> {
		console.log('Initialized AppComponent');
		console.log('Initializing LiveStudio...');
		await ipcRenderer.invoke('PageLoad');
	}
}
