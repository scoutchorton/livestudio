import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StatusbarComponent } from './statusbar/statusbar.component';

@NgModule({
	declarations: [
  		StatusbarComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: []
})
export class AppModule {}
