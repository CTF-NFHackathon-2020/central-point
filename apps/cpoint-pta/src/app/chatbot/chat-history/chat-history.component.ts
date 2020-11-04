import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChatbotState, ChatRecord } from '../chatbot.state';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {

  @Select(ChatbotState.chatHistory) chatHistory$: Observable<ChatRecord[]>;

  constructor() { }
}
