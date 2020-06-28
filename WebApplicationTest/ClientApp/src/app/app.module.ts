import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './Components/list/list.component';
import { NoteComponent } from './Components/note/note.component';
import { NoteMinComponent } from './Components/note-min/note-min.component';
import { AddMinComponent } from './Components/add-min/add-min.component';
import { AddSvgComponent } from './Components/add-svg/add-svg.component';
import { CloseSvgComponent } from './Components/close-svg/close-svg.component';
import { ConfirmDeleteComponent } from './Components/confirm-delete/confirm-delete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NoteComponent,
    NoteMinComponent,
    AddMinComponent,
    AddSvgComponent,
    CloseSvgComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [
    NoteComponent,
    ConfirmDeleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
