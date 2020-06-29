import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { NoteService } from 'src/app/Services/note.service';
import Note from 'src/app/Models/Note';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild("noteContainer", { read: ViewContainerRef, static: false }) noteContainer;
  componentRef: ComponentRef<NoteComponent>;

  constructor(private resolver: ComponentFactoryResolver, private noteService: NoteService) { }

  notes: Note[];

  ngOnInit() {
    this.loadList();
  }
  onOpened(note?) {
    this.noteContainer.clear();
    const factory: ComponentFactory<NoteComponent> = this.resolver.resolveComponentFactory(NoteComponent);
    this.componentRef = this.noteContainer.createComponent(factory);
    this.componentRef.instance.note = note;
    this.componentRef.instance.onUpdatedNote.toPromise().then(data => {
      const note = this.notes.find(el => data.id === el.id);
      note.text=data.text;
      note.title=data.title;
      this.noteContainer.clear();
    });
  }
  loadList() {
    this.noteService.getNotes().then(notes => {
      this.notes = notes;
    });
  }
  onNoteUpdatedMin(id) {
    this.notes = this.notes.filter(el => el.id !== id);
  }
  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
