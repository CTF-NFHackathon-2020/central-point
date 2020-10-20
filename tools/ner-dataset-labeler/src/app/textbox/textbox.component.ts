import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  public textAreaHeight = '20px';

  constructor() { }

  ngOnInit(): void {
  }

  onTextAreaInput(e) {
    this.textAreaHeight = e.target.scrollHeight + 'px';
  }

}
