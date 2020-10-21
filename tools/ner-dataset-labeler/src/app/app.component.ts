import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextEditDialogComponent } from './text-edit-dialog/text-edit-dialog.component';
import { TextExportDialogComponent } from './text-export-dialog/text-export-dialog.component';
import { TextPreviewSelectedEvent } from './text-preview/text-preview.component';
import { TextService } from './text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selection: TextPreviewSelectedEvent;

  constructor(public dialog: MatDialog, private readonly textService: TextService) { }

  onTextPreviewSelected(e: TextPreviewSelectedEvent) {
    console.log(e.indexes);
    this.selection = e;
  }

  onTextPreviewUnselected() {
    this.selection = undefined;
  }

  onEditTextClick() {
    const dialogRef = this.dialog.open(TextEditDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.textService.updateText(result);
        console.log(result);
      }
    });
  }

  onExportTextClick() {
    const dialogRef = this.dialog.open(TextExportDialogComponent);
  }

  onLabelSelectDialogClosed() {
    this.selection = undefined;
  }
}
