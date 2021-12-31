//Angular libraries
import { Component, OnInit } from '@angular/core';

//Third-party Angular libraries

//Other imports
import * as Electron from 'electron';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	title = 'livestudio';
	loading = true;

	ngOnInit(): void {
		console.log('Initialized AppComponent');
		console.log('Initializing LiveStudio...');
		Electron.ipcRenderer.send('PageLoad');

		setTimeout(() => {
			this.loading = false;
		}, 5000);
	}
}
