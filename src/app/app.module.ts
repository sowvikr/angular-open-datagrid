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
import { StandardThemeComponent } from './pages/dataset/standard-theme.component';
import { MaterialThemeComponent } from './pages/material-theme/material-theme.component';
import { AllThemeComponent } from './pages/all-theme/all-theme.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResizableDirective, GrabberDirective } from './resizeable';
import {RedThemeComponent} from './pages/red-theme/red-theme.component';
import {MatButtonModule} from '@angular/material/button';

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
    RedThemeComponent,
    MaterialThemeComponent,
    AllThemeComponent,
    ResizableDirective,
    GrabberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ClickOutsideModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
