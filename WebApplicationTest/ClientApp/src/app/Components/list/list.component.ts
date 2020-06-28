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
  onOpened(id?) {
    this.noteContainer.clear();
    const factory: ComponentFactory<NoteComponent> = this.resolver.resolveComponentFactory(NoteComponent);
    this.componentRef = this.noteContainer.createComponent(factory);
    this.componentRef.instance.id=id || false;
}
  loadList(){
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }
  onNoteUpdated($event){
    this.loadList();
  }
  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
