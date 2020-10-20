import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-select-dialog',
  templateUrl: './label-select-dialog.component.html',
  styleUrls: ['./label-select-dialog.component.scss']
})
export class LabelSelectDialogComponent implements OnInit {

  @Input() active: boolean;
  @Input() x: number;
  @Input() y: number;
  @Input() selectedIndexes: number[];

  @Output() closed: EventEmitter<null>;

  labels = this.labelService.currentLabels$;

  constructor(private labelService: LabelService) {
    this.closed = new EventEmitter();
  }

  ngOnInit(): void {

  }

  onLabelSelectClick(labelName) {
    this.labelService.addIndexes(labelName, this.selectedIndexes);
    this.closed.next();
  }

  onCancelButtonClick() {
    this.closed.next();
  }
}
