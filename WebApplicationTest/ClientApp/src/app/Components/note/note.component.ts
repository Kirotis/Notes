import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() id:string;
  isNew:boolean = false;
  text:string;
  title:string;
  date:string;

  constructor(private el: ElementRef,private noteService:NoteService) {
  }

  close():void {
    this.el.nativeElement.remove();
  }
  ngOnInit() {
    this.isNew=!this.id;
    if(!this.isNew){
      this.noteService.getNote(this.id).subscribe(note=>{
        this.text=note.text;
        this.date=note.date;
        this.title=note.title;
      });
    }else{
      this.noteService.addNote().subscribe(note=>{
        this.id=note.id;
        this.text=note.text;
        this.date=note.date;
        this.title=note.title;
      });
    }
  }
  ngAfterContentInit(){
    setTimeout(()=>{
      this.autogrowTextarea('note-title');
      this.autogrowTextarea('note-text');
    },10);
    
  }
  onTitleInput(value){
    this.noteService.updateNote({id: this.id, text: this.text, title: value, date: this.date}).subscribe()
    this.autogrowTextarea('note-title');
  }
  onTextInput(value){
    this.noteService.updateNote({id: this.id, text: value, title: this.title, date: this.date}).subscribe()
    this.autogrowTextarea('note-text');
  }
  autogrowTextarea(id){
    let  textArea = document.getElementById(id);       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
