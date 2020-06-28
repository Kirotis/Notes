import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { NoteService } from 'src/app/Services/note.service';



@Component({
  selector: 'app-note-min',
  templateUrl: './note-min.component.html',
  styleUrls: ['./note-min.component.scss']
})
export class NoteMinComponent implements OnInit {
  @ViewChild("confirmContainer", { read: ViewContainerRef, static: false }) noteContainer;
  componentRef: ComponentRef<ConfirmDeleteComponent>;
  @Input() date: string;
  @Input() text: string;
  @Input() id: string;

  constructor(private resolver: ComponentFactoryResolver, private noteService: NoteService) { }

  ngOnInit() {
  }

  @Output() onOpened = new EventEmitter<string>();
  open($event) {
    if ($event.target.className === 'note-min__delete') {
      return;
    }
    this.onOpened.emit(this.id);
  }
  delete() {
    this.noteContainer.clear();
    const factory: ComponentFactory<ConfirmDeleteComponent> = this.resolver.resolveComponentFactory(ConfirmDeleteComponent);
    this.componentRef = this.noteContainer.createComponent(factory);
    this.componentRef.instance.onDeleted.subscribe(data => {
      this.noteService.deleteNote(this.id).subscribe(result => {
        this.update();
        this.noteContainer.clear();
      })
    });
  }
  @Output() onUpdated = new EventEmitter();
  update(){
    this.onUpdated.emit();
  }
}
