import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMinComponent } from './note-min.component';

describe('NoteMinComponent', () => {
  let component: NoteMinComponent;
  let fixture: ComponentFixture<NoteMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
