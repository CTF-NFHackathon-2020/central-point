import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LabelService } from '../label.service';

export interface TextPreviewSelectedEvent {
  indexes: number[];
  boundingRect: DOMRect;
}

@Component({
  selector: 'app-text-preview',
  templateUrl: './text-preview.component.html',
  styleUrls: ['./text-preview.component.scss']
})
export class TextPreviewComponent implements OnInit {

  @Input() text: string;
  @Output() selected: EventEmitter<TextPreviewSelectedEvent>;
  @Output() unselected: EventEmitter<null>;

  labels$ = this.labelService.currentLabels$;
  labeledText: BehaviorSubject<{text: string, labelName: string, labelColor: string}[]>;
  isAlive = false;

  constructor(private labelService: LabelService) {
    this.selected = new EventEmitter();
    this.unselected = new EventEmitter();
    this.labeledText = new BehaviorSubject([]);
  }

  ngOnInit(): void {
    const splitedText = this.text.split(' ');

    let formatedLabels = [];

    this.labels$.subscribe(labels => {
      console.log('labels updated', labels)
      labels.forEach((x, i) => {
        x.indexes.forEach((index, j) => {
          const labelName = j === 0 ? 'B-' + x.name : 'I-' + x.name;
          formatedLabels = [...formatedLabels, {index, labelName, color: x.color}];
        });
      });
      this.labeledText.next (splitedText.map((word, i) => {
        const formatedLabel = formatedLabels.find(fl => fl.index === i);
        const labelName = formatedLabel ? formatedLabel.label : '0';
        const labelColor = formatedLabel?.color;
        return {text: word, labelName, labelColor};
      }));
    });
  }



  onTextSelected(e) {
    const selection = window.getSelection();
    const start = +selection.anchorNode.parentElement.attributes['data-index'].value;
    const end = +selection.focusNode.parentElement.attributes['data-index'].value;

    const range = selection.getRangeAt(0);
    const boundingRect = range.getBoundingClientRect();

    console.log({start, end});

    let indexes = [];

    if (start < end) {
      const wordCount = end - start + 1;
      indexes = [end];
      for (let i = 1; i < wordCount; i ++) {
        indexes = [end - i, ...indexes];
      }
      return this.selected.next({indexes, boundingRect});
    }
    if (start >= end) {
      const wordCount = start - end + 1;
      indexes = [start];
      for (let i = 1; i < wordCount; i ++) {
        indexes = [start - i, ...indexes];
      }
    }


    if (boundingRect.width > 1) {
      return this.selected.next({indexes, boundingRect});
    }

    return this.unselected.next();
  }

}
