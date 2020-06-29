import { Component, OnInit, ElementRef, Input,EventEmitter,Output } from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';
import Note from 'src/app/Models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note:Note;

  @Output() onUpdatedNote = new EventEmitter<Note>();

  @Output() onAddedNote = new EventEmitter<Note>();

  isNew:boolean = false;

  constructor(private el: ElementRef,private noteService:NoteService) {
  }

  close():void {
    this.el.nativeElement.remove();
  }

  ngOnInit() {
    this.isNew=!this.note;
    if(!this.isNew){
      this.noteService.getNote(this.note.id).then(note=>{
        this.note.text=note.text;
        this.note.date=note.date;
        this.note.title=note.title;
      });
    }else{
      this.noteService.addNote().then(note=>{
        this.note.id=note.id;
        this.note.text=note.text;
        this.note.date=note.date;
        this.note.title=note.title;
        this.onAddedNote.emit(this.note);
      });
    }
  }
  ngAfterContentInit(){
    setTimeout(()=>{
      this.autogrowTextarea('note-title');
      this.autogrowTextarea('note-text');
    },10);
    
  }
  
  updateMin(){
    this.onUpdatedNote.emit(this.note);
  }

  onTitleInput(value: string): void {
    const note = this.note;
    note.title = value;
    this.noteService.updateNote(note).then(_ => {
      this.note.title = value;
      this.updateMin()
    })
    this.autogrowTextarea('note-title');
  }

  onTextInput(value: string): void {
    const note = this.note;
    note.text = value;
    this.noteService.updateNote(note).then(_ => {
      this.note.text = value;
      this.updateMin()
    })
    this.autogrowTextarea('note-text');
  }
  
  autogrowTextarea(id){
    let  textArea = document.getElementById(id);       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
