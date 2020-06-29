import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { NoteService } from 'src/app/Services/note.service';
import Note from 'src/app/Models/Note';



@Component({
  selector: 'app-note-min',
  templateUrl: './note-min.component.html',
  styleUrls: ['./note-min.component.scss']
})
export class NoteMinComponent implements OnInit {
  @ViewChild("confirmContainer", { read: ViewContainerRef, static: false }) noteContainer;
  componentRef: ComponentRef<ConfirmDeleteComponent>;
  @Input() note:Note;

  constructor(private resolver: ComponentFactoryResolver, private noteService: NoteService) { }

  ngOnInit() {
  }

  @Output() onOpened = new EventEmitter<Note>();
  open($event) {
    if ($event.target.className === 'note-min__delete') {
      return;
    }
    this.onOpened.emit(this.note);
  }
  delete() {
    this.noteContainer.clear();
    const factory: ComponentFactory<ConfirmDeleteComponent> = this.resolver.resolveComponentFactory(ConfirmDeleteComponent);
    this.componentRef = this.noteContainer.createComponent(factory);
    this.componentRef.instance.onDeleted.toPromise().then(data => {
      this.noteService.deleteNote(this.note.id).then(result => {
        this.updateMin();
        this.noteContainer.clear();
      })
    });
  }
  @Output() onUpdatedMin = new EventEmitter<string>();
  updateMin(){
    this.onUpdatedMin.emit(this.note.id);
  }
}
