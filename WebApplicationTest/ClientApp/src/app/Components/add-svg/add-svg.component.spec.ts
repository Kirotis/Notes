import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSvgComponent } from './add-svg.component';

describe('AddSvgComponent', () => {
  let component: AddSvgComponent;
  let fixture: ComponentFixture<AddSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
