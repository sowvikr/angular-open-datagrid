import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { ContextMenuComponent } from './context-menu/context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    InlineEditComponent,
    SafePipePipe,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
