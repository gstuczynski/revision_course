import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {MainComponent} from './main/main.component';

export const router: Routes = [
{path: '', redirectTo: 'main', pathMatch: 'full'},
{path: 'main', component: MainComponent},
{path: 'admin', component: AdminComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);