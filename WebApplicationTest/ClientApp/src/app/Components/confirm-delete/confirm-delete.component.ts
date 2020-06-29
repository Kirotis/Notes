import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {

  constructor(private el: ElementRef) { }

  @Output() onDeleted = new EventEmitter<boolean>();

  remove($event) {
    this.onDeleted.emit($event);
  }
  cancel($event) {
    this.el.nativeElement.remove();
  }
}

