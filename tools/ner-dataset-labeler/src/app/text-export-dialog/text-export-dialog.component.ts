import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { TextService } from '../text.service';

@Component({
  selector: 'app-text-export-dialog',
  templateUrl: './text-export-dialog.component.html',
  styleUrls: ['./text-export-dialog.component.scss']
})
export class TextExportDialogComponent implements OnInit {

  labeledText$ = this.textService.labeledText$.pipe(
    map(ws => ws.map(w => `${w.text} ${w.labelName}`).join('\n')),
    tap(x => console.log(x)));
  constructor(private readonly textService: TextService) { }

  ngOnInit(): void {
  }

}
