import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    @Input() showModal: boolean;
    @Input() valueModal: string;

  constructor() { }

  changeValue(){
    this.showModal = !this.showModal;
    }

  ngOnInit() {
  }

}
