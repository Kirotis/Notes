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

  constructor(
    private resolver: ComponentFactoryResolver,
    private noteService: NoteService
    ) { }

  notes: Note[];

  private get emptyNote(): Note {
    return {
      id: null,
      text: null,
      title: null,
      date: null
    }
  }

  ngOnInit(): void {
    this.loadList();
  }
  
  onOpened(note?: Note): void {
    this.noteContainer.clear();
    const factory: ComponentFactory<NoteComponent> = this.resolver.resolveComponentFactory(NoteComponent);
    this.componentRef = this.noteContainer.createComponent(factory);
    this.componentRef.instance.note = note || this.emptyNote;
    this.componentRef.instance.onAddedNote.subscribe(note => {
      this.notes.push(note);
    });
  }

  loadList(): void {
    this.noteService.getNotes().then(notes => {
      this.notes = notes;
    });
  }

  onNoteUpdatedMin(id: string): void {
    this.notes = this.notes.filter(el => el.id !== id);
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
