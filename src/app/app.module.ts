import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { HotKeysDirective } from './hot-keys.directive';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { ClickOutsideModule } from 'ng4-click-outside';
import './string-prototype.service.ts';
import { DarkThemeComponent } from './pages/dark-theme/dark-theme.component';
import { StandardThemeComponent } from './pages/standard-theme/standard-theme.component';
import { MaterialThemeComponent } from './pages/material-theme/material-theme.component'

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    InlineEditComponent,
    SafePipePipe,
    ContextMenuComponent,
    HotKeysDirective,
    ColumnFilterComponent,
    DarkThemeComponent,
    StandardThemeComponent,
    MaterialThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
