import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StatusbarComponent } from './statusbar/statusbar.component';

@NgModule({
	declarations: [
		AppComponent,
  		StatusbarComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
