import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {routes} from './app.router';

import { AppComponent } from './app.component';
import {AdminComponent} from './admin/admin.component';
import {MainComponent} from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
