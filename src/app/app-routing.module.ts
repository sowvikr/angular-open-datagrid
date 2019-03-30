import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DarkThemeComponent} from './pages/dark-theme/dark-theme.component';
import {StandardThemeComponent} from './pages/standard-theme/standard-theme.component';
import {MaterialThemeComponent} from './pages/material-theme/material-theme.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
