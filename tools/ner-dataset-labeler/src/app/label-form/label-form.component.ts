import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.scss']
})
export class LabelFormComponent implements OnInit {

  labelForm = new FormGroup({
    name: new FormControl(''),
    color: new FormControl('')
  });

  currentLabels$ = this.labelService.currentLabels$;

  constructor(private labelService: LabelService) { }

  ngOnInit(): void {
  }

  onAddLabelButtonClick() {
    this.labelService.addLabel(this.labelForm.value.name)
  }

}
