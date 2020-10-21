import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { LabelService } from '../label.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { TextService } from '../text.service';

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

  @Output() selected: EventEmitter<TextPreviewSelectedEvent>;
  @Output() unselected: EventEmitter<null>;

  text$ = this.textService.currentText$;
  labels$ = this.labelService.currentLabels$;
  labeledText$ = this.textService.labeledText$;

  constructor(private labelService: LabelService, private textService: TextService) {
    this.selected = new EventEmitter();
    this.unselected = new EventEmitter();
  }

  ngOnInit(): void {
    combineLatest([this.text$, this.labels$]).pipe(
      map(([t, l]) => ({text: t, labels: l})),
    ).subscribe(x => {
      this.textService.updateLabeledText(x.labels);
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
