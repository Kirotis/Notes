import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-min',
  templateUrl: './add-min.component.html',
  styleUrls: ['./add-min.component.scss']
})
export class AddMinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() onAdded = new EventEmitter();
  addNote($event){
    this.onAdded.emit();
  }

}
