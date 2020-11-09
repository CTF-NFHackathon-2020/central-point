import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatbotState } from '../chatbot.state';
import { LexIntent } from '../lex.interface';

@Component({
  selector: 'app-intent-badge',
  templateUrl: './intent-badge.component.html',
  styleUrls: ['./intent-badge.component.scss']
})
export class IntentBadgeComponent implements OnInit {

  @Input() intent: LexIntent;
  @Input() index: number;

  @Select(ChatbotState.chatHistory) chatHistory$: Observable<string[]>;
  chatMessage$: Observable<string>;

  public slotKeys: string[];

  constructor() { }

  ngOnInit(): void {
    if (this.intent.slots) {
      this.slotKeys = Object.keys(this.intent?.slots);
    } else {
      this.slotKeys = [];
    }

    this.chatMessage$ = this.chatHistory$.pipe(map(x => x[this.index]));
  }

}
