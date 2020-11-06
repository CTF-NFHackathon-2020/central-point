import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PainRecord, UserState } from 'src/app/user/user.state';
import { ChatbotState, ChatRecord } from '../chatbot.state';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {

  @Select(ChatbotState.chatHistory) chatHistory$: Observable<ChatRecord[]>;

  @Select(UserState.painRecords) painRecords$: Observable<PainRecord[]>;

  constructor() { }


  public mapLabels(records: PainRecord[]): string[] {
    return records.map(x => x.date.toISOString());
  }

  public mapValues(records: PainRecord[], label: string): ChartDataSets[] {
    return records.map((x, i) => ({label, data: x[i].level}));
  }
}
