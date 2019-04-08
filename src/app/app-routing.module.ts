import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DarkThemeComponent} from './pages/dark-theme/dark-theme.component';
import {StandardThemeComponent} from './pages/standard-theme/standard-theme.component';
import {MaterialThemeComponent} from './pages/material-theme/material-theme.component';
import {AllThemeComponent} from './pages/all-theme/all-theme.component';
import {BlueThemeComponent} from './pages/blue-theme/blue-theme.component';


const routes: Routes = [
  {
    path: '',
    component: StandardThemeComponent,
  },
  {
    path: 'dark',
    component: DarkThemeComponent,
  },
  {
    path: 'material',
    component: MaterialThemeComponent,
  },
  {
    path: 'all',
    component: AllThemeComponent,
  },
  {
    path: 'blue',
    component: BlueThemeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
