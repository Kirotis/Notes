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

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url + 'getNotes').toPromise()
  }

  getNote(id):Observable<Note> {
    return this.http.get<Note>(this.url + `getNote/${id}`).toPromise()
  }

  updateNote(note: Note):Observable<boolean> {
    const formData = new FormData();
    formData.append('val', JSON.stringify(note));

    return this.http.put<boolean>(`${this.url}putNote`, formData).toPromise();
  }

  deleteNote(id):Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}deleteNote/${id}`).toPromise();

  }

  addNote():Observable<Note> {
    return this.http.get<Note>(this.url + 'addNote').toPromise()
  }
}
