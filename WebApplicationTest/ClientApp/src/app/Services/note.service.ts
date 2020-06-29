import { Injectable, Inject } from '@angular/core';
import { Observable,of } from 'rxjs';
import Note from '../Models/Note';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private get url(): string {
    return this.baseUrl + 'api/Note/';
  }

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }
  // notes:Note[] = [
  //   {
  //     id: '4957771c-5317-4101-9248-1d20056ebd48',
  //     title:'title',
  //     text: 'Согласно предыдущему, закон исключённого третьего подчеркивает здравый смысл, tertium nоn datur. Конфликт, как следует из вышесказанного, нетривиален. Созерцание творит закон внешнего мира.\nСогласно мнению известных философов, бабувизм категорически подчеркивает принцип восприятия. Адаптация, следовательно, индуктивно заполняет субъективный деду',
  //     date: '2020-06-26T12:22:54'
  //   }
  // ]

  getNotes(): Observable<Note[]> {
    // return of(this.notes);
    return this.http.get<Note[]>(this.url + 'getNotes')
  }

  getNote(id):Observable<Note> {
    return this.http.get<Note>(this.url + `getNote/${id}`)
  }

  updateNote(note: Note):Observable<boolean> {
    // const note = this.notes.find(el=>el.id===id);
    // if(typeof data.title==='string')note.title=data.title;
    // if(typeof  data.text==='string')note.text=data.text;
    // return of(true)

    const formData = new FormData();
    formData.append('val', JSON.stringify(note));

    return this.http.put<boolean>(`${this.url}putNote`, formData);
  }

  deleteNote(id):Observable<boolean> {
    // this.notes=this.notes.filter(el=>el.id!==id);
    // return of(true);
    return this.http.delete<boolean>(`${this.url}deleteNote/${id}`);

  }

  addNote():Observable<Note> {
    return this.http.get<Note>(this.url + 'addNote')

    // const note = {
    //   id:Math.round((Math.random()+1)*10000000)+"",
    //   title:"",
    //   text:"",
    //   date:new Date().toISOString()
    // }
    // this.notes.push(note);
    // return of(note);

  }
}
