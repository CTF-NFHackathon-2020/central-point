import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TextService } from '../text.service';

@Component({
  selector: 'app-text-edit-dialog',
  templateUrl: './text-edit-dialog.component.html',
  styleUrls: ['./text-edit-dialog.component.scss']
})
export class TextEditDialogComponent implements OnInit {

  text$ = this.textService.currentText$;

  constructor(private readonly textService: TextService) { }

  ngOnInit(): void {
  }

}
