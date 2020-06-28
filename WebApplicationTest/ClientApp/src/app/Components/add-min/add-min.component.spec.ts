import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinComponent } from './add-min.component';

describe('AddMinComponent', () => {
  let component: AddMinComponent;
  let fixture: ComponentFixture<AddMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
