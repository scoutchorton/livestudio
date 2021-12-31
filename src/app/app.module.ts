//Angular libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Third-party Angular libraries

//Components
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
