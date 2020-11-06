import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PainRecord, UserState } from 'src/app/user/user.state';
import { ChatbotState, ChatRecord } from '../chatbot.state';
import { ChartDataSets } from 'chart.js';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';


@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {

  @Select(ChatbotState.chatHistory) chatHistory$: Observable<ChatRecord[]>;

  @SelectSnapshot(UserState.painRecords) painRecords: PainRecord[];

  public painRecordsLabels: string[];
  public painRecordsValues: ChartDataSets;

  constructor() {
    this.painRecordsLabels = this.mapLabels(this.painRecords);
    this.painRecordsValues = this.mapValues(this.painRecords, 'pain');
  }


  public mapLabels(records: PainRecord[]): string[] {
    return records.map(x => x.date.toLocaleString());
  }

  public mapValues(records: PainRecord[], label: string): ChartDataSets {
    return records.reduce((a, c) => {
      console.log({a, c});
      return {...a, data: [...a.data, c.level]};
    }, {label, data: []});
  }
}
